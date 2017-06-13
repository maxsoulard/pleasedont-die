"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Sensors = (function () {
    function Sensors(app) {
        this.app = app;
        this.routes();
    }
    Sensors.prototype.routes = function () {
        this.app.get('/sensors', this.getAllSensors);
        this.app.get('/sensors/:id', this.getOneSensor);
    };
    Sensors.prototype.getAllSensors = function (req, res) {
        res.send('todo all sensors');
    };
    Sensors.prototype.getOneSensor = function (req, res) {
        fs.createReadStream('python/sensor_' + req.params.id + '.json')
            .on('error', function () {
            console.log('404 not found');
        })
            .pipe(res);
    };
    return Sensors;
}());
exports.Sensors = Sensors;
