import asyncio
import base64
import hashlib
import os
from datetime import datetime

import requests
import logging
import traceback

import websockets
import json
from asgiref.sync import sync_to_async
from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils.timezone import make_aware

from documents.models import Document, Event, DocumentStorage, MetadataThesisService
from identity.models import Identity, Certificate
from service import settings
logger = logging.getLogger(__name__)

URL = "http://" + settings.BLOCKCHAIN_HOST + ":" + settings.BLOCKCHAIN_REST_PORT + "/"
TENDERMINT_URL = "http://" + settings.BLOCKCHAIN_HOST + ":" + settings.BLOCKCHAIN_PORT + "/"

def get_document(index):
    response = requests.get(URL + f"/thesis/thesis/document/{index}")
    return response.json()['document']

def get_block_time(height):
    response = requests.get(URL + f"/cosmos/staking/v1beta1/historical_info/{height}")
    return make_aware(datetime.strptime(response.json()['hist']['header']['time'].split('.')[0], '%Y-%m-%dT%H:%M:%S'))

class BlockFromFuture(Exception):
    pass
def get_block(height):
    response = requests.get(TENDERMINT_URL + f"/block?height={height}").json()
    if "error" in response:
        raise BlockFromFuture
    return response["result"]

def handle_authorization(event, height, _tx_hash, _event_time):
    ident = event['attributes']['account-id']
    caller = event['attributes']['caller']
    try:
        ident = Identity.objects.get(id=ident)
        ident.blockchain_address = caller
        ident.user_verification_tx_height = height
        ident.save()
        cert = Certificate.create("Amr5gERyHZ9Mb3WW/7GUmR6NGSfGWaBRHoVKtxhAQzZV", ident)
        cert.save()
        print(f"{settings.BLOCKCHAIN_CLI} tx thesis add-certificate {cert.hash()} {ident.blockchain_address} --from {settings.BLOCKCHAIN_CLI_ACCOUNT} -y")
        os.system(f"{settings.BLOCKCHAIN_CLI} tx thesis add-certificate {cert.hash()} {ident.blockchain_address} --from {settings.BLOCKCHAIN_CLI_ACCOUNT} -y")

    except Identity.DoesNotExist:
        logger.error(
            f"Authorization id doesn't match any identity. Identity: {ident}, height: {height}, caller: {caller}")
    except Exception:
        logger.error(f"Ws handler run into error with data Identity: {ident}, height: {height}, caller: {caller}")
        traceback.print_exc()

def handle_document_created(event, _height, tx_hash, event_time):
    index = event['attributes']['document-id']
    document = get_document(index)
    document = Document.create(document, event_time)
    event = Event.create(json.dumps(event['attributes']), event_time, tx_hash, document)
    with transaction.atomic():
        document.save()
        event.save()
        DocumentStorage.create_records(document, document.users())

def handle_document_update(event, _height, tx_hash, event_time):
    index = event['attributes']['document-id']
    document_json = get_document(index)
    document_object = Document.objects.filter(pk=index).get()
    document_object.update(document_json, event_time)
    event = Event.create(json.dumps(event['attributes']), event_time, tx_hash, document_object)
    with transaction.atomic():
        document_object.save()
        event.save()
        DocumentStorage.create_records(document_object, document_object.users())


EVENTS_HANDLERS = {
    "entity-authorized": handle_authorization,
    "document-created": handle_document_created,
    "document-users-added": handle_document_update,
    "document-signed": handle_document_update,
    "document-users-removed": handle_document_update,
    "document-files-changed": handle_document_update,
    "document-signature-rejected": handle_document_update
}
EVENTS = EVENTS_HANDLERS.keys()

# https://stackoverflow.com/questions/66166142/contacting-another-websocket-server-from-inside-django-channels
async def client(websocket_url):
    await process_blocks_from_the_past()
    async for websocket in websockets.connect(websocket_url):
        await subscribe(websocket)
        try:
            async for _message in websocket:
            # We just need information about new block. Implementing fetching data from event is pointless.
                await process_blocks_from_the_past()

        except websockets.ConnectionClosed:
            logger.error("Connection lost! Retrying..")
            continue #continue will retry websocket connection by exponential back-off

@sync_to_async
def process_blocks_from_the_past():
    last_processed = MetadataThesisService.objects.get_or_create(pk=1, defaults={"last_processed": 1})[0]
    height = last_processed.last_processed + 1
    while True:
        try:
            process_block(height)
            logger.info(f"Processed block with height: {height}")
            height += 1
        except BlockFromFuture:
            logger.info(f"Finished processing blocks from the past on height {height}")
            return

def process_block(height):
    block = get_block(height)
    block_time = get_time_from_block(block)
    for tx in get_transactions(block):
        tx_hash = get_tx_hash(tx)
        result = get_transaction_result(tx_hash)
        events = list(filter(lambda x: x['type'] in EVENTS, result['tx_result']['events']))
        events = list(map(lambda x: parse_attributes(x), events))
        for event in events:
            EVENTS_HANDLERS.get(event['type'])(event, height, tx_hash, block_time)
    MetadataThesisService.objects.update(last_processed=height)

def get_time_from_block(block):
    return make_aware(datetime.strptime(block["block"]["header"]["time"].split('.')[0], '%Y-%m-%dT%H:%M:%S'))

def get_transactions(block):
    return block["block"]["data"]["txs"]

def get_transaction_result(tx_hash):
    response = requests.get(TENDERMINT_URL + f"/tx?hash=0x{tx_hash}")
    return response.json()["result"]

async def subscribe(websocket):
    return await websocket.send(
        json.dumps({
            "jsonrpc": "2.0",
            "method": "subscribe",
            "id": 0,
            "params": {"query": "tm.event='NewBlock'"}
        })
    )

def parse_attributes(event):
    event['attributes'] = dict(map(lambda x: (decode_base64(x['key']), decode_base64(x['value'] if x['value'] else "")), event['attributes']))
    return event

def decode_base64(data):
    base64_encoded_data = base64.b64decode(data)
    base64_message = base64_encoded_data.decode('utf-8')
    return base64_message

def get_tx_hash(tx):
    tx_bytes = base64.b64decode(tx)
    return hashlib.sha256(tx_bytes).hexdigest()

class Command(BaseCommand):
    def handle(self, *args, **options):
        url = "ws://" + settings.BLOCKCHAIN_HOST + ":" + settings.BLOCKCHAIN_PORT + "/websocket"
        logger.info(f"Connecting to websocket server {url}")
        asyncio.run(client(url))
