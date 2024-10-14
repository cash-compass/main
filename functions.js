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
test_user = new user();
test_user.first_name = "Richard";
test_user.last_name = "Johnson";
// Array used to keep track of the expenses inputted by the user
var expenses = [];
// Array used to keep track of the income inputted by the user
var income = [];

//Function to get username
function getName(user) {
    console.log(user.first_name + " " + user.last_name)

}
// Function used for the income button
function incomeButton() {
    // creates a temp variable, that will store the user input into it
    var temp = document.getElementById('income');
    //Grabs the information from the dropdown menu.
    var dropdown = document.getElementById("category");
    var dropValue = dropdown.value;
    // This if statement will test to see if the user input isn't empty and actually holds data
    // If true it will push he data to the income array
    // If false then it will send an alert to the user input a data
    if (temp.value.trim() != ""){
        //Creating the new objects for each income inflow. This gets pushed to the income array, which is an array    made entirely of income objects.
        income.push({
          //Converts the string input into an interger.
          value: parseInt(temp.value.trim()),
          cat: dropValue,
        })
    }
    else {
        alert("Value Field is Empty, Please Input!");
    }
   //Sends the values of the income array into the test output on the HTML file.
  /* const test =  document.getElementById('testOutput').innerHTML; 
    for (let i = 0; i < income.length; i++) {
      document.getElementById('testOutput').innerHTML = test + " " + income[i].value + income[i].cat + ", ";
    }*/
}

// Function used for the expenses button
function expendituresButton() {
    // creates a temp variable, that will store the user input into it
    var temp = document.getElementById('expense');
    //Grabs the information from the dropdown menu.
    var dropdown = document.getElementById("category");
    var dropValue = dropdown.value;
    // This if statement will test to see if the user input isn't empty and actually holds data
    // If true it will push he data to the expenses array
    // If false then it will send an alert to the user input a data
    if (temp.value.trim() != ""){
          expenses.push({
          //Converts the string input into an interger.
          value: parseInt(temp.value.trim()),
          cat: dropValue,
        })
    }
    else {
        alert("Value Field is Empty, Please Input!");
    }
    const test =  document.getElementById('testOutput').innerHTML; 
    for (let i = 0; i < expenses.length; i++) {
      document.getElementById('testOutput').innerHTML = test + " " + expenses[i].value + expenses[i].cat + ", ";
    }
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


//This function updates the user's name when the page loads.
//This is how you have to wrtie anything that you want to happen right away.
window.onload = function() {

   document.getElementById('username_html').innerHTML = test_user.first_name + " " + test_user.last_name;
};
