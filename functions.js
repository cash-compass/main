//Creating the array of users. MUY IMPORTANTE
var users = [];

function changeColor() {
    document.getElementById("my-div").style.backgroundColor = "#FDF305";

}
var globalID = -1;
//This is the user object constructor.
function user(username, password, first_name, last_name, weekly_income, weekly_expense, current_income, current_expense, ex) {
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
        //document.getElementById("test").innerHTML = localStorage.getItem('userAmount')
;

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
//ALERT IN PROGRESS
function expendituresButton() {
    var date = getDate();
    // creates a temp variable, that will store the user input into it
    var temp = document.getElementById('left-expenses').value;

    // This if statement will test to see if the user input isn't empty and actually holds data
    // If true it will push he data to the expenses array
    // If false then it will send an alert to the user input a data
    if (temp){
        currentUser.ex.push({
            num: 1, date: date, type: "test", amount: temp,
        });
        localStorage.setItem('user_' + currentUser.userID, JSON.stringify(currentUser));
    }
    else {
        alert("Value Field is Empty, Please Input!");
    }
}


function login() {
    //Takes the input username and password from the login page.
    var un = document.getElementById('username').value;
    var pw = document.getElementById('password').value;
    var userAmount = localStorage.getItem('userAmount'); 

    for(i=0; i<=userAmount - 1; i++) {
        const storedUser = JSON.parse(localStorage.getItem('user_' + i)); 

        var storedUN = storedUser.username;
        var storedPW = storedUser.password;
        var storedID = storedUser.userID
        if (un == storedUN && pw == storedPW) {
            alert("Login successful!");  
            localStorage.setItem('c_user', storedID);   
            break;
        }
        else if (i != users.length - 1){
            continue;
        }
        else {
        alert("Login failed! :(");

        }

    }
    loadInfo();
}

//Gets the currently loggin in user's username.
function getUserID() {
    // Retrieve the username from localStorage
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

}
//Creating the "View Transaction History" section.
// Sample transactions data

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
                    <td>${transaction.amount}</td>
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


//Only runs if it is the first time the website is being run.


//Pre-created users
user0 = new user(
    "colin_jones",    // username
    "123",            // password
    "Colin",          // first_name
    "Jones",          // last_name
    450,              // weekly_income
    150,              // weekly_expense
    100,                // current_income
    0,                // current_expense
    [                 // expenses array
                { num: 1, date: "2024-11-01", type: "Groceries", amount: "$50" },
                { num: 2, date: "2024-11-02", type: "Gas", amount: "$30" },
                { num: 3, date: "2024-11-03", type: "Rent", amount: "$800" },
                { num: 4, date: "2024-11-04", type: "Utilities", amount: "$100" },
                { num: 5, date: "2024-11-05", type: "Entertainment", amount: "$25" }    ]
);
users.push(user0);

user1 = new user(
    "ben_tirado",
    "123",
    "Benjamin",
    "Tirado",
    600,
    250,
    200,
    75,
    [
        { num: 1, date: "2024-11-01", type: "Groceries", amount: "$60" },
        { num: 2, date: "2024-11-02", type: "Gas", amount: "$40" },
        { num: 3, date: "2024-11-03", type: "Rent", amount: "$900" },
        { num: 4, date: "2024-11-04", type: "Subscriptions", amount: "$15" },
        { num: 5, date: "2024-11-05", type: "Shopping", amount: "$120" }
    ]
    );
users.push(user1);


user2 = new user(
    "thomasK",
    "123",
    "Thomas",
    "Kaseca",
    700,
    300,
    300,
    100,
    [
        { num: 1, date: "2024-11-01", type: "Groceries", amount: "$70" },
        { num: 2, date: "2024-11-02", type: "Gas", amount: "$50" },
        { num: 3, date: "2024-11-03", type: "Rent", amount: "$950" },
        { num: 4, date: "2024-11-04", type: "Utilities", amount: "$120" },
        { num: 5, date: "2024-11-05", type: "Dining Out", amount: "$80" }
    ]

    );
users.push(user2);

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

