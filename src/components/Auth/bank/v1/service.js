'use strict'
const services = {};
const moment = require('moment')
const mysql_query = require('../../../../db/db_connected_mysql')

services.registerClient = function (data) {
    return new Promise((resolve, reject) => {
        const connect = mysql_query()
        let sql = `SELECT * FROM clients WHERE email = '${data.email}'`
        connect.query(sql, function (error, result) {
            if (error) {
                console.error('ERROR', error)
            } else {
                if (result.length > 0) {
                    console.log('hay algo', result)
                } else {
                    const currentDate = moment().format()
                    data.create_date = currentDate
                    data.create_update = currentDate
                    let sql = `INSERT INTO clients (name, last_name, document, email, phone_mobile, age, create_date, create_update) VALUES('${data.name}','${data.last_name}', ${data.document}, '${data.email}', ${data.phone_mobile}, ${data.age}, '${data.create_date}', '${data.create_update}')`
                    console.log(sql,'sql')
                    connect.query(sql, function (error, insertClients) {
                        if (error) {
                            console.error(error);
                        } else {
                            console.log(insertClients);
                        }
                    })
                    console.log('no hay nada', result)
                }
            }
        })
    })
}

module.exports = services;
