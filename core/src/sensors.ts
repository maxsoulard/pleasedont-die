import express = require('express');
import mongodb = require('mongodb');


export interface Sensor {
    _id: String;
    type: String;
    date: Date;
}

interface SensorData {
    _id: mongodb.ObjectID;
    date: Date;
    hum: String;
    temp: String;
    sensorid: String;
}

export class Sensors {

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
}