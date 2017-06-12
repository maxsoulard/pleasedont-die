// server.ts 
  
import bodyParser = require('body-parser');
import express = require('express');
import fs = require('fs');
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
        this.app.listen('8888');
    }

    private routes(): void {
        const sensors = new Sensors(this.app);
    }
}

const server = Server.start();
