from flask import Flask, jsonify
from flask import Response
from flask import render_template
from flask_cors import CORS
from TemperatureSensor import *
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


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


@app.route('/temperature', methods=['GET'])
def temperature():
    sensor = TemperatureSensor()
    sensor.connect()
    data = sensor.readvalue()
    resp = jsonify(data)
    resp.status_code = 200
    return resp
