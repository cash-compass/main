//Creating the array of users. MUY IMPORTANTE

function changeColor() {
    document.getElementById("my-div").style.backgroundColor = "#FDF305";

}
var globalID = -1;
//This is the user object constructor.
function user(username, password, first_name, last_name, weekly_income, weekly_expense, current_income, current_expense, ex, userID) {
    this.username = username;
    this.password = password;

    this.userID = globalID;
    globalID++;
    this.first_name = first_name;
    this.last_name = last_name;
    //These two are the projected values for each week.
    this.weekly_income = weekly_income;
    this.weekly_expense = weekly_expense;
    //These two are the real world values for each week.
    this.current_income = current_income;
    this.current_expense = current_expense;

    // New expenses array parameter
    this.ex = ex || [];  // Defaults to an empty array if no expenses are provided

}

currentUser = new user();
// Simple cipher: Shift each character in the password by a certain value
const shiftValue = 3; // Example shift value

// Encrypt function: Shift each character in the password
function encryptPassword(password) {
    let encryptedPassword = '';
    for (let i = 0; i < password.length; i++) {
        const charCode = password.charCodeAt(i); // Get the character code of each character
        encryptedPassword += String.fromCharCode(charCode + shiftValue); // Shift the character code
    }
    return encryptedPassword;
}

// Decrypt function: Reverse the shift to get the original password
function decryptPassword(encryptedPassword) {
    let decryptedPassword = '';
    for (let i = 0; i < encryptedPassword.length; i++) {
        const charCode = encryptedPassword.charCodeAt(i); // Get the character code of each character
        decryptedPassword += String.fromCharCode(charCode - shiftValue); // Reverse the shift
    }
    return decryptedPassword;
}

// This function will create new users into the database
// It take all the data inputted when creating a new user and add into the databse using the proper format
// So that way we log in the user we make sure the data is called back in properly and not out of order
function createUser() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;

    var passwordEnc = encryptPassword(password);
    // Get userAmount or set it to 0 if it doesn't exist
    var userAmount = localStorage.getItem('userAmount'); 
    if (userAmount === null) {
        userAmount = 0;  // Set it to 0 if it doesn't exist
    } else {
        userAmount = parseInt(userAmount); // Ensure it's a number
    }
    // Password complexity requirements
const passwordMinLength = 8;  // Minimum length of 8 characters
const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&_]{8,}$/; // At least 1 number, 1 special character, and minimum length of 8 characters

// Check if password meets the complexity requirements
if (!passwordRegex.test(password)) {
    alert("Password must be at least 8 characters long, contain at least one number, and one special character.");
    return; // Stop execution
}

    // Check if the username already exists
    for (let i = 0; i < userAmount; i++) {
        const storedUser = JSON.parse(localStorage.getItem('user_' + i)); 
        var storedUN = storedUser.username;
        if (username === storedUN) {
            alert("User already exists!");  
            return; // Stop execution
        }
    }

    // Create a new user object
    let newUser = {
        username: username,
        password: passwordEnc,
        first_name: firstName,
        last_name: lastName,
        current_income: 0,
        current_expense: 0,
        userID: userAmount,
        ex: []
    };
    // Store the new user in localStorage
    localStorage.setItem('user_' + userAmount, JSON.stringify(newUser));
    userAmount++;
    // Increment the userAmount and update it in localStorage
    localStorage.setItem('userAmount', userAmount); // Increment the userAmount

    alert("User " + newUser.username + " created!");
}


