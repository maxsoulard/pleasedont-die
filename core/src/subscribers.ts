import express = require('express');
import mongodb = require('mongodb');
import { Sensor } from "./sensors";

interface Subscriber {
    mail: String;
}

export class Subscribers {

    public postSubscriber(req: express.Request, res: express.Response): void {
        let options = {"sort": [['_id','desc']]}
        const query = { _id: req.params.id };
        const push = {$push: {"subscribers": req.body}};
        this.findSensor(req.app.locals.db, req.params.id, req.body.mail)
            .then((sensor: Sensor) => {
                if (sensor) {
                    res.sendStatus(422); // resource already exists
                    throw "Resource already exists";
                }
            })
            .then(() => req.app.locals.db.collection('sensors').updateOne(
                    {_id: req.params.id}, push))
            .then((subscriber: Subscriber) => res.sendStatus(subscriber ? 201: 404));
    }

    public deleteSubscriber(req: express.Request, res: express.Response): void {
        const find = {_id: req.params.id};
        const pull = {$pull: { "subscribers" : {mail: req.params.mail}}};
        req.app.locals.db.collection('sensors').updateOne(find, pull)
            .then(() => res.sendStatus(204));
    }

    private findSensor(db: any, sensorId: String, mail: String) {
        const querySubscriberAlreadyExists = { _id : sensorId, subscribers: {$elemMatch: {mail: mail}}};
        return db.collection('sensors').findOne(querySubscriberAlreadyExists);
    }
}