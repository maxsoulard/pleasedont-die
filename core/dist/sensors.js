"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sensors = (function () {
    function Sensors(app) {
        this.app = app;
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
    Sensors.prototype.postSubscriber = function (req, res) {
        var options = { "sort": [['_id', 'desc']] };
        var query = { _id: req.params.id };
        this.getSensorWithParticularSubscriber(req.app.locals.db, req.params.id, req.body.mail)
            .then(function (sensor) {
            if (sensor) {
                res.sendStatus(422); // resource already exists
                throw "Resource already exists";
            }
        })
            .then(function () {
            return req.app.locals.db.collection('sensors').updateOne({ _id: req.params.id }, {
                $push: {
                    "subscribers": req.body
                }
            });
        })
            .then(function (subscriber) {
            if (subscriber)
                res.sendStatus(200); // TODO send back subscriber just created
            else
                res.sendStatus(404);
        });
    };
    Sensors.prototype.getSensorWithParticularSubscriber = function (db, sensorId, mail) {
        var querySubscriberAlreadyExists = { _id: sensorId, subscribers: { $elemMatch: { mail: mail } } };
        return db.collection('sensors').findOne(querySubscriberAlreadyExists);
    };
    return Sensors;
}());
exports.Sensors = Sensors;
