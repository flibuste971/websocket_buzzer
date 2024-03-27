import asyncio
import websockets
import json
from buzzer import Buzzer

started = False
round = None

async def handler(websocket):
    global started
    global round
    async for message in websocket:
        event_recv = json.loads(message)
        print('message received:', event_recv)
        if event_recv["type"] == "start":
            started = True
            round = Buzzer()
        elif event_recv["type"] == "buzz":
            if started:
                round.buzz(event_recv["player"])
                event_sent = {
                    "type": "winner",
                    "player": round.winner,
                    "time": round.time
                }
            websockets.broadcast(json.dumps(event_sent))


async def main():
    async with websockets.serve(handler, "", 8081):
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())