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


currentUser = new user(
    "ben_tirado",
    "password123",
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


// Function used for the income button
function incomeButton(income, type) {
    //var date = getDate();
    // creates a temp variable, that will store the user input into it
    var temp = income;
    var type = type;

    if (income <= 0) {
      console.log("Amount must be >= 0!");
      return 1;
    }
    else if (Number.isInteger(income) == false) {
      console.log("Amount must be a string!");
      return 1;
    }
    // This if statement will test to see if the user input isn't empty and actually holds data
    // If true it will push he data to the expenses array
    // If false then it will send an alert to the user input a data
    if (temp){
        currentUser.ex.push({
            num: currentUser.ex.length + 1, date: "NULL", type: type  , amount: temp,
        });
        currentUser.current_income = parseFloat(currentUser.current_income) + parseFloat(temp);
        //document.getElementById("user-balance").innerHTML = "Balance: " + currentUser.current_income;
        //localStorage.setItem('user_' + currentUser.userID, JSON.stringify(currentUser));
        console.log("Income added correctly!");
        return 0;
    }
    else {
        console.log("Value Field is Empty, Please Input!");
    }
}

// Function used for the expenses button
function expendituresButton(expense, type) {
    //var date = getDate();
    // creates a temp variable, that will store the user input into it
    var temp = expense;
    var type = type;

     if (expense <= 0) {
      console.log("Amount must be >= 0!");
      return 1;
    }
    else if (Number.isInteger(expense) == false) {
      console.log("Amount must be a string!");
      return 1;
    }
    // This if statement will test to see if the user input isn't empty and actually holds data
    // If true it will push he data to the expenses array
    // If false then it will send an alert to the user input a data
    if (temp){
        currentUser.ex.push({
            num: currentUser.ex.length + 1, date: "NULL", type: type  , amount: temp * -1,
        });
        currentUser.current_income = parseFloat(currentUser.current_income) - parseFloat(temp);
        //document.getElementById("user-balance").innerHTML = "Balance: " + currentUser.current_income;
        //localStorage.setItem('user_' + currentUser.userID, JSON.stringify(currentUser));
        console.log("Expense added correctly!");
        //analyzeExpenseTrends();
    }
    else {
        console.log("Value Field is Empty, Please Input!");
    }
}



function testIncomeButton() {
    console.log("Test of income button.");
    console.log("");
    // General case. Normal input.
    console.log("With inputs: amount: 15, type: Work");
    if(incomeButton(15, "Work") == 0) {
        console.log("Function returned 0. Input was correctly accepted. Test successful.");
    } else {
        console.log("Function returned != 0. Test failed.");
    }
    console.log("");

    // Edge case for 'num' input.
    console.log("With inputs: num: -20, type: Work");
    if(incomeButton(-20, "Work")) {
        console.log("Function returned != 0. Input was rejected. Test successful.");
    }
    else {
        console.log("Function returned 0. Test failed.");
    }
    console.log("");

    console.log("With inputs: num: Bobo, type: Work");

    //Case for amount being string.
    if(incomeButton("Bobo", "Work")) {
      console.log("Function returned != 0. Input was rejected. Test successful.");
    }
        else {
        console.log("Function returned 0. Test failed.");
    }
        console.log("");

}

testIncomeButton();


function testExpenseButton() {
    console.log("Test of expenditures button.");
    console.log("");
    // General case. Normal input.
    console.log("With inputs: amount: 15, type: Food");
    if(expendituresButton(15, "Food") == 0) {
        console.log("Function returned 0. Input was correctly accepted. Test successful.");
    } else {
        console.log("Function returned != 0. Test failed.");
    }
    console.log("");

    // Edge case for 'amount' input (negative value).
    console.log("With inputs: amount: -20, type: Food");
    if(expendituresButton(-20, "Food") == 0) {
        console.log("Function returned 0. Input was correctly accepted. Test successful.");
    } else {
        console.log("Function returned != 0. Test failed.");
    }
    console.log("");

    // Case for amount being a string.
    console.log("With inputs: amount: Bobo, type: Food");
    if(expendituresButton("Bobo", "Food")) {
        console.log("Function returned != 0. Input was rejected. Test successful.");
    } else {
        console.log("Function returned 0. Test failed.");
    }
    console.log("");
}

testExpenseButton();
