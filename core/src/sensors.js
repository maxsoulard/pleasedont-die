module.exports = class Sensors {

    getSensors(req, res) {
        req.app.locals.db.collection('sensors').find().toArray((err, sensors) => {
            if (sensors)    res.send(sensors);
            else            res.sendStatus(404);
        });
    }
    getOneSensor(req, res) {
        const query = { _id: req.params.id };

        req.app.locals.db.collection('sensors').findOne(query)
            .then((sensor) => {
                if (sensor)     res.send(sensor);
                else            res.sendStatus(404);
            });
    }

    getData(req, res) {
        let options = {"sort": [['_id','desc']]}
        const query = { sensorid: req.params.id };

        req.app.locals.db.collection('data').findOne(query, options)
            .then((sensor) => {
                if (sensor)     res.send(sensor);
                else            res.sendStatus(404);
            });
    }

    patchSensor(req, res) {
        const set = { $set: req.body };
        req.app.locals.db.collection('sensors').updateOne({_id: req.params.id}, set)
            .then(() => req.app.locals.db.collection('sensors').findOne({ _id: req.params.id }))
            .then((sensor) => {
                res.send(sensor);
            });
    }
}