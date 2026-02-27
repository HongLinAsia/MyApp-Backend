import pool from '../config/db.js';

export async function getUserByUserPasswordHash(username) {
    const [rows] = await pool.query('SELECT id, uuid, password_hash FROM myapp_db.users WHERE username = ?;', [username]);
    return rows[0];
}

export async function getUserByUsername(username) {
    const [rows] = await pool.query('SELECT id FROM myapp_db.users WHERE username = ?;', [username]);
    return rows[0];
}

export async function getUserByUserEmail(email) {
    const [rows] = await pool.query('SELECT id FROM myapp_db.users WHERE email = ?;', [email]);
    return rows[0];
}

export async function createUser(userData) {
    const { uuid, username, email, passwordHash } = userData;
    // ✅ 建议使用模板字符串，保持 SQL 清晰
    const sql = `
        INSERT INTO users 
        (uuid, username, email, password_hash) 
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [uuid, username, email, passwordHash]);
    return result.insertId;
}