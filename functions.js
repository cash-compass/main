// allows us to read and write files
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

function changeColor() {
    document.getElementById("my-div").style.backgroundColor = "#FDF305";

}
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
// Function used for the income button
function incomeButton() {
    // creates a temp variable, that will store the user input into it
    var temp = document.getElementById('income');

    // This if statement will test to see if the user input isn't empty and actually holds data
    // If true it will push he data to the income array
    // If false then it will send an alert to the user input a data
    if (temp.value.trim() != ""){
        income.push(temp.value.trim());
        addIncome(temp.value.trim());
        income.value = '';
    }
    else {
        alert("Value Field is Empty, Please Input!");
    }
}

// Function used for the expenses button
function expendituresButton() {
    // creates a temp variable, that will store the user input into it
    var temp = document.getElementById('expense');

    // This if statement will test to see if the user input isn't empty and actually holds data
    // If true it will push he data to the expenses array
    // If false then it will send an alert to the user input a data
    if (temp.value.trim() != ""){
        expenses.push(temp.value.trim());
        addExpense(temp.value.trim());
        expense.value = '';
    }
    else {
        alert("Value Field is Empty, Please Input!");
    }
}

// going to be used for saving the user data
function saveButton() {

}

// used for taking all the data and calculate their budget
function budgetCalc() {

}

//This function updates the user's name when the page loads.
//This is how you have to wrtie anything that you want to happen right away.
//window.onload = function() {
//   document.getElementById('username_html').innerHTML = test_user.first_name + " " + test_user.last_name;
//};
