"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sensors = /** @class */ (function () {
    function Sensors() {
    }
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
    Sensors.prototype.patchSensor = function (req, res) {
        var set = { $set: req.body };
        req.app.locals.db.collection('sensors').updateOne({ _id: req.params.id }, set)
            .then(function () { return req.app.locals.db.collection('sensors').findOne({ _id: req.params.id }); })
            .then(function (sensor) {
            res.send(sensor);
        });
    };
    return Sensors;
}());
exports.Sensors = Sensors;
