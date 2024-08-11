const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '10.144.1.201',
  user: 'itutor',
  database: 'itutor_database',
});

module.exports = {connection};