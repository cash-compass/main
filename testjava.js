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
    this.surplus = 0;
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
function incomeButton(num, type, user) {
        var tempDate = checkDate();
        const date = tempDate.split('/');
        if (num < 0) {
          console.log("'num' parameter is not valid!");
          return 1;
        }
        else if((date[0] < 0) || (date[0] > 7)) {
          console.log("'date' parameter is not valid!");
          return 2;
        }
        else if (date[1] < 0) {
          console.log("'week' parameter is not valid!");
          return 3;
        }
        else {
        income.push({
          //Converts the string input into an interger.
          income: num,
          cat: type,
          day: date[0],
          week: date[1],
        })
        user.current_income+=num;
        len = income.length;
        console.log(income[len - 1]);
        //The status of the current balance is offest by the surplus.
        console.log("$ Status: " + user.current_expense + "/" + (user.current_income-user.surplus));
        }
        return 0;
}

// Function used for the expenses button
function expendituresButton(num, type, user) {
        var tempDate = checkDate();
        const date = tempDate.split('/');
        expenses.push({
          //Converts the string input into an interger.
          expense: num,
          cat: type,
          day: date[0],
          week: date[1],
        })
        user.current_expense+=num;
        len = expenses.length;
        console.log(expenses[len - 1]);
        console.log("$ Status: " + user.current_expense + "/" + (user.current_income-user.surplus));
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

//Reoccuring purchase tracker
//I would explain how this works more but I made this really late and dont really remember what I did lol.
function frequentExpense () {
  var weekExpense = [];
  for (i = 0; i < expenses.length; i++) {
    var input = expenses[i].cat;
    var match = 0
    for(j=0; j<expenses.length; j++){
      //console.log(expenses[i].cat + " = " + expenses[j].cat);
      if(expenses[i].cat == expenses[j].cat){
        match += 1;
        
      }
    }
    if (match > 1) {
      weekExpense.push({
        cat: expenses[i].cat,
        amount: 1,
        
      });
      //console.log(expenses[i].cat + " was pushed to the array.");
    }
  }
  console.log("Reoccuring Expenses:");
  
  for (g=0; g<weekExpense.length; g++) {
    var tester = weekExpense[g].cat
    for (m=g+1; m<weekExpense.length; m++) {
      //console.log(tester + " == " + weekExpense[m]);
      if(tester == weekExpense[m].cat) {
        //console.log("SLICE!" + weekExpense[m]);
        weekExpense[g].amount += 1;
        weekExpense.splice(m, 1, "undefined");
      }
    }
    
    
  }
  for (k=0; k<weekExpense.length; k++) {
     if(weekExpense[k] != "undefined") {
     console.log(weekExpense[k]);
     }

  }
  console.log("");

}

//Function to output the weekly summary and refresh data.
function weekSummary(user) {
    var tempDate = checkDate();
    const date = tempDate.split('/');
    //Add in function to save user data here.
    saveButton();
    console.log("Summary;");
    console.log("Total expenses last week: " + user.current_expense);
    console.log("Total income last week: " + user.current_income);
    console.log("Surplus: " + (user.current_income-user.current_expense) + "/" + user.surplus);
    console.log('');
    frequentExpense(user, date[1]);
    user.current_expense = 0;
    user.current_income = 0;
    day = 1;
    weeklyCharges(user);
}

//Fuction to be called on day 1 to add weekly expenses
function weeklyCharges(user) {
    var tempDate = checkDate();
    const date = tempDate.split('/');
    if(date[0] == 1) {
        incomeButton(user.weekly_income, "Weekly Income", user, date, week);
        expendituresButton(user.weekly_expense, "Rent", user, date, week);
        return 1;
    }
    else if (date[0] == 8) {
        weekSummary(user, date, week);
    }
    else {
        return 0;
    }
}

//Function to check the date. In future will be implemented correctly. Is more of a placeholder for the time being.
function checkDate() {
  //Currently creates a string in the format "day/week" b/c in the future when we read in the 
  //actual date we will get a string like "01/12/2024".
  //The string will get separated in the functions that call checkDate()
  var readDate = day + "/" + week;
  return readDate;
}
//Function to output the transaction history.
/*NOTE: We will probably need to make a sorting algorithm at some point, so that the 
data gets output in a sequential manner. Otherwise the information could be in the wrong order.
but thats a future problem. */
function transactionHistory() {
  console.log("                Transaction history:");
  console.log("                    ||EXPENSES||");
  for(i=0; i< expenses.length; i++) {
    console.log(expenses[i]);
  }
    console.log("                    ||INCOME||");
  for(i=0; i< income.length; i++) {
    console.log(income[i]);
  }
  return 0;
}
//Function to set the desired weekly surplus of the user. Would work with a button in the HTML file eventually.
function setSurplus(user, type, amount) {
  if (type == "fixed") {
    user.surplus = amount;
  }
  /* Currently setting the surplus as a percentage of the weekly income does not adjust
  when more income is added. To fix this would requre some more variables and would futher complicate
  the objects so I decided not fix the issue for now. */
  else if (type == "percent") {
    user.surplus = (amount/100) * user.weekly_income;
  }
  console.log("Desired weekly surplus is : " + user.surplus);
  return 0;
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
setSurplus(current_user, "percent", 10);
//Calls the weekly charges into the account.
weeklyCharges(current_user);
//Quick Snack
expendituresButton(5.75, "Starbucks", current_user);
//Money from friend
incomeButton(5, "Friend", current_user);

console.log("");
//Day 2
console.log("Day 2:");
day+= 1;
weeklyCharges(current_user);
//Groceries
expendituresButton(100, "Walmart", current_user);
console.log('');

//Day 3
console.log("Day 3");
day +=1;
weeklyCharges(current_user);
//nothing happpens
console.log('');

//Day 4
console.log("Day 4");
day +=1;
weeklyCharges(current_user);


//nothing happpens
console.log('');

//Day 5
console.log("Day 5");
day +=1;
weeklyCharges(current_user);
//Buy gas
expendituresButton(45.00, "Gas", current_user);
console.log('');

//Day 6
console.log("Day 6");
day +=1;
weeklyCharges(current_user);
//Pick up shift at work.
incomeButton(50.00, "Extra Shift", current_user);

console.log('');

//Day 7
console.log("Day 7");
day +=1;
weeklyCharges(current_user);
expendituresButton(5.75, "Starbucks", current_user);


//nothing happens
console.log('');

//Day 1
console.log("Day 1");
day += 1;
week = 2;
weeklyCharges(current_user);
console.log('');

//Checking purcahse history
transactionHistory();

//Todo
//Roll over data into next week. Use the "week" parameter from each object to tell what week it is from.
//create check date function?
//Add comments to reoccuring expenses



//TEST CASES:

//Income button:
//Test that each input is of the correct type.

//To ben: first create the checks within the functions, then confirm that the checks work by using the test cases.
//Add edge cases for date and week.
/*console.log("Testing:");
console.log("");
test = new user();
test.first_name = "Test";
test.last_name = "User";

function testIncomeButton() {
    //General case. Normal input.
    income = [];
    console.log("With inputs: num: 15, category: Food, day: 1, and week: 5;");
    if(incomeButton(15, "Food", test, 1, 5) == 0) {
      console.log("Function returned 0. Test successful.");
      console.log("");
    }
    else {
      console.log("Function returned != 0. Test failed.");
      console.log("");
    }
    //Edge case for 'num' input.
    income = [];
    console.log("With inputs: num: -20, category: Food, day: 1, and week: 5;");
    if(incomeButton(-20, "Food", test, 1, 5) != 0) {
      console.log("Function returned != 0. Test successful.");
      console.log("");
    }
    else {
      console.log("Function returned 0. Test failed.");
      console.log("");
    }
    //Edge case 1 for 'day' input.
    income = [];
    console.log("With inputs: num: 15, category: Food, day: -3, and week: 5;");
    if(incomeButton(15, "Food", test, -3, 5) != 0) {
      console.log("Function returned != 0. Test successful.");
      console.log("");
    }
    else {
      console.log("Function returned 0. Test failed.");
      console.log("");
    }
    
    //Edge case 2 for 'day' input.
    income = [];
    console.log("With inputs: num: 15, category: Food, day: 500, and week: 5;");
    if(incomeButton(15, "Food", test, 500, 5) != 0) {
      console.log("Function returned != 0. Test successful.");
      console.log("");
    }
    else {
      console.log("Function returned 0. Test failed.");
      console.log("");
    }
    //Edge case for 'week' input.
    income = [];
    console.log("With inputs: num: 15, category: Food, day: 1, and week: -50;");
    if(incomeButton(15, "Food", test, 1, -50) != 0) {
      console.log("Function returned != 0. Test successful.");
      console.log("");
    }
    else {
      console.log("Function returned 0. Test failed.");
      console.log("");
    }


}

testIncomeButton();
//Expenditures button:
//Test that each input is of the correct type.
function testExpendituresButton(num, type, user, date, week) {
    
}


*/







