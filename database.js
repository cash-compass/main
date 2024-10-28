const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    // Drop the existing users table if it exists
    db.run(`DROP TABLE IF EXISTS users`, (err) => {
        if (err) {
            console.error("Error dropping table:", err.message);
        } else {
            console.log("Dropped existing users table.");
        }
    });

    db.run('PRAGMA foreign_keys = ON');

    // Create a new users table with the correct structure
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        first_name TEXT,
        last_name TEXT,
        weekly_income REAL DEFAULT 0,
        weekly_expense REAL DEFAULT 0,
        current_income REAL DEFAULT 0,
        current_expense REAL DEFAULT 0
    )`, (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            console.log("Users table created successfully.");
        }
    });

    db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
            transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            amount REAL,
            description TEXT,
            date TEXT,
            FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) {
            console.error('Error creating transactions table:', err.message);
        } else {
            console.log('Transactions table created or already exists.');
        }
    });
});

// Close the database connection
db.close();