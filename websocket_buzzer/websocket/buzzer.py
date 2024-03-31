import time

class Buzzer:

    def __init__(self):
        self.time = 0
        self.winner = None

    def buzz(self, player):
        if self.winner is None:
            self.winner = player
            self.time = time.time() - self.begin

    def timeStop(self):
        self.time = time.time() - self.begin

    def timeStart(self):
        self.begin = time.time() - self.time


        

