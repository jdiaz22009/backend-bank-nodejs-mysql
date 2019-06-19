'use strict'
const express = require('express');
const bodyParse = require('body-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const mysql_connect = require('../../db/db_connected_mysql')
const config = require('../../db/db_auth')
const log = console.log

const app = express();

//? connect mysql
const port = config.serve.port
const mysql = mysql_connect()
mysql.connect(function(e){
  if(e) throw e
  app.listen(port,function(){
    log(`Connected mysql & server listening in  http://localhost:${port}`)
  })
})

app.use(bodyParse.json({ limit: '100mb'}));

app.use(bodyParse.urlencoded({ extended: true}));

app.use(bodyParse.json());

app.use(morgan('dev'));

app.use(cors());

app.use(fileUpload());

app.use('/api',routes);

module.exports = app;
