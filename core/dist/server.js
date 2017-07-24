"use strict";
// server.ts 
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var Promise = require("bluebird");
var mongodb = require("mongodb");
var cors = require("cors");
var nconf = require("nconf");
var sensors_1 = require("./sensors");
var subscribers_1 = require("./subscribers");
var Server = (function () {
    function Server() {
        this.configure();
        this.routes();
    }
    Server.start = function () {
        return new Server();
    };
    Server.prototype.configure = function () {
        var _this = this;
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors()); // allow all cors requests
        this.app.use(bodyParser.json());
        mongodb.MongoClient.connect("mongodb://" + nconf.get('mongodb:host') + "/" + nconf.get('mongodb:db'), { promiseLibrary: Promise })
            .catch(function (err) { return console.error(err.stack); })
            .then(function (db) {
            _this.app.locals.db = db;
            _this.app.listen("8888", function () {
                console.log("Node.js app is listening at http://localhost:8888");
            });
        });
    };
    Server.prototype.routes = function () {
        var sensors = new sensors_1.Sensors();
        var subscribers = new subscribers_1.Subscribers();
        this.app.get('/api/health', this.healthCheck);
        this.app.get('/api/sensors', sensors.getAllSensors);
        this.app.get('/api/sensors/:id', sensors.getOneSensor);
        this.app.get('/api/sensors/:id/data', sensors.getData);
        this.app.post('/api/sensors/:id/subscribers', function (req, res) { return subscribers.postSubscriber(req, res); });
        this.app.delete('/api/sensors/:id/subscribers/:mail', function (req, res) { return subscribers.deleteSubscriber(req, res); });
    };
    Server.prototype.healthCheck = function (req, res) {
        res.sendStatus(200);
    };
    return Server;
}());
nconf.argv()
    .file('../config.json');
var server = Server.start();
