import asyncio
import websockets
import json
from buzzer import Buzzer


async def handler(websocket):
    round = Buzzer()
    async for message in websocket:
        event = json.loads(message)
        if event["type"] == "start":
            round = Buzzer()
        elif event["type"] == "buzz":
            round.buzz(event["player"])
            event = {
                "type": "winner",
                "player": round.winner,
                "time": round.time
            }
        await websocket.send(json.dumps(event))


async def main():
    async with websockets.serve(handler, "", 8081):
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())