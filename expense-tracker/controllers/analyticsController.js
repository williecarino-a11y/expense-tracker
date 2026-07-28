const Expense = require("../models/Expense");

// Get dashboard summary
const getDashboardSummary = async (req, res) => {
  try {
    // Fetch all expenses
    const expenses = await Expense.find();

    // Calculate total expenses
    const totalExpenses = expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    res.status(200).json({
      totalExpenses,
      totalTransactions: expenses.length,
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching dashboard summary",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardSummary,
};
