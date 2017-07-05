import express = require('express');
import mongodb = require('mongodb');

export class Sensors {
    private app: express.Application;

    constructor(app: express.Application) {
        this.app = app;   
    }

    public getAllSensors(req: express.Request, res: express.Response): void {
        req.app.locals.db.collection('sensors').find().toArray((err: any, sensors: Sensor[]) => {
                if (sensors)     res.send(sensors);
                else            res.sendStatus(404);
        });
    }

    public getOneSensor(req: express.Request, res: express.Response): void {
        const query = { _id: req.params.id };

        req.app.locals.db.collection('sensors').findOne(query)
            .then((sensor: Sensor) => {
                if (sensor)     res.send(sensor);
                else            res.sendStatus(404);
            });
    }

    public getData(req: express.Request, res: express.Response): void {
        let options = {"sort": [['_id','desc']]}
        const query = { sensorid: req.params.id };

        req.app.locals.db.collection('data').findOne(query, options)
            .then((sensor: SensorData) => {
                if (sensor)     res.send(sensor);
                else            res.sendStatus(404);
            });
    }
    
    public postSubscriber(req: express.Request, res: express.Response): void {
        let options = {"sort": [['_id','desc']]}
        const query = { _id: req.params.id };
        this.getSensorWithParticularSubscriber(req.app.locals.db, req.params.id, req.body.mail)
            .then((sensor: Sensor) => {
                if (sensor) {
                    res.sendStatus(422); // resource already exists
                    throw "Resource already exists";
                }
            })
            .then(function() {  // else post new subscriber
                return req.app.locals.db.collection('sensors').updateOne(
                    {_id: req.params.id},
                    {
                        $push: {
                            "subscribers": req.body
                        }
                    }
                );
            })
            .then((subscriber: Subscriber) => {
                if (subscriber) res.sendStatus(200); // TODO send back subscriber just created
                else            res.sendStatus(404);
            });
    }

    private getSensorWithParticularSubscriber(db: any, sensorId: String, mail: String) {
        const querySubscriberAlreadyExists = { _id : sensorId, subscribers: {$elemMatch: {mail: mail}}};
        return db.collection('sensors').findOne(querySubscriberAlreadyExists)
    }
}

interface Sensor {
    _id: String;
    type: String;
    date: Date;
    subscribers: Subscriber[];
}

interface Subscriber {
    mail: String;
}

interface SensorData {
    _id: mongodb.ObjectID;
    date: Date;
    hum: String;
    temp: String;
    sensorid: String;
}