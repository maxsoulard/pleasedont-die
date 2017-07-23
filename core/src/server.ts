// server.ts 
  
import bodyParser = require('body-parser');
import express = require('express');
import Promise = require("bluebird");
import mongodb = require('mongodb');
import { Sensors } from "./sensors";
import cors = require('cors');

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
        mongodb.MongoClient.connect("mongodb://192.168.0.17/pleasedont-die", { promiseLibrary: Promise })
            .catch(err => console.error(err.stack))
            .then(db => {
                this.app.locals.db = db;
                this.app.listen("8888", () => {
                    console.log(`Node.js app is listening at http://localhost:8888`);
                });
            });

    }

    private routes(): void {
        const sensors = new Sensors(this.app);
        this.app.get('/api/health', this.healthCheck);
        this.app.get('/api/sensors', sensors.getAllSensors);
        this.app.get('/api/sensors/:id', sensors.getOneSensor);
        this.app.get('/api/sensors/:id/data', sensors.getData);
        this.app.post('/api/sensors/:id/subscribers', sensors.postSubscriber.bind(sensors));
        this.app.delete('/api/sensors/:id/subscribers/:mail', sensors.deleteSubscriber.bind(sensors));
    }

    private healthCheck(req: express.Request, res: express.Response): void {
        res.sendStatus(200);
    }
}

const server = Server.start();
