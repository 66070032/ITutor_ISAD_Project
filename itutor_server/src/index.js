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

class Std {
    constructor(user_id, password, email, phone, role, firstname, lastname, status) {
      this.user_id = user_id;
      this.password = password || null;
      this.email = email || null;
      this.phone = phone || null;
      this.role = role || "student";
      this.firstname = firstname || null;
      this.lastname = lastname || null;
      this.status = status || 1;
    }
  
    async checkUser(user_id, password) {
        const check = await new StdDatabase().loginUser(user_id, password);
        return check;
    }

    async regisUser(user_id, password = null, email = null, phone = null, role = "student", firstname = null, lastname = null, status = 1) {
        this.user_id = user_id;
        this.password = password;
        this.email = email;
        this.phone = null || phone;
        this.role = role || "student";
        this.firstname = firstname;
        this.lastname = lastname;
        this.status = status;
        const encryptPass = await new encryptPassword().encrypt(password);
        const createUser = await new StdDatabase().createUser(user_id, encryptPass, email, phone, role, firstname, lastname, status);
        return createUser;
    }

    async viewTopic(course_id) {
        const topic = await new TpcDatabase().pullTopic(course_id);
        return topic;
    }
}

class encryptPassword {
    async encrypt(password) {
        return await bcrypt.hash(password, 10);
    }

    async compare(rawPass, hashPass) {
        return await bcrypt.compare(rawPass, hashPass);
    }
}

class StdDatabase {

    async loginUser(user_id, password) {
        try {
            const sql = 'SELECT * FROM users WHERE user_id = ?';
            const values = [user_id];
            const [rows, fields] = await db.execute(sql, values);
            if (rows.length == 0) {
                return {status: 400, message: "Username or Password is incorrect."};
            }
            if (await bcrypt.compare(password, rows[0].password)) {
                return {status: 200, message: "Login Successful"};
            }
            return {status: 400, message: "Login failed"};
        } catch (error) {
            return {status: 400, code: error.code, message: error.message};
        }
    }

    async createUser(user_id, password, email, phone, firstname, lastname) {
        try {
            const sql = 'INSERT INTO users (user_id, password, email, phone, firstname, lastname) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [user_id, password, email, phone, firstname, lastname];
            const [rows, fields] = await db.execute(sql, values);
            if (rows.affectedRows > 0) {
                return {status: 200, message: "User created successfully"};
            }
            return {status: 400, message: "User creation failed"};
        } catch (error) {
            return {status: 400, code: error.code, message: error.message};
        }
    }
}

class TpcDatabase {
    async pullTopic(course_id) {
        try {
            const sql = 'SELECT * FROM courses WHERE course_id = ?';
            const values = [course_id];
            const [rows, fields] = await db.execute(sql, values);
            if (rows.length == 0) {
                return {status: 400, message: "Course ID is incorrect."};
            }
            return {status: 200, data: rows};
        } catch (error) {
            return {status: 400, code: error.code, message: error.message};
        }
        return {status: 400, message: "Failed to load topic."};
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

/* app.post('/test', async (req, res) => {
    const {course_id} = req.body;
    const topic = await new Std().viewTopic(course_id);
    return res.json(topic);
}) */

app.post('/api/auth/login', async (req, res) => {
    const {user_id, password} = req.body;
    const checkUser = await new Std().checkUser(user_id, password);
    return res.json(checkUser);
})

app.post('/api/auth/register', async (req, res) => {
    const {user_id, password, email, phone, firstname, lastname} = req.body;
    const createUser = await new Std().regisUser(user_id, password, email, phone, firstname, lastname);
    return res.json(createUser);
})

app.post('/api/course/getCourse', async (req, res) => {
    const {course_id} = req.body;
    const topic = await new Std().viewTopic(course_id);
    return res.json(topic);
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
        const checkCourse = 'SELECT * FROM courses WHERE course_id = ?';
        const checkValues = [course_id];

        const [checkResult, checkFields] = await db.execute(checkCourse, checkValues);

        if (checkResult.length == 0) {
            return res.status(404).json({status: 404, message: "Course ID is incorrect."});
        }

        const enrollCourse = 'INSERT INTO `user_course` (`user_id`, `course_id`) VALUES (?, ?)';
        const enrollValues = [user_id, course_id];

        const [enrollResult, enrollFields] = await db.execute(enrollCourse, enrollValues);
        if (enrollResult.affectedRows == 1) {
            log(`${chalk.green(`[ENROLL]`)} Successful - ${chalk.green(`${user_id}`)} with course ${chalk.green(`${course_id}`)}`);
            return res.json({status: 200, message: "Enroll Successful"});
        }
    } catch (error) {
        return res.status(404).json({status: 404, code: error.code, message: error.message});
    }

    return res.status(404).json({status: 404, message: "Enroll Failed"});
});

app.post('/api/course/createCourse', async (req, res) => {
    const {owner_id, course_name, course_desc, course_pax, course_max_pax, course_expire} = req.body;

    if (!owner_id || !course_name || !course_desc || !course_max_pax || !course_expire) {
        return res.status(404).json({status: 404, message: "Owner ID / Course Name / Course Description / Course Max Pax / Course Expired must be submit to form."});
    }

    try {
        const course_create = `${getDate().year}-${getDate().month}-${getDate().date} ${getDate().hour}:${getDate().minute}:${getDate().second}`;
        const sql = 'INSERT INTO `courses` (`owner_id`, `course_name`, `course_desc`, `course_max_pax`, `course_create`, `course_expire`) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [owner_id, course_name, course_desc, course_max_pax, course_create, course_expire];

        const [result, fields] = await db.execute(sql, values);
        if (result.affectedRows == 1) {
            log(`${chalk.green(`[CREATE COURSE]`)} Successful - [${chalk.green(`${course_name}`)}, ${chalk.green(`${owner_id}`)}]`);
            return res.json({status: 200, message: "Create Course Successful"});
        }
    } catch (error) {
        return res.status(404).json({status: 404, code: error.code, message: error.message});
    }

    return res.status(404).json({status: 404, message: "Create Course Failed"});

})