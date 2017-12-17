module.exports = class Subscribers {

    postSubscriber(req, res) {
        let options = {"sort": [['_id','desc']]}
        const query = { _id: req.params.id };
        const push = {$push: {"subscribers": req.body}};
        const querySubscriberAlreadyExists = { _id : req.params.id, subscribers: {$elemMatch: {mail: req.body.mail}}};
        req.app.locals.db.collection('sensors').findOne(querySubscriberAlreadyExists)
            .then((sensor) => {
                if (sensor) {
                    res.sendStatus(409);
                    throw "Resource already exists";
                }
            })
            .then(() => req.app.locals.db.collection('sensors').updateOne(
                    {_id: req.params.id}, push))
            .then((subscriber) => res.sendStatus(subscriber ? 201: 404));
    }

    deleteSubscriber(req, res) {
        const find = {_id: req.params.id};
        const pull = {$pull: { "subscribers" : {mail: req.params.mail}}};
        req.app.locals.db.collection('sensors').updateOne(find, pull)
            .then(() => res.sendStatus(204));
    }
}