// This function will first call the saveUser function to make sure that all the user data is saved into the system
// Once saved into the system it will result all the currentUser values to zero until another user logins
function logout() {
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

//Function for creating the totals for the pie chart.
function createTotals() {
    let expenseTotals = [0, 0, 0, 0, 0, 0]; // [Food, Bills, Gas, School, Leisure, Other]

    // Loop through each expense object in currentUser.ex
    for (let i = 0; i < currentUser.ex.length; i++) {
        const expense = currentUser.ex[i];

        // Check if the expense amount is negative (indicating an expense)
        if (expense.amount < 0) {
            // Increment the appropriate category based on the expense type
            switch (expense.type) {
                case 'Food':
                    expenseTotals[0] += Math.abs(expense.amount); // Food is at index 0
                    break;
                case 'Bills':
                    expenseTotals[1] += Math.abs(expense.amount); // Bills is at index 1
                    break;
                case 'Gas':
                    expenseTotals[2] += Math.abs(expense.amount); // Gas is at index 2
                    break;
                case 'School':
                    expenseTotals[3] += Math.abs(expense.amount); // School is at index 3
                    break;
                case 'Leisure':
                    expenseTotals[4] += Math.abs(expense.amount); // Leisure is at index 4
                    break;
                case 'Other':
                    expenseTotals[5] += Math.abs(expense.amount); // Other is at index 5
                    break;
                default:
                    break;
            }
        }
    }
    return expenseTotals;
}
// Function used for the income button
function incomeButton() {
    var date = getDate();
    // creates a temp variable, that will store the user input into it
    var temp = document.getElementById('left-income').value;
    var type = document.getElementById('type-income').value;
    // This if statement will test to see if the user input isn't empty and actually holds data
    // If true it will push he data to the expenses array
    // If false then it will send an alert to the user input a data
    if (temp){
        currentUser.ex.push({
            num: currentUser.ex.length + 1, date: date, type: type  , amount: temp,
        });
        currentUser.current_income = parseFloat(currentUser.current_income) + parseFloat(temp);
        document.getElementById("user-balance").innerHTML = "Balance: " + currentUser.current_income;
        localStorage.setItem('user_' + currentUser.userID, JSON.stringify(currentUser));
        alert("Income added correctly!");
    }
    else {
        alert("Value Field is Empty, Please Input!");
    }
    loadInfo();
}

// Function used for the expenses button
function expendituresButton() {
    var date = getDate();
    // creates a temp variable, that will store the user input into it
    var temp = document.getElementById('left-expenses').value;
    var type = document.getElementById('type-expenses').value;
    // This if statement will test to see if the user input isn't empty and actually holds data
    // If true it will push he data to the expenses array
    // If false then it will send an alert to the user input a data
    if (temp){
        currentUser.ex.push({
            num: currentUser.ex.length + 1, date: date, type: type  , amount: temp * -1,
        });
        currentUser.current_income = parseFloat(currentUser.current_income) - parseFloat(temp);
        document.getElementById("user-balance").innerHTML = "Balance: " + currentUser.current_income;
        localStorage.setItem('user_' + currentUser.userID, JSON.stringify(currentUser));
        alert("Expense added correctly!");
        analyzeExpenseTrends();
    }
    else {
        alert("Value Field is Empty, Please Input!");
    }
    loadInfo();
}
// Function to check for trends 
const exType = [0, 0, 0, 0, 0, 0,];
function analyzeExpenseTrends() {
    let FoodCount = 0;
    let BillsCount = 0;
    let GasCount = 0;
    let SchoolCount = 0;
    let LeisureCount = 0;
    let OtherCount = 0;
    for(let i = 0; i < currentUser.ex.length; i++){
        if(currentUser.ex[i].type == "Food"){
            FoodCount++;            
        }
        else if(currentUser.ex[i].type == "Bills"){
            BillsCount++;            
        }
        else if(currentUser.ex[i].type == "Gas"){
            GasCount++;            
        }
        else if(currentUser.ex[i].type == "School"){
            SchoolCount++;            
        }
        else if(currentUser.ex[i].type == "Leisure"){
            LeisureCount++;            
        }
        else if(currentUser.ex[i].type == "Other"){
            OtherCount++;            
        }
    }
    if(FoodCount > 1){
        exType[0] = FoodCount;
    }
    if(BillsCount > 1){
        exType[1] = BillsCount;
    }
    if(GasCount > 1){
        exType[2] = GasCount;
    }
    if(SchoolCount > 1){
        exType[3] = SchoolCount;
    }
    if(LeisureCount > 1){
        exType[4] = LeisureCount;
    }
    if(OtherCount > 1){
        exType[5] = OtherCount;
    }
    document.getElementById("food-count").innerHTML = exType[0];
    document.getElementById("bills-count").innerHTML = exType[1];
    document.getElementById("gas-count").innerHTML = exType[2];
    document.getElementById("school-count").innerHTML = exType[3];
    document.getElementById("leisure-count").innerHTML = exType[4];
    document.getElementById("other-count").innerHTML = exType[5];s
}

function login() {
    // Takes the input username and password from the login page.
    var un = document.getElementById('username').value;
    var pw = document.getElementById('password').value;
    var userAmount = localStorage.getItem('userAmount'); 

    if (userAmount === null || userAmount === 0) {
        alert("No users found.");
        return;
    }

    for (let i = 0; i < userAmount; i++) {
        const storedUser = JSON.parse(localStorage.getItem('user_' + i)); 

        var storedUN = storedUser.username;
        var storedPW = storedUser.password;
        storedPW = decryptPassword(storedPW);
        var storedID = storedUser.userID;

        // Check if the input username and password match any stored user
        if (un === storedUN && pw === storedPW) {
            alert("Login successful!");  
            localStorage.setItem('c_user', storedID);  
            closePopup();  // Close the popup when login is successful
            loadInfo();    // Load user info after successful login
            return;        // Exit the function after successful login
        }
    }

    // If no matching user is found
    alert("Login failed! :(");
    closePopup();  // Optionally close the popup if login fails
    loadInfo();    // Continue with the current session (can be adjusted as per need)
}


//Gets the currently loggin in user's ID.
function getUserID() {
    // Retrieve the userID from localStorage
    return localStorage.getItem('c_user');
}

//Function runs on page load to update the text box that says "Current user: " to the currently logged in user.
window.onload = function() {

    loadInfo();

};

//Function gets the current date and returns it in the correct format
function getDate() {
    // Create a new Date object
    const date = new Date();

    // Extract the year, month, and day
    const year = date.getFullYear(); // Gets the full year (e.g., 2024)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, add 1, then pad with a leading zero
    const day = String(date.getDate()).padStart(2, '0'); // Pads single-digit days with a leading zero

    // Format the date as "YYYY-MM-DD"
    const formattedDate = `${year}-${month}-${day}`;

    return(formattedDate);
}
//Function to load in user info when the person logs in. Also updates the current_user object.
function loadInfo() {
    var loginUser = parseInt(getUserID());  
    const storedUser = JSON.parse(localStorage.getItem('user_' + loginUser)); // Replace '1' with the desired userID
    currentUser = storedUser;
    document.getElementById("username_html").innerHTML = "Current user: " + currentUser.username;
    document.getElementById("user-name").innerHTML = "Name: " + currentUser.first_name + " " + currentUser.last_name;
    document.getElementById("user-balance").innerHTML = "Balance: " + currentUser.current_income;
  
    const totals = createTotals();
    updateChartData(totals); // Call the function to update the chart
    analyzeExpenseTrends();

}

/// Creating the "View Transaction History" section

// Get the popup elements
const popup = document.getElementById('popupForm');
const openButton = document.getElementById('openPopup');
const closeButton = document.getElementById('closePopup');
const transactionTableBody = document.getElementById('transactionTable').querySelector('tbody');

// Function to populate the transaction table
function populateTransactionTable() {
    transactionTableBody.innerHTML = ''; // Clear existing rows
    currentUser.ex.forEach((transaction) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.num}</td>
            <td>${transaction.date}</td>
            <td>${transaction.type}</td>
            <td>${"$ " + transaction.amount}</td>
        `;
        transactionTableBody.appendChild(row);
    });
}

// Open the popup and populate the table
openButton.addEventListener('click', () => {
    populateTransactionTable();
    popup.style.display = 'block';
});

// Close the popup when clicking the close button
closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Close the popup when clicking outside the popup content
window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});

//This is for the other popups.
function openPopup() {
    document.getElementById('login-popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('login-popup').style.display = 'none';
}

// Get elements
const createUserPopup = document.getElementById('createUserPopup');
const openCreateUserPopupButton = document.getElementById('openCreateUserPopup');
const closeCreateUserPopupButton = document.querySelector('.create-user-close-btn');

// Open the popup
openCreateUserPopupButton.addEventListener('click', () => {
    createUserPopup.style.display = 'block';
});

// Close the popup
closeCreateUserPopupButton.addEventListener('click', () => {
    createUserPopup.style.display = 'none';
});

// Close popup when clicking outside the content
window.addEventListener('click', (event) => {
    if (event.target === createUserPopup) {
        createUserPopup.style.display = 'none';
    }
});

const chartData = [30, 20, 15, 15, 10, 10];
const chartLabels = ['Food', 'Bills', 'Gas', 'School', 'Leisure', 'Other'];
const chartColors = ['#1E90FF', '#87CEFA', '#4682B4', '#5F9EA0', '#00CED1', '#6495ED'];

// Wait for the DOM to load before accessing the canvas
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('myPieChart').getContext('2d');

    // Initialize the pie chart
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: chartLabels,
            datasets: [{
                data: chartData,
                backgroundColor: chartColors
            }]
        }
    });

    // Function to update the chart data
    function updateChartData(newData) {
        myPieChart.data.datasets[0].data = newData;
        myPieChart.update(); // Update the chart to reflect the changes
    }

    // Attach the function to the window object for global access
    window.updateChartData = updateChartData;

});


 
//Only runs if it is the first time the website is being run.
//Pre-created users
var pwUser0 = encryptPassword("123");
user0 = new user(
    "colin_jones",    // username
    pwUser0,            // password
    "Colin",          // first_name
    "Jones",          // last_name
    450,              // weekly_income
    150,              // weekly_expense
    100,                // current_income
    0,                // current_expense
    [                 // expenses array
                { num: 1, date: "2024-11-01", type: "Food", amount: -50 },
                { num: 2, date: "2024-11-02", type: "Gas", amount: -30 },
                { num: 3, date: "2024-11-03", type: "Bills", amount: -800 },
                { num: 4, date: "2024-11-04", type: "Bills", amount: -100 },
                { num: 5, date: "2024-11-05", type: "Leisure", amount: -25 }    ]
);

user1 = new user(
    "ben_tirado",
    pwUser0,
    "Benjamin",
    "Tirado",
    600,
    250,
    200,
    75,
    [
        { num: 1, date: "2024-11-01", type: "Food", amount: -60 },
        { num: 2, date: "2024-11-02", type: "Gas", amount: -40 },
        { num: 3, date: "2024-11-03", type: "Bills", amount: -900 },
        { num: 4, date: "2024-11-04", type: "Leisure", amount: -15 },
        { num: 5, date: "2024-11-05", type: "Leisure", amount: -120 }
    ]
    );

user2 = new user(
    "thomasK",
    pwUser0,
    "Thomas",
    "Kaseca",
    700,
    300,
    300,
    100,
    [
        { num: 1, date: "2024-11-01", type: "Food", amount: -70 },
        { num: 2, date: "2024-11-02", type: "Gas", amount: -50 },
        { num: 3, date: "2024-11-03", type: "Bills", amount: -950 },
        { num: 4, date: "2024-11-04", type: "Bills", amount: -120 },
        { num: 5, date: "2024-11-05", type: "Food", amount: -80 }
    ]

    );

//This section is created to ensure that the user information does not reset.
//It does this by setting the local storage variable 'cached' to 1 once information has been loaded for the first time.
//Otherwise everythig would be set to the default parameters above on every refresh.
var cached = localStorage.getItem('cached');
if(cached != 1) {
localStorage.setItem('user_' + user0.userID, JSON.stringify(user0));
localStorage.setItem('user_' + user1.userID, JSON.stringify(user1));
localStorage.setItem('user_' + user2.userID, JSON.stringify(user2));
localStorage.setItem('userAmount', 3);

}
localStorage.setItem('cached', 1);

