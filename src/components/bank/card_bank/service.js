'use strict'
const services = {}
const moment = require('moment')
const mysql_query = require('../../../db/db_connected_mysql')
const connect = mysql_query()
const sql = require('../../../util/query/query')
const currentDate = moment().format()

//? Api products

services.addCardList = data => new Promise((resolve, reject) => {
  data.create_date = currentDate
  data.create_update = currentDate
  data.status = 1
  const insert = `INSERT INTO card_bank (id_client, id_product, num_card, cvc , date_valid , type_card, status, create_date, create_update) VALUES (${data.id_client}, ${data.id_product}, ${data.num_card}, ${data.cvc}, '${data.date_valid}', '${data.type_card}', '${data.status}', '${data.create_date}', '${data.create_update}')`
  sql.insert(insert)
    .then(res => {
      return resolve(res)
    })
    .catch(e => {
      return reject(e)
    })
})


services.updateCardList = data => new Promise((resolve, reject) => {
  const query = `SELECT * FROM card_bank WHERE id_card = ${data.id_card}`
  data.create_update = currentDate;
  sql.select(query)
    .then(res => {
      if (res.code == 200) {
        const cardBank = res.search
        for (let card of cardBank) {
          const update = `UPDATE card_bank SET id_client = ${data.id_client}, id_product = ${data.id_product} , num_card = ${data.num_card}, cvc = ${data.cvc}, date_valid = '${data.date_valid}', type_card = '${data.type_card}', create_update = '${data.create_update}' WHERE id_card = ${card.id_card}`
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


services.deleteCardList = data => new Promise((resolve, reject) => {
  const query = `SELECT * FROM card_bank WHERE id_card = ${data.id_card}`
  sql.select(query)
    .then(res => {
      if (res.code == 200) {
        const cardBank = res.search
        for (let card of cardBank) {
          const update = `UPDATE card_bank SET status = ${0} WHERE id_card = ${card.id_card}`
          sql.update(update)
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

services.getCardListReport = () => new Promise((resolve, reject) => {
  const query = `SELECT * FROM card_bank c INNER JOIN clients cli ON c.id_client = cli.id_client INNER JOIN products p ON c.id_product = p.id_product WHERE c.create_date between now() + interval -1 year  and now() + interval 1 year`
  sql.select(query)
    .then(res => {
      return resolve(res)
    })
    .catch(e => {
      return reject(e)
    })
})



module.exports = services