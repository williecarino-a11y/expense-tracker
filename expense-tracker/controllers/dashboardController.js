const Expense = require("../models/expense"); // Or your transaction model

const getDashboardSummary = async (req, res) => {
    try {
        const transactions = await Expense.find(); // Or filter by user ID if using auth: { userId: req.user.id }

        // Separate and calculate dynamically
        const totalExpenses = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + Number(t.amount || 0), 0);

        const totalIncome = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + Number(t.amount || 0), 0);

        const totalSavings = totalIncome - totalExpenses; // Or calculate from a savings model/field
        const totalBalance = totalIncome - totalExpenses;
        const totalTransactions = transactions.length;

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const currentMonthExpenses = transactions
            .filter(t => {
                const date = new Date(t.createdAt || t.date);
                return t.type === 'expense' && date.getMonth() === currentMonth && date.getFullYear() === currentYear;
            })
            .reduce((sum, t) => sum + Number(t.amount || 0), 0);

        res.json({
            success: true,
            totalBalance,
            totalIncome,
            totalExpenses,
            totalSavings,
            currentMonthExpenses,
            totalTransactions,
            recentTransactions: transactions.slice(-5).reverse() // Send last 5 recent records
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getDashboardSummary };
