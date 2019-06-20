'use strict'
const services = {}
const moment = require('moment')
const sql = require('../../../../util/query/query')
const currentDate = moment().format()

//? Api products

services.addProduct = data => new Promise((resolve, reject) => {
  data.create_date = currentDate
  data.create_update = currentDate
  data.status = 1
  const insert = `INSERT INTO products (name_product,desc_product, status,create_date, create_update) VALUES('${data.name_product}','${data.desc_product}', ${data.status}, '${data.create_date}', '${data.create_update}')`
  sql.insert(insert)
    .then(res => {
      return resolve(res)
    })
    .catch(e => {
      return reject(e)
    })
})

services.getProduct = () => new Promise((resolve, reject) => {
  const query = 'SELECT * FROM products WHERE status = 1'
  sql.select(query)
    .then(res => {
      return resolve(res)
    })
    .catch(e => {
      return reject(e)
    })
})

services.updateProduct = data => new Promise((resolve, reject) => {
  const query = `SELECT * FROM products WHERE id_product = ${data.id_product}`
  data.create_update = currentDate
  sql.select(query)
    .then(res => {
      if (res.code == 200) {
        const product = res.search
        for (let products of product) {
          const update = `UPDATE products SET name_product = '${data.name_product}', desc_product = '${data.desc_product}', create_update = '${data.create_update}' WHERE id_product = ${products.id_product}`
          sql.update(update)
            .then(res => {
              return resolve(res)
            })
            .catch(e => {
              return reject(e)
            })
        }
      }
    })
    .catch(e => {
      return reject(e)
    })
})


services.deleteProducts = data => new Promise((resolve, reject) => {
  const query = `SELECT * FROM products WHERE id_product = ${data.id_product}`
  sql.select(query)
    .then(res => {
      if (res.code == 200) {
        const product = res.search
        for (let products of product) {
          const deleteProduct = `UPDATE products SET status = ${0} WHERE id_product = ${products.id_product}`
          sql.update(deleteProduct)
            .then(respo => {
              return resolve(respo)
            })
            .catch(e => {
              return reject(e)
            })
        }
      }
    })
    .catch(e => {
      return reject(e)
    })
})




module.exports = services


