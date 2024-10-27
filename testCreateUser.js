const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

function user(first_name, last_name, weekly_income, weekly_expense, current_income, current_expense) {
    this.first_name = '';
    this.last_name = '';
    //These two are the projected values for each week.
    this.weekly_income = 0;
    this.weekly_expense = 0;
    //These two are the real world values for each week.
    this.current_income = 0;
    this.current_expense = 0;
}

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
  
  // Testing the createUser function
  createUser('john_doe', 'password123', 'John', 'Doe', 500, 200, 450, 180);
  createUser('jane_doe', 'password456', 'Jane', 'Doe', 600, 250, 500, 200);
  createUser('larry', 'newpassword', 'John', 'Doe', 700, 300, 650, 250); // This should fail (duplicate username)
  function getAllUsers(callback) {
    db.all("SELECT * FROM users", (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, rows);
    });
  }
  
  // Call getAllUsers after testing createUser
  getAllUsers((err, users) => {
    if (err) {
      console.error('Error retrieving users:', err);
    } else {
      console.log('All users:', users);
    }
  });
  // Close the database connection after operations are complete
  process.on('exit', () => db.close());