'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "vtgoroot",
  database: process.env.DB_NAME || "nodejs_api"
});

module.exports = db