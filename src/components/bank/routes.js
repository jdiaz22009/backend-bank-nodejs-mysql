'use strict'

const express = require('express')
const api = express.Router()
const user = require('./clients/v1/controller')
const products = require('./products/v1/controller')
const cardBank = require('./card_bank/controller')

//? routes clients
api.post('/v1/bank/clients/register', user.register)
api.put('/v1/bank/clients/update_client', user.update)
api.put('/v1/bank/clients/delete_client', user.delete)


//? routes products
api.post('/v1/bank/products/add', products.addProducts)
api.put('/v1/bank/products/update', products.updateProducts)
api.put('/v1/bank/products/deleteProduct', products.deleteProduct)
api.get('/v1/bank/products/getProducts', products.getProduct)


//? routes cardBank
api.post('/v1/bank/card/add', cardBank.addCardBank)
api.put('/v1/bank/card/update', cardBank.updateCard)
api.put('/v1/bank/card/deleteCard', cardBank.deleteCardList)
api.get('/v1/bank/card/report', cardBank.getCardReport)




module.exports = api
