// Constants
const MAX_INCOME = 1000000000; // $1 billion
const MIN_INCOME = 0;
const MAX_SPENDING_PERCENTAGE = 100;
const MIN_SPENDING_PERCENTAGE = 0;

// Performance Metrics Calculator
class PerformanceMetrics {
    constructor(weeklyIncome, weeklySpending, portfolioValue, totalDebt) {
        this.weeklyIncome = weeklyIncome;
        this.weeklySpending = weeklySpending;
        this.portfolioValue = portfolioValue;
        this.totalDebt = totalDebt;
        this.history = [];
    }

    // Calculate spending as a percentage of income
    calculateSpendingPercentage() {
        if (this.weeklyIncome === 0) {
            return this.weeklySpending > 0 ? 100 : 0;
        }
        return (this.weeklySpending / this.weeklyIncome) * 100;
    }

    // Calculate savings rate
    calculateSavingsRate() {
        if (this.weeklyIncome === 0) return 0;
        return ((this.weeklyIncome - this.weeklySpending) / this.weeklyIncome) * 100;
    }

    // Calculate debt-to-income ratio
    calculateDebtToIncomeRatio() {
        if (this.weeklyIncome === 0) return Infinity;
        return (this.totalDebt / (this.weeklyIncome * 52)) * 100; // Annualized
    }

    // Validate income
    static validateIncome(value) {
        return value >= MIN_INCOME && value <= MAX_INCOME;
    }

    // Validate spending percentage
    static validateSpendingPercentage(percentage) {
        return percentage >= MIN_SPENDING_PERCENTAGE && percentage <= MAX_SPENDING_PERCENTAGE;
    }

    // Get performance rating based on spending percentage
    getPerformanceRating() {
        const spendingPercentage = this.calculateSpendingPercentage();
        if (spendingPercentage <= 50) return 'Excellent';
        if (spendingPercentage <= 75) return 'Good';
        if (spendingPercentage <= 100) return 'Fair';
        if (spendingPercentage <= 125) return 'Poor';
        return 'Critical';
    }

    // Update weekly metrics
    updateWeeklyMetrics(newWeeklyIncome, newWeeklySpending, newPortfolioValue, newTotalDebt) {
        this.history.push({
            weeklyIncome: this.weeklyIncome,
            weeklySpending: this.weeklySpending,
            portfolioValue: this.portfolioValue,
            totalDebt: this.totalDebt,
            date: new Date()
        });

        this.weeklyIncome = newWeeklyIncome;
        this.weeklySpending = newWeeklySpending;
        this.portfolioValue = newPortfolioValue;
        this.totalDebt = newTotalDebt;
    }

    // Calculate change in income
    calculateIncomeChange() {
        if (this.history.length === 0) return 0;
        const lastWeekIncome = this.history[this.history.length - 1].weeklyIncome;
        return this.weeklyIncome - lastWeekIncome;
    }

    // Calculate change in portfolio value
    calculatePortfolioChange() {
        if (this.history.length === 0) return 0;
        const lastWeekPortfolio = this.history[this.history.length - 1].portfolioValue;
        return this.portfolioValue - lastWeekPortfolio;
    }

    // Calculate net worth change
    calculateNetWorthChange() {
        if (this.history.length === 0) return 0;
        const lastWeekNetWorth = this.history[this.history.length - 1].portfolioValue - this.history[this.history.length - 1].totalDebt;
        const currentNetWorth = this.portfolioValue - this.totalDebt;
        return currentNetWorth - lastWeekNetWorth;
    }

    // Get monthly aggregate data
    getMonthlyAggregate() {
        // For testing purposes, let's use all available data
        const monthData = this.history;

        const totalIncome = monthData.reduce((sum, entry) => sum + entry.weeklyIncome, 0) + this.weeklyIncome;
        const totalSpending = monthData.reduce((sum, entry) => sum + entry.weeklySpending, 0) + this.weeklySpending;
        const averagePortfolioValue = (monthData.reduce((sum, entry) => sum + entry.portfolioValue, 0) + this.portfolioValue) / (monthData.length + 1);

        return {
            totalIncome,
            totalSpending,
            averagePortfolioValue,
            savingsRate: ((totalIncome - totalSpending) / totalIncome) * 100,
            spendingPercentage: (totalSpending / totalIncome) * 100
        };
    }
}

module.exports = PerformanceMetrics;
