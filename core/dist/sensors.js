"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        res.send('todo the sensor : ' + req.params.id);
    };
    return Sensors;
}());
exports.Sensors = Sensors;
