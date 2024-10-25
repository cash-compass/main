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
    const filePath = 'users.txt';

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

    fs.appendFile('users.txt', userLine, (err) => {
        if (err) {
            console.error("error");
        } 
        else {
            console.log("success");
        }
    });
}

// Precondition: 'users.txt' contains a user with username 'johndoe'
createUser("johndoe", "newpass", "John", "Smith", 1500, 700, 7000, 3500);

// Expected Result: "Error: Username already exists" message

