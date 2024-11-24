// allows us to read and write files
const fs = require('fs');

function changeColor() {
    document.getElementById("my-div").style.backgroundColor = "#FDF305";

}
//This is the user object constructor.
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

currentUser = new user();

// This function will create new users into the database
// It take all the data inputted when creating a new user and add into the databse using the proper format
// So that way we log in the user we make sure the data is called back in properly and not out of order
function createUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;

    const filePath = 'users.txt';

    let fileContent;
    try {
        fileContent = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log("File not found");
            fileContent = "";
        } else {
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

    const userLine = `${username},${password},${firstName},${lastName}\n`;

    fs.appendFile('users.txt', userLine, (err) => {
        if (err) {
            console.error("Error saving user");
        } else {
            console.log("User successfully created!");
            window.location.href = "login.htm"; // Redirect to login after successful user creation
        }
    });
}
// This function will take the inputted username and password given by the user and then see if it is within the database
// If found in the database it will copy all the data to the user
// If not found it will say user not found
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fs.readFile('users.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const lines = data.split('\n');

        for (const line of lines) {
            const [storedUsername, storedPassword] = line.split(',');
            if (storedUsername === username && storedPassword === password) {
                console.log('Login successful');
                // Set user data or redirect to another page
                window.location.href = "index.htm"; // Redirect to the main page after successful login
                return;
            }
        }

        console.log('User not found or incorrect password');
        alert('Invalid credentials, please try again');
    });
}

login('ciddous', 'legocolin04');

function saveUser(username, weeklyIncome, weeklyExpense, currentIncome, currentExpense) {
    const filePath = 'users.txt'

    let fileContent;
    try {
        fileContent = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error("Error reading file: ", err);
        return;
    }

    const users = fileContent.split('\n').filter(Boolean);

    const updatedUsers = users.map(user => {
        const userFields = user.split(',');

        if (userFields[0] === username) {
            console.log(`Updating user: ${username}`);

            userFields[4] = weeklyIncome;
            userFields[5] = weeklyExpense;
            userFields[6] = currentIncome;
            userFields[7] = currentExpense;
        }
        return userFields.join(',');
    });

    const newFileContent = updatedUsers.join('\n');

    fs.writeFile(filePath, newFileContent, (err) => {
        if (err) {
            console.error("Error writing to file:", err);
        }
        else {
            console.log("Success: User updated!");
        }
    });
}

// This function will first call the saveUser function to make sure that all the user data is saved into the system
// Once saved into the system it will result all the currentUser values to zero until another user logins
function logout() {
    saveUser();
    currentUser.first_name = 0;
    currentUser.last_name = 0;
    currentUser.weekly_income = 0;
    currentUser.weekly_expense = 0;
    currentUser.current_income = 0;
    currentUser.current_expense = 0;
}

//Function to get username
function getName(user) {
    console.log(user.first_name + " " + user.last_name);
}
// This function updates the current account by adding an income
function addIncome(trans) {
    current_user.current_income += trans;
}
// This function updates the current account by adding an expense
function addExpense(trans) {
    current_user.current_income -= trans;
}

// Array used to keep track of the expenses inputted by the user
var expenses = [];
// Array used to keep track of the income inputted by the user
var income = [];
// Function used for the income button
function incomeButton() {
    // creates a temp variable, that will store the user input into it
    var temp = document.getElementById('left-income');

    // This if statement will test to see if the user input isn't empty and actually holds data
    // If true it will push he data to the income array
    // If false then it will send an alert to the user input a data
    if (temp.value.trim() != ""){
        income.push(parseFloat(temp.value.trim()));
        addIncome(parseFloat(temp.value.trim()));
        temp.value = '';
        console.log("Income added;", income);
    }
    else {
        alert("Value Field is Empty, Please Input!");
    }
}

// Function used for the expenses button
function expendituresButton() {
    // creates a temp variable, that will store the user input into it
    var temp = document.getElementById('left-expenses');

    // This if statement will test to see if the user input isn't empty and actually holds data
    // If true it will push he data to the expenses array
    // If false then it will send an alert to the user input a data
    if (temp.value.trim() != ""){
        expenses.push(parseFloat(temp.value.trim()));
        addExpense(parseFloat(temp.value.trim()));
        temp.value = '';
        console.log("Expense added:", expenses);
    }
    else {
        alert("Value Field is Empty, Please Input!");
    }
}

//This function updates the user's name when the page loads.
//This is how you have to wrtie anything that you want to happen right away.
//window.onload = function() {
//   document.getElementById('username_html').innerHTML = test_user.first_name + " " + test_user.last_name;
//};