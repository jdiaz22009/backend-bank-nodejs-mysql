'use strict'

const express = require('express')
const api = express.Router()
const user = require('./bank/v1/controller')

api.post('/v1/auth/register', user.register)
api.put('/v1/auth/update_client', user.update)
api.put('/v1/auth/delete_client', user.delete)

module.exports = api
