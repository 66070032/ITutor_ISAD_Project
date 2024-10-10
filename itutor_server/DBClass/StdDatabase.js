const {db} = require('../db');
const bcrypt = require('bcrypt');

class StdDatabase {
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

    async #createUser(user_id, password, email, phone, role, firstname, lastname, status) {
        const sql = 'INSERT INTO `users` (`user_id`, `password`, `email`, `phone`, `role`, `firstname`, `lastname`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [user_id, password, email, phone, role, firstname, lastname, status];
        const [result, fields] = await db.execute(sql, values);
        return result;
    }

    async #loginUser(user_id, password) {
        const sql = 'SELECT * FROM users WHERE user_id = ?';
        const values = [user_id];
        const [rows, fields] = await db.execute(sql, values);
        if (rows.length == 0) {
            return false;
        }
        if (await bcrypt.compare(password, rows[0].password)) {
            return true;
        }
        return false;
    }
}