const PerformanceMetrics = require('./performanceMetrics');

describe('PerformanceMetrics', () => {
    describe('validateIncome', () => {
        test('valid income', () => {
            expect(PerformanceMetrics.validateIncome(50000)).toBe(true);
        });

        test('minimum valid income', () => {
            expect(PerformanceMetrics.validateIncome(0)).toBe(true);
        });

        test('maximum valid income', () => {
            expect(PerformanceMetrics.validateIncome(1000000000)).toBe(true);
        });

        test('negative income', () => {
            expect(PerformanceMetrics.validateIncome(-1)).toBe(false);
        });

        test('income exceeding maximum', () => {
            expect(PerformanceMetrics.validateIncome(1000000001)).toBe(false);
        });
    });

    describe('validateSpendingPercentage', () => {
        test('valid spending percentage', () => {
            expect(PerformanceMetrics.validateSpendingPercentage(50)).toBe(true);
        });

        test('minimum valid spending percentage', () => {
            expect(PerformanceMetrics.validateSpendingPercentage(0)).toBe(true);
        });

        test('maximum valid spending percentage', () => {
            expect(PerformanceMetrics.validateSpendingPercentage(100)).toBe(true);
        });

        test('negative spending percentage', () => {
            expect(PerformanceMetrics.validateSpendingPercentage(-1)).toBe(false);
        });

        test('spending percentage exceeding maximum', () => {
            expect(PerformanceMetrics.validateSpendingPercentage(101)).toBe(false);
        });
    });

    describe('calculateSpendingPercentage', () => {
        test('normal spending percentage calculation', () => {
            const metrics = new PerformanceMetrics(1000, 250, 10000);
            expect(metrics.calculateSpendingPercentage()).toBe(25);
        });

        test('zero income', () => {
            const metrics = new PerformanceMetrics(0, 100, 10000);
            expect(metrics.calculateSpendingPercentage()).toBe(100);
        });

        test('zero spending', () => {
            const metrics = new PerformanceMetrics(1000, 0, 10000);
            expect(metrics.calculateSpendingPercentage()).toBe(0);
        });

        test('zero income and zero spending', () => {
            const metrics = new PerformanceMetrics(0, 0, 10000);
            expect(metrics.calculateSpendingPercentage()).toBe(0);
        });
    });

    describe('getPerformanceRating', () => {
        test('Excellent rating', () => {
            const metrics = new PerformanceMetrics(1000, 400, 10000);
            expect(metrics.getPerformanceRating()).toBe('Excellent');
        });

        test('Good rating', () => {
            const metrics = new PerformanceMetrics(1000, 700, 10000);
            expect(metrics.getPerformanceRating()).toBe('Good');
        });

        test('Fair rating', () => {
            const metrics = new PerformanceMetrics(1000, 950, 10000);
            expect(metrics.getPerformanceRating()).toBe('Fair');
        });

        test('Poor rating', () => {
            const metrics = new PerformanceMetrics(1000, 1200, 10000);
            expect(metrics.getPerformanceRating()).toBe('Poor');
        });

        test('Critical rating', () => {
            const metrics = new PerformanceMetrics(1000, 1500, 10000);
            expect(metrics.getPerformanceRating()).toBe('Critical');
        });
    });

    describe('calculateSavingsRate', () => {
        test('normal savings rate calculation', () => {
            const metrics = new PerformanceMetrics(1000, 750, 50000, 10000);
            expect(metrics.calculateSavingsRate()).toBe(25);
        });

        test('zero income', () => {
            const metrics = new PerformanceMetrics(0, 100, 50000, 10000);
            expect(metrics.calculateSavingsRate()).toBe(0);
        });

        test('spending more than income', () => {
            const metrics = new PerformanceMetrics(1000, 1200, 50000, 10000);
            expect(metrics.calculateSavingsRate()).toBe(-20);
        });
    });

    describe('calculateDebtToIncomeRatio', () => {
        test('normal debt-to-income ratio calculation', () => {
            const metrics = new PerformanceMetrics(1000, 750, 50000, 26000); // 26000 / (1000 * 52) * 100 = 50%
            expect(metrics.calculateDebtToIncomeRatio()).toBe(50);
        });

        test('zero income', () => {
            const metrics = new PerformanceMetrics(0, 100, 50000, 10000);
            expect(metrics.calculateDebtToIncomeRatio()).toBe(Infinity);
        });

        test('zero debt', () => {
            const metrics = new PerformanceMetrics(1000, 750, 50000, 0);
            expect(metrics.calculateDebtToIncomeRatio()).toBe(0);
        });
    });

    describe('updateWeeklyMetrics and changes', () => {
        test('update metrics and calculate changes', () => {
            const metrics = new PerformanceMetrics(1000, 750, 50000, 10000);
            
            // First update
            metrics.updateWeeklyMetrics(1100, 800, 52000, 9500);
            expect(metrics.calculateIncomeChange()).toBe(100);
            expect(metrics.calculatePortfolioChange()).toBe(2000);
            expect(metrics.calculateNetWorthChange()).toBe(2500);

            // Second update
            metrics.updateWeeklyMetrics(1050, 900, 51000, 9000);
            expect(metrics.calculateIncomeChange()).toBe(-50);
            expect(metrics.calculatePortfolioChange()).toBe(-1000);
            expect(metrics.calculateNetWorthChange()).toBe(-500);
        });

        test('no changes on first update', () => {
            const metrics = new PerformanceMetrics(1000, 750, 50000, 10000);
            expect(metrics.calculateIncomeChange()).toBe(0);
            expect(metrics.calculatePortfolioChange()).toBe(0);
            expect(metrics.calculateNetWorthChange()).toBe(0);
        });
    });

    describe('getMonthlyAggregate', () => {
        test('monthly aggregate calculation', () => {
            const metrics = new PerformanceMetrics(1000, 750, 50000, 10000);
            
            // Simulate 3 weeks of historical data
            metrics.updateWeeklyMetrics(1100, 800, 51000, 9500);
            metrics.updateWeeklyMetrics(1200, 850, 52000, 9000);
            metrics.updateWeeklyMetrics(1300, 900, 53000, 8500);

            const monthlyAggregate = metrics.getMonthlyAggregate();
            expect(monthlyAggregate.totalIncome).toBe(4600); // 1000 + 1100 + 1200 + 1300
            expect(monthlyAggregate.totalSpending).toBe(3300); // 750 + 800 + 850 + 900
            expect(monthlyAggregate.averagePortfolioValue).toBe(51500); // average of 50000, 51000, 52000, 53000
            expect(monthlyAggregate.savingsRate).toBeCloseTo(28.26, 2); // (4600 - 3300) / 4600 * 100
            expect(monthlyAggregate.spendingPercentage).toBeCloseTo(71.74, 2); // 3300 / 4600 * 100
        });
    });
});
