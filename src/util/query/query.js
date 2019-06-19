'use strict'

const mysql_query = require('../../db/db_connected_mysql')
const query = {}

const connect = mysql_query()

query.select = sql => new Promise((resolve, reject) => {
  connect.query(sql, (e, search) => {
    if (e) {
      return reject({ code: 500, status: 'Internal server error', e})
    } else {
      if (search.length > 0) {
        return resolve({ code: 200, status: 'successful', message: 'already exists', search })
      } else {
        return resolve({ code: 404, status: 'not found ', search })
      }
    }
  })
})

query.insert = sql => new Promise((resolve, reject) => {
  connect.query(sql, (e, insert) => {
    if (e) {
      return reject({ code: 500, status: 'Internal server error', e })
    } else {
      return resolve({ code: 200, status: 'created successful', insert })
    }
  })
})

query.update = sql => new Promise((resolve, reject) => {
  connect.query(sql, (e, insert) => {
    if (e) {
      return reject({ code: 500, status: 'Internal server error', e })
    } else {
      return resolve({ code: 200, status: 'update successful', insert })
    }
  })
})


module.exports = query