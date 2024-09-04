const express = require("express");
const app = new express();
const {connection} = require('../db_connection');

const bcrypt = require('bcrypt');
const chalk = require('chalk');

let log = console.log;
let api_port = 3100;

const getDate = () => {
    let currentDate = new Date();
    return {
        date: String(currentDate.getDate()).padStart(2, '0'),
        month: String(currentDate.getMonth() + 1).padStart(2, '0'),
        year: currentDate.getFullYear(),
        hour: String(currentDate.getHours()).padStart(2, '0'),
        minute: String(currentDate.getMinutes()).padStart(2, '0'),
        second: String(currentDate.getSeconds()).padStart(2, '0')
    }
}

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

app.listen(api_port, () => {
    log(`Server started on port ${chalk.bgBlue.whiteBright(` ${api_port} `)}`);
});

app.use(express.json());

app.get('/api/v1/auth/authLogin', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username == undefined || password == undefined) {
        return res.json({
            status: 401,
            message: "Username & Password cannot be empty."
        });
    }
    await connection.execute("SELECT password FROM users WHERE username = ? LIMIT 1", [username], function (err, result, fields) {
        if (result.length > 0) {
            if (bcrypt.compareSync(req.body.password, result[0].password)) {
                log(`[${getDate().date}/${getDate().month}/${getDate().year} ${getDate().hour}:${getDate().minute}:${getDate().second}] ${chalk.green('[200]')} Login Successfully for ${chalk.green(username)}`);
                return res.json({
                    status: 200,
                    message: "Login Success"
                });
            }
        }
        log(`[${getDate().date}/${getDate().month}/${getDate().year} ${getDate().hour}:${getDate().minute}:${getDate().second}] ${chalk.red('[401]')} Login Failed for ${chalk.red(username)}`);
        return res.json({
            status: 401,
            message: "Unauthorized"
        });
    });
});

app.post('/api/v1/auth/authReg', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    if (username == undefined || password == undefined || email == undefined) {
        return res.json({
            status: 400,
            message: "Username & Password & Email cannot be empty."
        });
    }

    if (username.indexOf(' ') > 0) {
        return res.json({
            status: 400,
            message: "Username cannot has whitespace."
        });
    }

    if (!validateEmail(email)) {
        log(`[${getDate().date}/${getDate().month}/${getDate().year} ${getDate().hour}:${getDate().minute}:${getDate().second}] ${chalk.red('[400]')} Register failed for ${chalk.red(username)} with invalid email format.`);
        return res.json({
            status: 400,
            message: "Invalid email format."
        });
    }

    let encryptPassword = bcrypt.hashSync(password, 10);
    
    await connection.execute("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [username, encryptPassword, email], function (err, result, fields) {
        if (err instanceof Error) {
            log(`[${getDate().date}/${getDate().month}/${getDate().year} ${getDate().hour}:${getDate().minute}:${getDate().second}] ${chalk.red('[400]')} ${err}`);
            return res.json({
                status: 400,
                code: err.code,
                message: err.message
            });
        } else {
            log(`[${getDate().date}/${getDate().month}/${getDate().year} ${getDate().hour}:${getDate().minute}:${getDate().second}] ${chalk.green('[200]')} Register Successfully for ${chalk.green(username)}`);
            return res.json({
                status: 200,
                message: "Register Successfully"
            });
        }
    });
});