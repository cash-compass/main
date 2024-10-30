const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// User constructor
function user(first_name, last_name, weekly_income, weekly_expense, current_income, current_expense) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.weekly_income = weekly_income;
    this.weekly_expense = weekly_expense;
    this.current_income = current_income;
    this.current_expense = current_expense;
}

// Function to create a user
function createUser(username, password, firstName, lastName, weeklyIncome, weeklyExpense, currentIncome, currentExpense) {
    db.get(`SELECT username FROM users WHERE username = ?`, [username], (err, row) => {
        if (err) {
            console.error("Database error:", err.message);
            return;
        }

        if (row) {
            console.log("Error: Username already exists");
            return;
        }

        const sql = `INSERT INTO users (username, password, first_name, last_name, weekly_income, weekly_expense, current_income, current_expense)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        db.run(sql, [username, password, firstName, lastName, weeklyIncome, weeklyExpense, currentIncome, currentExpense], function (err) {
            if (err) {
                console.error("Error inserting user:", err.message);
            } else {
                console.log("User successfully added with ID:", this.lastID);
            }
        });
    });
}

// Function to get all users
function getAllUsers(callback) {
    db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
            return callback(err);
        }
        callback(null, rows);
    });
}

// Login function
function login(username, password) {
    const query = `SELECT first_name, last_name, weekly_income, weekly_expense, current_income, current_expense 
                   FROM users 
                   WHERE username = ? AND password = ?`;

    db.get(query, [username, password], (err, row) => {
        if (err) {
            console.error('Database error:', err.message);
            return;
        }

        if (row) {
            console.log('Login successful:', row);
        } else {
            console.log('User not found');
        }
    });
}

// Function to save user updates
function saveUser(username, weeklyIncome, weeklyExpense, currentIncome, currentExpense) {
    const query = `UPDATE users 
                   SET weekly_income = ?, weekly_expense = ?, current_income = ?, current_expense = ?
                   WHERE username = ?`;

    db.run(query, [weeklyIncome, weeklyExpense, currentIncome, currentExpense, username], function (err) {
        if (err) {
            console.error('Database error:', err.message);
            return;
        }

        if (this.changes > 0) {
            console.log(`Success: User ${username} updated!`);
        } else {
            console.log(`User ${username} not found.`);
        }
    });
}

createUser('colin', 'jones', '1', '1', 1, 1, 1, 1);
saveUser('colin', 2, 2, 2, 2);
saveUser('colin', 2, 2, 3, 2);

// Final step to close the database connection
process.on('exit', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
});
