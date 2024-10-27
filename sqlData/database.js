const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        weekly_income REAL,
        weekly_expense REAL,
        current_income REAL,
        current_expense REAL
    )`);
    console.log("Users table created");
})

db.close();