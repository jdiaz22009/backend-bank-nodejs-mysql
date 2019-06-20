'use strict'
const service = require('./service')
const controller = {}

controller.addCardBank = (req, res, next) => {
  const { body } = req
  service.addCardList(body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error)
    })
}

controller.updateCard = (req, res, next) => {
  const { body } = req
  service.updateCardList(body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error)
    })
}

controller.deleteCardList = (req, res, next) => {
  const { body } = req
  service.deleteCardList(body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error)
    })
}

controller.getCardReport = (req, res, next) => {
  service.getCardListReport()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error)
    })
}
module.exports = controller