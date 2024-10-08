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

// This function will take the inputted username and password given by the user and then see if it is within the database
// If found in the database it will copy all the data to the user
// If not found it will say user not found
function login(username, password){
    // First it reads in the file "users.txt" that contains the data base
    // If fails it will return 
    fs.readFile('users.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        // creates a const to be used for data splitting
        const lines = data.split('\n');

        // This will take all the information on a given line and split the data up by the char ','
        // If the current line it is contains the correct username and password it will read in this data
        // If that line doesn't contain it, then it will move to the next one
        // If user can't be found it will tell the system who then tell the user
        for (const line of lines) {

            const [storedUsername, storedPassword, storedFirstName, storedLastName, storedWeeklyIncome, storedWeeklyExpense, storedCurrentIncome, storedCurrentExpense] = line.split(',');

            if (storedUsername === username && storedPassword === password) {
                currentUser.first_name = storedFirstName;
                currentUser.last_name = storedLastName;
                currentUser.weekly_income = storedWeeklyIncome;
                currentUser.weekly_expense = storedWeeklyExpense;
                currentUser.current_income = storedCurrentIncome;
                currentUser.current_expense = storedCurrentExpense;
                return;
            }
        }

        console.log('User not Found');
    });
}

function saveUser() {

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
window.onload = function() {
   document.getElementById('username_html').innerHTML = test_user.first_name + " " + test_user.last_name;
};
