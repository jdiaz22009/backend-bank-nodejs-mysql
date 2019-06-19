'use strict'
const service = require('./service')
const controller = {}

controller.addProducts = (req, res, next) => {
  const { body } = req
  service.addProduct(body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error)

    })
}

controller.getProduct = (req, res, next) => {
  service.getProduct()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error)

    })
}

controller.updateProducts = (req, res, next) => {
  const { body } = req
  service.updateProduct(body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error)

    })
}

controller.deleteProduct = (req, res, next) => {
  const { body } = req
  service.deleteProducts(body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error)
    })
}


module.exports = controller