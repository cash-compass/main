// This file test the transactions.txt file and tracks
// spending habits and where most of the income is going to

const fs = require('fs');

// Function to read the transaction file
const readTransactions = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

// Function to analyze spending habits
const analyzeSpending = (transactions) => {
    const spendingCategories = {
        Expenses: 0,
        Leisure: 0,
        Other: 0,
    };

    const lines = transactions.split('\n').slice(2); // Skip header

    lines.forEach(line => {
        const parts = line.split('|').map(part => part.trim());
        if (parts.length === 4) {
            const category = parts[1];
            const amount = parseFloat(parts[3].replace(/[^0-9.-]+/g,"")); // Remove non-numeric characters
            if (amount < 0) {
                spendingCategories[category] += Math.abs(amount); // Accumulate spending
            }
        }
    });

    return spendingCategories;
};

// Function to analyze income distribution
const analyzeIncome = (transactions) => {
    const income = {
        Savings: 0,
    };

    const lines = transactions.split('\n').slice(2); // Skip header

    lines.forEach(line => {
        const parts = line.split('|').map(part => part.trim());
        if (parts.length === 4) {
            const category = parts[1];
            const amount = parseFloat(parts[3].replace(/[^0-9.-]+/g,"")); // Remove non-numeric characters
            if (amount > 0) {
                income[category] += amount; // Accumulate income
            }
        }
    });

    return income;
};

// Main function
const main = async () => {
    try {
        const transactions = await readTransactions('transactions.txt');

        const spendingHabits = analyzeSpending(transactions);
        console.log('Spending Habits:', spendingHabits);

        const incomeDistribution = analyzeIncome(transactions);
        console.log('Income Distribution:', incomeDistribution);

    } catch (error) {
        console.error('Error reading transactions:', error);
    }
};

main();
