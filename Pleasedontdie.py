from flask import Flask, jsonify
from flask import Response
from flask import render_template
from flask_cors import CORS
from TemperatureSensor import *
import json

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


@app.route('/temperature', methods=['GET'])
def temperature():
    sensor = TemperatureSensor()
    sensor.connect()
    data = json.loads(sensor.readvalue())
    resp = jsonify(data)
    resp.status_code = 200
    return resp
