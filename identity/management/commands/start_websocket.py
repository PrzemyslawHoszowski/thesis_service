import asyncio
import base64
import logging
import traceback

import websockets
import json
from asgiref.sync import sync_to_async
from django.core.management.base import BaseCommand

from identity.models import Identity
from service import settings
logger = logging.getLogger(__name__)

@sync_to_async
def handle_authorization(event, height):
    ident = event['attributes']['account-id']
    caller = event['attributes']['caller']
    try:
        ident = Identity.objects.get(id=ident)
        ident.blockchain_address = caller
        ident.user_verification_tx_height = height
        ident.save()
    except Identity.DoesNotExist:
        logger.error(
            f"Authorization id doesn't match any identity. Identity: {ident}, height: {height}, caller: {caller}")
    except Exception:
        logger.error(f"Ws handler run into error with data Identity: {ident}, height: {height}, caller: {caller}")
        traceback.print_exc()

EVENTS_HANDLERS = {
    "entity-authorized": handle_authorization
}
EVENTS = EVENTS_HANDLERS.keys()

# https://stackoverflow.com/questions/66166142/contacting-another-websocket-server-from-inside-django-channels
async def client(websocket_url):
    async for websocket in websockets.connect(websocket_url):
        await subscribe(websocket)
        try:
            async for message in websocket:
            # Process message received on the connection.
                tx_result = json.loads(message)['result']
                if tx_result.get('data'):
                    value = tx_result['data']['value']['TxResult']
                    height = int(value['height'])
                    events = list(filter(lambda x: x['type'] in EVENTS, value['result']['events']))
                    events = list(map(lambda x: parse_attributes(x), events))
                    for event in events:
                        await EVENTS_HANDLERS.get(event['type'])(event, height)

        except websockets.ConnectionClosed:
            logger.error("Connection lost! Retrying..")
            continue #continue will retry websocket connection by exponential back-off

async def subscribe(websocket):
    return await websocket.send(
        json.dumps({
            "jsonrpc": "2.0",
            "method": "subscribe",
            "id": 0,
            "params": {"query": "tm.event='Tx'"}
        })
    )

def parse_attributes(event):
    event['attributes'] = dict(map(lambda x: (decode_base64(x['key']), decode_base64(x['value'])), event['attributes']))
    return event

def decode_base64(data):
    base64_encoded_data = base64.b64decode(data)
    base64_message = base64_encoded_data.decode('utf-8')
    return base64_message

class Command(BaseCommand):
    def handle(self, *args, **options):
        URL = "ws://" + settings.BLOCKCHAIN_HOST + ":" + settings.BLOCKCHAIN_PORT + "/websocket"
        logger.info(f"Connecting to websocket server {URL}")
        asyncio.run(client(URL))
