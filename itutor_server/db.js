const mysql = require('mysql2');
const log = console.log;
const chalk = require('chalk');

let db;
async function getConnection() {
    try {
        db = await mysql.createConnection({
            host: 'db.itutor.jokeped.net',
            user: 'itutor',
            password: 'v(2@jwAjq1uK7PCp',
            database: 'itutor',
        });
        log(`Database: ${chalk.bgGreen.whiteBright(` Connected `)}`);
    } catch (error) {
        log(error);
    }
}

getConnection();

module.exports = {db}