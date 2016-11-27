from flask import Flask, jsonify
from flask import render_template
from flask_cors import CORS
from BTSensor import *
import threading
import json

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


@app.route('/temperature', methods=['GET'])
def temperature():
    resp = build_response(read_data('temperature.json'))
    return resp


@app.route('/plant', methods=['GET'])
def plant():
    resp = build_response(read_data('plant.json'))
    return resp


def read_data(file_name):
    with open(file_name, 'r') as f:
        return json.load(f)


def build_response(sensor_value):
    resp = jsonify(sensor_value)
    resp.status_code = 200
    return resp
