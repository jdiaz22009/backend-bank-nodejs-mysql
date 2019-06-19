'use strict'
const services = {};
const moment = require('moment')
const mysql_query = require('../../../../db/db_connected_mysql')

const connect = mysql_query()
const currentDate = moment().format()


const query = query => new Promise((resolve, reject) => {
    connect.query(query, function (error, sql) {
        if (error) {
            return reject({ code: 500, status: 'Internal server error', error })
        } else {
            if (sql.length > 0) {
                return resolve({ code: 200, status: 'successful', message: 'already exists', sql })
            } else {
                return resolve({ code: 404, status: 'not found ', sql })
            }
        }
    })
})
//? Api client
services.registerClient = data => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM clients WHERE email = '${data.email}'`
        query(sql)
            .then(res => {
                if (res.code == 200) {
                    return resolve(res)
                } else {
                    data.create_date = currentDate
                    data.create_update = currentDate
                    data.status = 1
                    let sql = `INSERT INTO clients (name, last_name, document, email, phone_mobile, age, status , create_date, create_update) VALUES('${data.name}','${data.last_name}',${data.document},'${data.email}',${data.phone_mobile},${data.age},${data.status},'${data.create_date}', '${data.create_update}')`
                    connect.query(sql, function (error, insertClients) {
                        if (error) {
                            return reject({ code: 500, status: 'Internal server error', error })
                        } else {
                            return resolve({ code: 200, status: 'created successful', insertClients })
                        }
                    })
                }
            })
            .catch(e => {
                return reject(e)
            })
    })
}


services.updateClient = data => new Promise((resolve, reject) => {
    const sql = `SELECT * FROM clients WHERE email = '${data.email}'`
    data.create_update = currentDate;
    query(sql)
        .then(res => {
            if (res.code == 200) {
                const user = res.sql
                for (let users of user) {
                    const update = `UPDATE clients SET name = '${data.name}', last_name = '${data.last_name}', document = ${data.document}, email= '${data.email}' , phone_mobile = ${data.phone_mobile}, age = ${data.age}, create_update = '${data.create_update}' WHERE email = '${users.email}'`
                    connect.query(update, function (error, update) {
                        if (error) {
                            return reject({ code: 500, status: 'Internal server error', error })
                        } else {
                            return resolve({ code: 200, status: 'update successful', update })
                        }
                    })
                }
            }
        })
        .catch(e => {
            return reject(e)
        })
})


services.deleteClient = data => new Promise((resolve, reject) => {
    const sql = `SELECT * FROM clients WHERE email = '${data.email}'`
    query(sql)
        .then(res => {
            if (res.code == 200) {
                const user = res.sql
                for (let users of user) {
                    const update = `UPDATE clients SET status = ${0} WHERE email = '${users.email}'`
                    connect.query(update, function (error, update) {
                        if (error) {
                            return reject({ code: 500, status: 'Internal server error', error })
                        } else {
                            return resolve({ code: 200, status: 'update successful', update })
                        }
                    })
                }
            }
        })
})
















module.exports = services;
