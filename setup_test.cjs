const Database = require('better-sqlite3');
const crypto = require('crypto');
const db = new Database('database.sqlite');
db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`);
const hash = crypto.createHash('sha256').update('12345678').digest('hex');
db.prepare('INSERT OR IGNORE INTO users (email, password_hash, status) VALUES (?, ?, ?)').run('teste@teste.com', hash, 'active');
console.log('Test user created: teste@teste.com / 12345678');
