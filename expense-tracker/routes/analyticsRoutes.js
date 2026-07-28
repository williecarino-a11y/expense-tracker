const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// GET /api/analytics
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();

    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const expensesByCategory = {};

    expenses.forEach((expense) => {
      const category = expense.category || "Other";

      expensesByCategory[category] =
        (expensesByCategory[category] || 0) + expense.amount;
    });

    res.json({
      totalExpenses,
      totalTransactions: expenses.length,
      expensesByCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching analytics",
      error: error.message,
    });
  }
});

module.exports = router;
