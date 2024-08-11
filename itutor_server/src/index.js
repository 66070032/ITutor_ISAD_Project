const express = require("express");
const app = new express();
const {connection} = require('../db_connection');

app.listen(3100, () => {
    console.log('Server started on port 3100');
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const generateToken = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

app.post('/api/v1/auth/authLogin', async (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let role = req.body.role;
    let unique_key = await generateToken(10);
    await connection.execute("INSERT INTO users (username, email, role, unique_key) VALUES (?, ?, ?, ?)", [username, email, role, unique_key], function (err, result, fields) {
        if (result) {
            connection.execute("SELECT * FROM users WHERE username = ? LIMIT 1", [username], function (err, result, fields) {
                return res.json(result[0]);
            });
        } else {
            return res.json({
                status: 406,
                message: "Not Acceptable"
            });
        }
    });
});

app.get('/api/v1/auth/authLogin', async (req, res) => {
    let username = req.body.username;
    await connection.execute("SELECT * FROM users WHERE username = ? LIMIT 1", [username], function (err, result, fields) {
        if (result.length > 0) {
            return res.json(result[0]);
        } else {
            return res.json({
                status: 401,
                message: "Unauthorized"
            });
        }
    });
});