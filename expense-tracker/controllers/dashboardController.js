const Expense = require("../models/Expense");

const getDashboardSummary = async (req, res) => {
    try {
        const expenses = await Expense.find();

        const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
        const totalTransactions = expenses.length;
        const largestExpense = expenses.length > 0 ? Math.max(...expenses.map(expense => Number(expense.amount))) : 0;

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const currentMonthExpenses = expenses
            .filter(expense => {
                const date = new Date(expense.createdAt);
                return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
            })
            .reduce((sum, expense) => sum + Number(expense.amount), 0);

        // Simulated or fetched Income & Savings metrics for full summary
        const totalIncome = 4200.00; 
        const totalSavings = 3200.00;
        const netBalance = totalIncome - totalExpenses;

        res.json({
            success: true,
            totalBalance: netBalance,
            totalIncome: totalIncome,
            totalExpenses: totalExpenses,
            totalSavings: totalSavings,
            currentMonthExpenses: currentMonthExpenses,
            totalTransactions: totalTransactions,
            largestExpense: largestExpense
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getDashboardSummary };
