// server.ts 
  
import bodyParser = require('body-parser');
import express = require('express');
import Promise = require("bluebird");
import mongodb = require('mongodb');
import cors = require('cors');
import nconf = require('nconf');

import { Sensors } from "./sensors";
import { Subscribers } from "./subscribers";

class Server {
    private app: express.Application;

    constructor() {
        this.configure();
        this.routes();
    }

    public static start(){
        return new Server();
    }
    
    private configure(): void {
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors()); // allow all cors requests
        this.app.use(bodyParser.json());
        mongodb.MongoClient.connect(`mongodb://${nconf.get('mongodb:host')}/${nconf.get('mongodb:db')}`, { promiseLibrary: Promise })
            .catch(err => console.error(err.stack))
            .then(db => {
                this.app.locals.db = db;
                this.app.listen("8888", () => {
                    console.log(`Node.js app is listening at http://localhost:8888`);
                });
            });
    }

    private routes(): void {
        const sensors = new Sensors();
        const subscribers = new Subscribers();
        this.app.get('/api/health', this.healthCheck);
        this.app.get('/api/sensors', sensors.getAllSensors);
        this.app.get('/api/sensors/:id', sensors.getOneSensor);
        this.app.get('/api/sensors/:id/data', sensors.getData);
        // this.app.post('/api/sensors/:id/data', sensors.postData);
        this.app.patch('/api/sensors/:id', sensors.patchSensor);
        this.app.post('/api/sensors/:id/subscribers', (req, res) => subscribers.postSubscriber(req, res));
        this.app.delete('/api/sensors/:id/subscribers/:mail', (req, res) => subscribers.deleteSubscriber(req, res));
    }

    private healthCheck(req: express.Request, res: express.Response): void {
        res.sendStatus(200);
    }
}

nconf.argv()
    .file('../config.json');
const server = Server.start();