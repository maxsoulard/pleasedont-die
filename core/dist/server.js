"use strict";
// server.ts 
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var sensors_1 = require("./sensors");
var users_1 = require("./users");
var Server = (function () {
    function Server() {
        this.configure();
        this.routes();
    }
    Server.start = function () {
        return new Server();
    };
    Server.prototype.configure = function () {
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.listen('8888');
    };
    Server.prototype.routes = function () {
        var sensors = new sensors_1.Sensors(this.app);
        var users = new users_1.Users(this.app);
    };
    return Server;
}());
var server = Server.start();
