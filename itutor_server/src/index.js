const express = require("express");
const app = new express();
const {connection} = require('../db_connection');

const bcrypt = require('bcrypt');
const chalk = require('chalk');

let log = console.log;
let api_port = 3100;

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

app.listen(api_port, () => {
    log(`Server started on port ${chalk.bgBlue.whiteBright(` ${api_port} `)}`);
});

app.use(express.json());

app.get('/api/v1/auth/authLogin', async (req, res) => {
    let {username, password} = req.body;
    if (username == undefined || password == undefined) {
        return res.json({
            status: 401,
            message: "Username & Password cannot be empty."
        });
    }
    await connection.execute("SELECT password FROM users WHERE username = ? LIMIT 1", [username], function (err, result, fields) {
        if (result.length > 0) {
            if (bcrypt.compareSync(password, result[0].password)) {
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
    let {username, password, email} = req.body;
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

app.post('/api/v1/enrollCourse', async (req, res) => {
    let {username, course_id} = req.body;
    let enroll_date = getDate().curDate;
    if (username == undefined || course_id == undefined) {
        return res.json({
            status: 400,
            message: "Username & Course ID cannot be empty."
        });
    }
    await connection.execute("SELECT * FROM courses WHERE course_id = ? LIMIT 1", [course_id], function (err, result, fields) {
        if (result.length == 0) {
            return res.json({
                status: 400,
                message: "Cannot find this course id."
            });
        } else {
            if (result[0].is_approve == 0) {
                return res.json({
                    status: 400,
                    message: "Course is not approved yet."
                });
            }
            connection.execute("SELECT username FROM users_course WHERE course_id = ?", [course_id], function (err, result, fields) {
                if (result.length > 0) {
                    return res.json({
                        status: 400,
                        message: "Already enrolled to this course."
                    });
                } else {
                    connection.execute("INSERT INTO users_course (username, course_id, enroll_date) VALUES (?, ?, ?)", [username, course_id, enroll_date], function (err, result, fields) {
                        if (err instanceof Error) {
                            log(`[${getDate().date}/${getDate().month}/${getDate().year} ${getDate().hour}:${getDate().minute}:${getDate().second}] ${chalk.red('[400]')} ${err.code}`);
                            return res.json({
                                status: 400,
                                code: err.code,
                                message: err.message
                            });
                        } else {
                            log(`[${getDate().date}/${getDate().month}/${getDate().year} ${getDate().hour}:${getDate().minute}:${getDate().second}] ${chalk.green('[200]')} ${username} enrolled to ${course_id}`);
                            return res.json({
                                status: 200,
                                message: "Enrolled Successfully"
                            });
                        }
                    });
                }
            })
        }
    });
});

app.post('/api/v1/createCourse', async (req, res) => {
    let {owner, course_name, course_desc, course_type} = req.body;
    let course_id = await generateString(10);

    if (owner == undefined || course_name == undefined || course_desc == undefined || course_type == undefined) {
        return res.json({
            status: 400,
            message: "Owner & Course Name & Course Description & Course Type cannot be empty."
        });
    }
    await connection.execute('INSERT INTO courses (owner, course_id, course_name, course_desc, course_type) VALUES (?, ?, ?, ?, ?)', [owner, course_id, course_name, course_desc, course_type], function (err, result, fields) {
        if (err instanceof Error) {
            log(`[${getDate().date}/${getDate().month}/${getDate().year} ${getDate().hour}:${getDate().minute}:${getDate().second}] ${chalk.red('[400]')} ${err.code}`);
            return res.json({
                status: 400,
                code: err.code,
                message: err.message
            });
        } else {
            log(`[${getDate().date}/${getDate().month}/${getDate().year} ${getDate().hour}:${getDate().minute}:${getDate().second}] ${chalk.green('[200]')} ${owner} created ${course_id}`);
            return res.json({
                status: 200,
                message: "Created Successfully"
            });
        }
    });
});

app.put('/api/v1/approveCourse', async (req, res) => {
    let {course_id, is_approve} = req.body;
    if (course_id == undefined || is_approve == undefined) {
        return res.json({
            status: 400,
            message: "Course ID & Approve Status cannot be empty."
        });
    }

    let create_date = new Date();
    let expired_date = new Date();
    expired_date.setDate(expired_date.getDate() + 7);

    await connection.execute("SELECT course_id FROM courses WHERE course_id = ?", [course_id], function (err, result, fields) {
        if (result.length == 0) {
            return res.json({
                status: 400,
                message: "Cannot find this course id."
            });
        } else {
            if (is_approve == 1) {
                connection.execute("UPDATE courses SET is_approve = ?, create_date = ?, expired_date = ? WHERE course_id = ?", [is_approve, create_date, expired_date, course_id], function (err, result, fields) {
                    if (err instanceof Error) {
                        log(`[${getDate().date}/${getDate().month}/${getDate().year} ${getDate().hour}:${getDate().minute}:${getDate().second}] ${chalk.red('[400]')} ${err.code}`);
                        return res.json({
                            status: 400,
                            code: err.code,
                            message: err.message
                        });
                    } else {
                        log(`[${getDate().date}/${getDate().month}/${getDate().year} ${getDate().hour}:${getDate().minute}:${getDate().second}] ${chalk.green('[200]')} ${course_id} approved successfully.`);
                        return res.json({
                            status: 200,
                            message: "Approved Successfully"
                        });
                    }
                });
            } else {
                log(`[${getDate().date}/${getDate().month}/${getDate().year} ${getDate().hour}:${getDate().minute}:${getDate().second}] ${chalk.green('[200]')} ${course_id} remove successfully.`);
                connection.execute("DELETE FROM courses WHERE course_id = ?", [course_id]);
                return res.json({
                    status: 200,
                    message: "Remove Successfully"
                });
            }
            
        }
    })

   
});