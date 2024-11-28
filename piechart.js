const fs = require('fs');

function categorizeTransactions() {
  const transactions = fs.readFileSync('transactions.txt', 'utf8').split('\n');
  
  const categories = {
    food: [],
    miscellaneous: [],
    bills: [],
    leisure: [],
    school: [],
    gas: []
  };

  // Loop through each line and separate amount and category
  transactions.forEach(transaction => {
    if (transaction.trim()) {
      const [amount, category] = transaction.split(',').map(item => item.trim());
      if (categories[category] !== undefined) {
        categories[category].push(parseFloat(amount));
      }
    }
  });

  return categories;
}

// Example usage
const categorizedData = categorizeTransactions();
console.log(categorizedData);

function calculatePercentages(categorizedData) {
    // Step 1: Calculate the total amount from all categories
    let totalAmount = 0;
    for (let category in categorizedData) {
      categorizedData[category].forEach(amount => {
        totalAmount += amount;
      });
    }
  
    // Step 2: Calculate the percentage for each category
    const percentages = {};
    for (let category in categorizedData) {
      const categoryTotal = categorizedData[category].reduce((sum, amount) => sum + amount, 0);
      const percentage = (categoryTotal / totalAmount) * 100;
      percentages[category] = percentage.toFixed(2);  // rounded to 2 decimal places
    }
  
    return percentages;
  }

const categoryPercentages = calculatePercentages(categorizedData);
console.log(categoryPercentages);

window.onload = function() {
  const ctx = document.getElementById('myPieChart').getContext('2d');

  // Categorize the transactions and calculate the percentages
  const categorizedData = categorizeTransactions();
  const categoryPercentages = calculatePercentages(categorizedData);

  // Prepare the data for the pie chart
  const data = {
    labels: Object.keys(categoryPercentages),
    datasets: [{
      data: Object.values(categoryPercentages),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
    }]
  };

  // Create the pie chart
  new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return `${tooltipItem.label}: ${tooltipItem.raw}%`;
            }
          }
        }
      }
    }
  });
};