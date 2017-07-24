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
        this.getSensorWithParticularSubscriber(req.app.locals.db, req.params.id, req.body.mail)
            .then((sensor: Sensor) => {
                if (sensor) {
                    res.sendStatus(422); // resource already exists
                    throw "Resource already exists";
                }
            })
            .then(() => {  // else post new subscriber
                return req.app.locals.db.collection('sensors').updateOne(
                    {_id: req.params.id}, push);
            })
            .then((subscriber: Subscriber) => {
                res.sendStatus(subscriber ? 200: 404); // TODO send back subscriber just created
            });
    }

    public deleteSubscriber(req: express.Request, res: express.Response): void {
        const find = {_id: req.params.id};
        const pull = {$pull: { "subscribers" : {mail: req.params.mail}}};
        req.app.locals.db.collection('sensors').updateOne(find, pull)
            .then(() => {
                res.sendStatus(200);
            });
    }

    private getSensorWithParticularSubscriber(db: any, sensorId: String, mail: String) {
        const querySubscriberAlreadyExists = { _id : sensorId, subscribers: {$elemMatch: {mail: mail}}};
        return db.collection('sensors').findOne(querySubscriberAlreadyExists);
    }
}