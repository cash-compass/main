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

//Function to get username
function getName(user) {
    console.log(user.first_name + " " + user.last_name)

}
// going to be used for creating the user input for income
function incomeButton() {

}

// going to be used for creating the user input for expenses 
function expendituresButton() {

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
