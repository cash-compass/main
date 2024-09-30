const fs = require('fs');
const bcrypt = require('bcrypt');

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
//Here is how to create a new object and edit the variables.
//In the future we will need to have a database of already made user information.
//For now we will have to hard code it, so lets user this test_user to figure out the different functions and algorithms. :)
current_user = new user();
current_user.first_name = "Richard";
current_user.last_name = "Johnson";
let test = "colin2004";
let test1 = "password123";
let filename = "users.json";
login(filename, test, test1);

function login(filename, username, password) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if(err) {
            console.error("Error Reading File", err);
            return;
        }

        const users = JSON.parse(data);

        const userData = users.find(user => user.username == username && user.password == password);

        if (userData) {
            // Compare entered password with the stored hashed password
            bcrypt.compare(password, userData.passwordHash, (err, isMatch) => {
                if (err) {
                    console.error("Error comparing passwords:", err);
                    return;
                }

                if (isMatch) {
                    // If password is correct, create a new User instance
                    const user = new User(
                        userData.first_name,
                        userData.last_name,
                        userData.weekly_income,
                        userData.weekly_expense,
                        userData.current_income,
                        userData.current_expense
                    );
                    console.log("Login successful!", user);
                } else {
                    console.log("Invalid password.");
                }
            });
        } else {
            console.log("Invalid username.");
        }
    });
}

//Function to get username
function getName(user) {
    console.log(user.first_name + " " + user.last_name)

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
