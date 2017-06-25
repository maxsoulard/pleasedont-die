// server.ts 
  
import bodyParser = require('body-parser');
import express = require('express');
import Promise = require("bluebird");
import mongodb = require('mongodb');
import { Sensors } from "./sensors";

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
    }
}

const server = Server.start();
