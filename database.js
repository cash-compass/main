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
});

// Close the database connection
db.close();