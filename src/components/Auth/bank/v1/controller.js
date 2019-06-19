'use strict'
const service = require('./service');
const controller = {}

controller.register = (req, res, next) => {
    const { body } = req;
    service.registerClient(body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error)

        })
}
controller.update = (req, res, next) => {
    const { body } = req;
    service.updateClient(body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error)

        })
}
controller.delete = (req, res, next) => {
    const { body } = req;
    service.deleteClient(body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error)

        })
}
module.exports = controller