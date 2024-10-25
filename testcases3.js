const fs = require('fs');

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
    const filePath = 'user.txt';

    let fileContent;
    try {
        fileContent = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log("File not found")
            fileContent = "";
        }
        else {
            console.error("Error reading file: ", err);
            return;
        }
    }

    const users = fileContent.split('\n').filter(Boolean);
    for (let user of users) {
        const userFields = user.split(',');
        if (userFields[0] === username) {
            console.log("Error: Username already exists");
            return;
        }
    }
    
    const userLine = `${username},${password},${firstName},${lastName},${weeklyIncome},${weeklyExpense},${currentIncome},${currentExpense}\n`;

    fs.appendFile('user.txt', userLine, (err) => {
        if (err) {
            console.error("error");
        } 
        else {
            console.log("success");
        }
    });
}

// Precondition: 'users.txt' does not exist
createUser("janedoe", "password456", "Jane", "Doe", 1200, 600, 6000, 3000);

// Expected Result: "File not found" message and the file is created with the new user

