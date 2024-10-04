const express = require("express");
const app = new express();

const bcrypt = require('bcrypt');
const chalk = require('chalk');
const mysql = require('mysql2/promise');
const cors = require('cors');

let api_port = 3100;
let log = (msg) => {
    console.log(`${chalk.blueBright(`[${getDate().date}/${getDate().month}/${getDate().year} ${getDate().hour}:${getDate().minute}:${getDate().second}]`)}`, msg);
}

// 1. * - Second (0-59)
// 2. * - Minute (0-59)
// 3. * - Hour (0-23)
// 4. * - Day of the month (1-31)
// 5. * - Month (1-12)
// 6. * - Day of the week (0-6), where 0 = Sunday
// const cron = require('node-cron');
// cron.schedule('*/30 * * * * *', () => {
//     console.log('Run task every 30 sec');
// });

const getDate = () => {
    let currentDate = new Date();
    return {
        curDate: currentDate,
        date: String(currentDate.getDate()).padStart(2, '0'),
        month: String(currentDate.getMonth() + 1).padStart(2, '0'),
        year: currentDate.getFullYear(),
        hour: String(currentDate.getHours()).padStart(2, '0'),
        minute: String(currentDate.getMinutes()).padStart(2, '0'),
        second: String(currentDate.getSeconds()).padStart(2, '0')
    }
}

const generateString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const delay = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

class Users {
    constructor (username, email, phone, firstname, lastname) {
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.firstname = firstname;
        this.lastname = lastname;
    }
}

app.listen(api_port, async () => {
    await delay(500);
    console.clear();
    console.log(`
 ____  ______  __ __  ______   ___   ____        ____  ____ ____ 
|    ||      ||  |  ||      | /   \\ |    \\      /    ||    \\    |
 |  | |      ||  |  ||      ||     ||  D  )    |  o  ||  o  )  | 
 |  | |_|  |_||  |  ||_|  |_||  O  ||    /     |     ||   _/|  | 
 |  |   |  |  |  :  |  |  |  |     ||    \\     |  _  ||  |  |  | 
 |  |   |  |  |     |  |  |  |     ||  .  \\    |  |  ||  |  |  | 
|____|  |__|   \\__,_|  |__|   \\___/ |__|\\_|    |__|__||__| |____|
        `)
    log(`Server port: ${chalk.bgBlue.whiteBright(` ${api_port} `)}`);
    getConnection();
});

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    return res.status(200).send("Server is running...");
});

app.post('/api/auth/login', async (req, res) => {
    const {user_id, password} = req.body;

    if (!user_id || !password) {
        return res.status(404).json({status: 404, message: "Username or Password must be submit to form."});
    }

    try {
        const sql = `SELECT * FROM users WHERE user_id = ?`;
        const values = [user_id];

        const [rows, fields] = await db.execute(sql, values);

        if (rows.length == 0) {
            log(`${chalk.red(`[LOGIN]`)} Failed Login: ${chalk.red(`${user_id}`)}`);
            return res.status(404).json({status: 404, message: "Username or Password is incorrect."});
        }

        if (bcrypt.compareSync(password, rows[0].password)) {
            log(`${chalk.green(`[LOGIN]`)} Successful Login: ${chalk.green(`${user_id}`)}`);
            new Users(rows[0].user_id, rows[0].email, rows[0].phone, rows[0].firstname, rows[0].lastname);
            return res.json({status: 200, message: "Login Successful"});
        }
    } catch (error) {
        log(error.message);
        return res.status(404).json({status: 404, code: error.code, message: error.message});
    }

    log(`${chalk.red(`[LOGIN]`)} Failed Login: ${chalk.red(`${user_id}`)}`);
    return res.status(404).json({status: 404, message: "Username or Password is incorrect."});
    
});

app.post('/api/auth/register', async (req, res) => {
    const {user_id, password, email} = req.body;

    if (!user_id || !password || !email) {
        return res.status(404).json({status: 404, message: "Username / Password / Email must be submit to form."});
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO `users` (`user_id`, `password`, `email`) VALUES (?, ?, ?)';
        const values = [user_id, passwordHash, email];

        const [result, fields] = await db.execute(sql, values);
        if (result.affectedRows == 1) {
            log(`${chalk.green(`[REGISTER]`)} Successful - ${chalk.green(`${user_id}`)} with email ${chalk.green(`${email}`)}`);
            return res.json({status: 200, message: "Register Successful"});
        }
    } catch (error) {
        log(`${chalk.red(`[REGISTER]`)} Failed - ${error.message}`);
        return res.status(404).json({status: 404, code: error.code, message: error.message});
    }

    
    return res.status(404).json({status: 404, message: "Username / Password / Email is incorrect."});

});

app.get('/api/course/allCourse', async (req, res) => {

    try {
        const sql = 'SELECT * FROM courses';
        const [result, fields] = await db.execute(sql);
        return res.json({status: 200, data: result});
    } catch (error) {
        return res.status(404).json({status: 404, code: error.code, message: error.message});
    }

});

app.post('/api/course/enrollCourse', async (req, res) => {
    const {user_id, course_id} = req.body;

    if (!user_id || !course_id) {
        return res.status(404).json({status: 404, message: "User ID / Course ID must be submit to form."});
    }

    try {
        const sql = 'INSERT INTO `user_course` (`user_id`, `course_id`) VALUES (?, ?)';
        const values = [user_id, course_id];
        const [result, fields] = await db.execute(sql, values);
        if (result.affectedRows == 1) {
            return res.json({status: 200, message: "Enroll Successful"});
        }
    } catch (error) {
        return res.status(404).json({status: 404, code: error.code, message: error.message});
    }

    return res.status(404).json({status: 404, message: "Enroll Failed"});
});