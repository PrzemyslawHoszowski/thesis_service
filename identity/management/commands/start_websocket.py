import asyncio
import websockets
import json

from django.core.management.base import BaseCommand

from service import settings



# https://stackoverflow.com/questions/66166142/contacting-another-websocket-server-from-inside-django-channels
async def client(websocket_url):
    async for websocket in websockets.connect(websocket_url):
        print("Connected to Websocket server")
        with open("priv/ws/subscribeRequest.json") as subReq:
            print(subReq.read())
            await websocket.send(
                json.dumps({
                    "jsonrpc": "2.0",
                    "method": "subscribe",
                    "id": 0,
                    "params": {"query": "tm.event='Tx'"}
                })
            )
        try:
            async for message in websocket:
            # Process message received on the connection.
                print(message)
        except websockets.ConnectionClosed:
            print("Connection lost! Retrying..")
            continue #continue will retry websocket connection by exponential back-off

class Command(BaseCommand):
    def handle(self, *args, **options):
        URL = "ws://" + settings.BLOCKCHAIN_HOST + ":" + settings.BLOCKCHAIN_PORT + "/websocket"
        print(f"Connecting to websocket server {URL}")
        asyncio.run(client(URL))
