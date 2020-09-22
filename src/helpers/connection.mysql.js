const mysql = require('mysql2');
const {USER, DB, PASSWORD} = process.env;
const connection = mysql.createConnection({
  host: 'localhost',
  user: USER,
  database: DB,
  password: PASSWORD,
});

module.exports = connection;
