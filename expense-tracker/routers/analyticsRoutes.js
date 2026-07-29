const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const isPremium = require('../middleware/isPremium');

// Protected Advanced Analytics & Forecasting Route
router.get('/advanced-summary', isPremium, async (req, res) => {
  try {
    const transactions = await Transaction.find();

    let totalSpent = 0;
    const categoryBreakdown = {};

    transactions.forEach(txn => {
      if (txn.type === "expense") {
        totalSpent += txn.amount;
        categoryBreakdown[txn.category] = (categoryBreakdown[txn.category] || 0) + txn.amount;
      }
    });

    // Simple forecasting calculation
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    
    const dailyAverage = dayOfMonth > 0 ? totalSpent / dayOfMonth : 0;
    const projectedMonthlySpend = dailyAverage * daysInMonth;

    res.json({
      success: true,
      totalSpent,
      categoryBreakdown,
      forecast: {
        dailyAverage: dailyAverage.toFixed(2),
        projectedMonthlySpend: projectedMonthlySpend.toFixed(2),
        advice: projectedMonthlySpend > 50000 ? "Warning: You are tracking above average spend." : "Your spending is currently stable."
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
