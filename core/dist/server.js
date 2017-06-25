"use strict";
// server.ts 
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var Promise = require("bluebird");
var mongodb = require("mongodb");
var sensors_1 = require("./sensors");
var cors = require("cors");
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
        mongodb.MongoClient.connect("mongodb://192.168.0.17/pleasedont-die", { promiseLibrary: Promise })
            .catch(function (err) { return console.error(err.stack); })
            .then(function (db) {
            _this.app.locals.db = db;
            _this.app.listen("8888", function () {
                console.log("Node.js app is listening at http://localhost:8888");
            });
        });
    };
    Server.prototype.routes = function () {
        var sensors = new sensors_1.Sensors(this.app);
    };
    return Server;
}());
var server = Server.start();
