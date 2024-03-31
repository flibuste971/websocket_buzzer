import asyncio
import websockets
import json
from buzzer import Buzzer

gameRunning = False
round = None
players = []

async def handler(websocket):
    # Gloval variables
    global gameRunning
    global round
    global players

    # Handler
    async for message in websocket:
        event_recv = json.loads(message)
        print('message received:', event_recv)
        event_sent = {
            "type": "ack",
            "message": "message received"
        }
        if event_recv["type"] == "connection":
            players.append(websocket)
            event_sent = {
                "type": "connected",
            }
            websocket.send(json.dumps(event_sent))
        elif event_recv["type"] == "disconnection":
            players.remove(websocket)
        elif event_recv["type"] == "start" and event_recv["player"] == "referee":
            gameRunning = True
            round = Buzzer()
            round.timeStart()
            event_sent = event_recv
            websockets.broadcast(players, json.dumps(event_sent))
        elif event_recv["type"] == "stop" and event_recv["player"] == "referee":
            gameRunning = False
            round.timeStop()
            event_sent = event_recv
            websockets.broadcast(players, json.dumps(event_sent))
        elif event_recv["type"] == "buzz":
            if gameRunning:
                round.buzz(event_recv["player"])
                event_sent = {
                    "type": "winner",
                    "player": round.winner,
                    "time": round.time
                }
                gameRunning = False
            websockets.broadcast(players, json.dumps(event_sent))
        print('message sent:', event_sent)


async def main():
    async with websockets.serve(handler, "", 8081):
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())