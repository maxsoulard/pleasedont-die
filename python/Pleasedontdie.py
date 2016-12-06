from flask import Flask, jsonify
from flask import render_template
from flask import request
from flask_cors import CORS
from BTSensor import *
from EmailNotifier import *
import threading
import json


# Configuring Flask for Vue.js
class CustomFlask(Flask):
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update(dict(
        block_start_string='$$',
        block_end_string='$$',
        variable_start_string='$',
        variable_end_string='$',
        comment_start_string='$#',
        comment_end_string='#$',
    ))

app = CustomFlask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/sensors/<id_sensor>', methods=['GET'])
def read_sensor(id_sensor):
    resp = _get_response(id_sensor)
    return resp


@app.route('/sensors/<id_sensor>/notifications', methods=['POST'])
def subscribe_to_notifications(id_sensor):
    request_body = json.loads(request.data)
    EmailNotifier(request_body).subscribe_to(id_sensor)
    resp = _read_data("sensor_"+id_sensor[:4]+".config")
    return _build_response(resp)


def _get_response(id_sensor):
    file_name = "sensor_"+id_sensor[:4]+".json"
    data = _read_data(file_name)
    return _build_response(data)


def _read_data(file_name):
    with open(file_name, 'r') as f:
        return json.load(f)


def _build_response(sensor_value):
    resp = jsonify(sensor_value)
    resp.status_code = 200
    return resp
