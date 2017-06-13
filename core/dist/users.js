"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Users = (function () {
    function Users(app) {
        this.app = app;
        this.routes();
    }
    Users.prototype.routes = function () {
        this.app.get('/users', this.getAllUsers);
        this.app.get('/users/:id', this.getOneUser);
        this.app.get('/users/:id/notifications', this.getAllNotifications);
        this.app.get('/users/:id/notifications/:idnotification', this.getOneNotification);
    };
    Users.prototype.getAllUsers = function (req, res) {
        res.send('todo all users');
    };
    Users.prototype.getOneUser = function (req, res) {
        res.send('todo the user : ' + req.params.id);
    };
    Users.prototype.getAllNotifications = function (req, res) {
        res.send('todo all users');
    };
    Users.prototype.getOneNotification = function (req, res) {
        res.send('todo the user : ' + req.params.id + ', the notification ' + req.params.idnotification);
    };
    return Users;
}());
exports.Users = Users;
