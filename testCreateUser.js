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
  const currentUser = {
    first_name: '',
    last_name: '',
    weekly_income: 0,
    weekly_expense: 0,
    current_income: 0,
    current_expense: 0,
};

function login(username, password) {
    // Open a connection to the database
    const db = new sqlite3.Database('./database.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
            return;
        }
    });

    // Query the database for the user with matching username and password
    const query = `SELECT first_name, last_name, weekly_income, weekly_expense, current_income, current_expense 
                   FROM users 
                   WHERE username = ? AND password = ?`;

    db.get(query, [username, password], (err, row) => {
        if (err) {
            console.error('Database error:', err.message);
            return;
        }

        if (row) {
            // User found, populate currentUser with user data
            currentUser.first_name = row.first_name;
            currentUser.last_name = row.last_name;
            currentUser.weekly_income = row.weekly_income;
            currentUser.weekly_expense = row.weekly_expense;
            currentUser.current_income = row.current_income;
            currentUser.current_expense = row.current_expense;

            console.log('Login successful:', currentUser);
        } else {
            // No user found
            console.log('User not found');
        }

        // Close the database connection
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            }
        });
    });
}
  
login('john_doe', 'password123');

function saveUser(username, weeklyIncome, weeklyExpense, currentIncome, currentExpense) {
  // Open a connection to the database
  const db = new sqlite3.Database('./database.db', (err) => {
      if (err) {
          console.error('Error opening database:', err.message);
          return;
      }
  });

  // SQL query to update the user's financial data based on the username
  const query = `UPDATE users 
                 SET weekly_income = ?, weekly_expense = ?, current_income = ?, current_expense = ?
                 WHERE username = ?`;

  db.run(query, [weeklyIncome, weeklyExpense, currentIncome, currentExpense, username], function (err) {
      if (err) {
          console.error('Database error:', err.message);
          return;
      }

      if (this.changes > 0) {
          // Update was successful
          console.log(`Success: User ${username} updated!`);
      } else {
          // No user with that username was found
          console.log(`User ${username} not found.`);
      }
  });

  // Close the database connection
  db.close((err) => {
      if (err) {
          console.error('Error closing database:', err.message);
      }
  });
}

saveUser('john_doe', 1000, 500, 1200, 450);

process.on('exit', () => db.close());