'use strict'
const services = {};
const moment = require('moment')
const mysql_query = require('../../../../db/db_connected_mysql')
const connect = mysql_query()
const sql = require('../../../../util/query/query')
const currentDate = moment().format()



//? Api client
services.registerClient = data => {
    return new Promise((resolve, reject) => {
        const select = `SELECT * FROM clients WHERE email = '${data.email}'`
        sql.select(select)
            .then(res => {
                if (res == 200) {
                    return resolve(res)
                } else {
                    data.create_date = currentDate
                    data.create_update = currentDate
                    data.status = 1
                    const insert = `INSERT INTO clients (name, last_name, document, email, phone_mobile, age, status , create_date, create_update) VALUES('${data.name}','${data.last_name}',${data.document},'${data.email}',${data.phone_mobile},${data.age},${data.status},'${data.create_date}', '${data.create_update}')`
                    sql.insert(insert)
                        .then(res => {
                            return resolve(res)
                        })
                        .catch(e => {
                            if (e) {
                                if (e.e.code == 'ER_DUP_ENTRY') {
                                    return reject({ message: 'Duplicate email' })
                                } else {
                                    return reject(e)
                                }
                            }
                        })
                }
            })
    })
}


services.updateClient = data => new Promise((resolve, reject) => {
    const query = `SELECT * FROM clients WHERE email = '${data.email}'`
    data.create_update = currentDate;
    sql.select(query)
        .then(res => {
            if (res.code == 200) {
                const user = res.search
                for (let users of user) {
                    const update = `UPDATE clients SET name = '${data.name}', last_name = '${data.last_name}', document = ${data.document}, email= '${data.email}' , phone_mobile = ${data.phone_mobile}, age = ${data.age}, create_update = '${data.create_update}' WHERE id_client = ${users.id_client}`
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


services.deleteClient = data => new Promise((resolve, reject) => {
    const select = `SELECT * FROM clients WHERE email = '${data.email}'`
    sql.select(select)
        .then(res => {
            if (res.code == 200) {
                const user = res.search
                for (let users of user) {
                    const update = `UPDATE clients SET status = ${0} WHERE id_client = ${users.id_client}`
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
})
















module.exports = services;
