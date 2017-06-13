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
            .on('error', function (err) {
            var codeStatus = err.code === 'ENOENT' ? 404 : 500;
            res.status(codeStatus).end();
        })
            .on('end', function () {
            res.end();
        })
            .pipe(res);
    };
    return Sensors;
}());
exports.Sensors = Sensors;
