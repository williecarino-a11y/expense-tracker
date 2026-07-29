const Expense = require("../models/Expense");

const getDashboardSummary = async (req, res) => {
  try {
    const expenses = await Expense.find();

    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const totalTransactions = expenses.length;

    const largestExpense =
      expenses.length > 0
        ? Math.max(...expenses.map(expense => expense.amount))
        : 0;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const currentMonthTotal = expenses
      .filter(expense => {
        const date = new Date(expense.createdAt);
        return (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        );
      })
      .reduce((sum, expense) => sum + expense.amount, 0);

    res.json({
      totalExpenses,
      currentMonthTotal,
      totalTransactions,
      largestExpense
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardSummary };
