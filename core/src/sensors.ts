import express = require('express');

export class Sensors {
    private app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
        this.routes();
    }

    private routes() {
        this.app.get('/sensors', this.getAllSensors);
        this.app.get('/sensors/:id', this.getOneSensor);
    }

    private getAllSensors(req: express.Request, res: express.Response): any {
        res.send('todo all sensors');
    }

    private getOneSensor(req: express.Request, res: express.Response): any {
        res.send('todo the sensor : '+req.params.id);
    }
}