const bodyParser = require('body-parser');
const express = require('express');
const Promise = require('bluebird');
const mongodb = require('mongodb');
const cors = require('cors');
const Sensors = require('./sensors');
const Subscribers = require('./subscribers');

module.exports = class Server {
    constructor(mongoHost, mongoDb) {
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors()); // allow all cors requests
        this.app.use(bodyParser.json());
        this.mongoHost = mongoHost;
        this.mongoDb = mongoDb;
    }

    connect() {
        return mongodb.MongoClient.connect(`mongodb://${this.mongoHost}/${this.mongoDb}`, { promiseLibrary: Promise })
            .catch(err => console.error(err.stack))
            .then(db => {
                this.app.locals.db = db;
            });
    }

    start() {
        // app.get('/api/health', healthCheck);
        const sensors = new Sensors();
        this.app.get('/api/sensors', sensors.getSensors);
        this.app.get('/api/sensors/:id', sensors.getOneSensor);
        this.app.get('/api/sensors/:id/data', sensors.getData);
        // this.app.post('/api/sensors/:id/data', sensors.postData);
        this.app.patch('/api/sensors/:id', sensors.patchSensor);

        const subscribers = new Subscribers();
        this.app.post('/api/sensors/:id/subscribers', subscribers.postSubscriber);
        this.app.delete('/api/sensors/:id/subscribers/:mail', subscribers.deleteSubscriber);

        return this.app.listen("8888", () => {
            console.log(`Node.js app is listening at http://localhost:8888`);
        });
    }
}
