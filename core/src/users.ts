import express = require('express');

export class Users {
    private app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
        this.routes();
    }

    private routes() {
        this.app.get('/users', this.getAllUsers);
        this.app.get('/users/:id', this.getOneUser);
        this.app.get('/users/:id/notifications', this.getAllNotifications);
        this.app.get('/users/:id/notifications/:idnotification', this.getOneNotification);
    }

    private getAllUsers(req: express.Request, res: express.Response): any {
        res.send('todo all users');
    }

    private getOneUser(req: express.Request, res: express.Response): any {
        res.send('todo the user : '+req.params.id);
    }

    private getAllNotifications(req: express.Request, res: express.Response): any {
        res.send('todo all users');
    }

    private getOneNotification(req: express.Request, res: express.Response): any {
        res.send('todo the user : '+req.params.id+', the notification '+req.params.idnotification);
    }
}