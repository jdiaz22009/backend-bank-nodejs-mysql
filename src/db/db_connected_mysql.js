const mysql_connect = require('mysql');
const db_auth = require('./db_auth')

module.exports = () => {
  return mysql_connect.createConnection({
    host: db_auth.db.host,
    user: db_auth.db.user,
    password: db_auth.db.password,
    database: db_auth.db.database,
    port: db_auth.db.port
  })
}

