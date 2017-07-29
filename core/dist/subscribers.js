"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscribers = (function () {
    function Subscribers() {
    }
    Subscribers.prototype.postSubscriber = function (req, res) {
        var options = { "sort": [['_id', 'desc']] };
        var query = { _id: req.params.id };
        var push = { $push: { "subscribers": req.body } };
        this.getSensorWithParticularSubscriber(req.app.locals.db, req.params.id, req.body.mail)
            .then(function (sensor) {
            if (sensor) {
                res.sendStatus(422); // resource already exists
                throw "Resource already exists";
            }
        })
            .then(function () {
            return req.app.locals.db.collection('sensors').updateOne({ _id: req.params.id }, push);
        })
            .then(function (subscriber) {
            res.sendStatus(subscriber ? 201 : 404); // TODO send back subscriber just created 
        });
    };
    Subscribers.prototype.deleteSubscriber = function (req, res) {
        var find = { _id: req.params.id };
        var pull = { $pull: { "subscribers": { mail: req.params.mail } } };
        req.app.locals.db.collection('sensors').updateOne(find, pull)
            .then(function () {
            res.sendStatus(204);
        });
    };
    Subscribers.prototype.getSensorWithParticularSubscriber = function (db, sensorId, mail) {
        var querySubscriberAlreadyExists = { _id: sensorId, subscribers: { $elemMatch: { mail: mail } } };
        return db.collection('sensors').findOne(querySubscriberAlreadyExists);
    };
    return Subscribers;
}());
exports.Subscribers = Subscribers;
