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
        this.app.get('/sensors/:id/data', this.getData);
    };
    Sensors.prototype.getAllSensors = function (req, res) {
        req.app.locals.db.collection('sensors').find().toArray(function (err, sensors) {
            if (sensors)
                res.send(sensors);
            else
                res.sendStatus(404);
        });
    };
    Sensors.prototype.getOneSensor = function (req, res) {
        var query = { _id: req.params.id };
        req.app.locals.db.collection('sensors').findOne(query)
            .then(function (sensor) {
            if (sensor)
                res.send(sensor);
            else
                res.sendStatus(404);
        });
    };
    Sensors.prototype.getData = function (req, res) {
        var options = { "sort": [['_id', 'desc']] };
        var query = { sensorid: req.params.id };
        req.app.locals.db.collection('data').findOne(query, options)
            .then(function (sensor) {
            if (sensor)
                res.send(sensor);
            else
                res.sendStatus(404);
        });
    };
    return Sensors;
}());
exports.Sensors = Sensors;
