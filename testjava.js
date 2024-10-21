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
test_user = new user();
test_user.first_name = "Richard";
test_user.last_name = "Johnson";
// Array used to keep track of the expenses inputted by the user
var expenses = [];
// Array used to keep track of the income inputted by the user
var income = [];
//Temporary variable to set the day of the week.
var day = 0;
//Temporary variable to set the week.
var week = 0;
//Function to get username
function getName(user) {
    console.log(user.first_name + " " + user.last_name)

}
// Function used for the income button
function incomeButton(num, type, user, date, week) {
        income.push({
          //Converts the string input into an interger.
          value: num,
          cat: type,
          day: date,
          week: week,
        })
        user.current_income+=num;
        len = income.length;
        console.log(income[len - 1]);
        console.log("$ Status: " + user.current_expense + "/" + user.current_income);
}

// Function used for the expenses button
function expendituresButton(num, type, user, date, week) {
   expenses.push({
          //Converts the string input into an interger.
          value: num,
          cat: type,
          day: date,
          week: week,
        })
        user.current_expense+=num;
        len = expenses.length;
        console.log(expenses[len - 1]);
        console.log("$ Status: " + user.current_expense + "/" + user.current_income);
}

// going to be used for saving the user data
function saveButton() {

}

// used for taking all the data and calculate their budget
function budgetCalc() {

}

// used for taking all the data and storing into the user profile
function dataAnaylzer() {

}

//Function to output the weekly summary and refresh data.
function weekSummary(user, date) {
    //Add in function to save user data here.
    saveButton();
    console.log("Summary;");
    console.log("Total expenses last week: " + user.current_expense);
    console.log("Total income last week: " + user.current_income);
    console.log("Surplus: " + (user.current_income-user.current_expense));
    console.log('');
    user.current_expense = 0;
    user.current_income = 0;
    day = 1;
    weeklyCharges(user, day);
}

//Fuction to be called on day 1 to add weekly expenses
function weeklyCharges(user, date, week) {
    if(date == 1) {
        incomeButton(user.weekly_income, "Weekly Income", user, date, week);
        expendituresButton(user.weekly_expense, "Rent", user, date, week);
        return 1;
    }
    else if (date == 8) {
        weekSummary(user, date);
    }
    else {
        return 0;
    }
}



//Create new user.
test_user = new user();
test_user.first_name = "Richard";
test_user.last_name = "Johnson";
test_user.weekly_income = 300;
test_user.weekly_expense = 150;

//Set user status.
current_user = test_user;

//Output the current income and expense
console.log("User Status Day 0:");
console.log("Current Income: " + current_user.current_income);
console.log("Current Expense: " + current_user.current_expense);
console.log("");



//Simulated week.
var day = 1;
var week = 1;

//Day 1
console.log("Day 1:");
//Calls the weekly charges into the account.
weeklyCharges(current_user, day, week);

//Quick Snack
expendituresButton(5.75, "Starbucks", current_user, day, week);
//Money from friend
incomeButton(5, "Friend", current_user, day, week);

console.log("");
//Day 2
console.log("Day 2:");
day+= 1;
weeklyCharges(current_user, day, week);
//Groceries
expendituresButton(100, "Walmart", current_user, day, week);
console.log('');

//Day 3
console.log("Day 3");
day +=1;
weeklyCharges(current_user, day, week);
//nothing happpens
console.log('');

//Day 4
console.log("Day 4");
day +=1;
weeklyCharges(current_user, day, week);
//nothing happpens
console.log('');

//Day 5
console.log("Day 5");
day +=1;
weeklyCharges(current_user, day, week);
//Buy gas
expendituresButton(45.00, "Gas", current_user, day, week);
console.log('');

//Day 6
console.log("Day 6");
day +=1;
weeklyCharges(current_user, day, week);
//Pick up shift at work.
incomeButton(50.00, "Extra Shift", current_user, day, week);
console.log('');

//Day 7
console.log("Day 7");
day +=1;
weeklyCharges(current_user, day, week);
//nothing happens
console.log('');

//Day 1
console.log("Day 1");
day = 1;
week = 2;
weeklyCharges(current_user, day, week);
console.log('');


//Todo
//Roll over data into next week. Use the "week" parameter from each object to tell what week it is from.
//create check date function?