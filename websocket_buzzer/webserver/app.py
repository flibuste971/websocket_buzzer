from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/red_player')
def red_player():
    return render_template('red_player.html')

@app.route('/blu_player')
def blue_player():
    return render_template('blu_player.html')

@app.route('/green_player')
def green_player():
    return render_template('green_player.html')

@app.route('/yellow_player')
def yellow_player():
    return render_template('yellow_player.html')

@app.route('/referee')
def referee():
    return render_template('referee.html')