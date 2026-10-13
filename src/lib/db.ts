import Database from 'better-sqlite3';
import path from 'path';

// Define the path to the SQLite database file
const dbPath = path.resolve(process.cwd(), 'database.sqlite');

// Initialize the database connection
const db = new Database(dbPath, { verbose: console.log });

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    reset_token TEXT,
    reset_token_expires DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Safe migrations if table already existed without these columns
try {
  db.exec(`ALTER TABLE users ADD COLUMN reset_token TEXT;`);
} catch (e) {}

try {
  db.exec(`ALTER TABLE users ADD COLUMN reset_token_expires DATETIME;`);
} catch (e) {}

export default db;
