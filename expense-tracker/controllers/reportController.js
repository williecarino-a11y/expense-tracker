const Expense = require("../models/Expense");

exports.getMonthlyReport = async (req, res) => {
  try {
    const { year, month } = req.query;

    let startDate, endDate;
    if (year && month) {
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 1);
    } else {
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }

    const expenses = await Expense.find({
      date: { $gte: startDate, $lt: endDate }
    });

    const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    const categoryBreakdown = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

    res.status(200).json({
      period: { year: startDate.getFullYear(), month: startDate.getMonth() + 1 },
      totalSpent,
      count: expenses.length,
      categoryBreakdown,
      expenses
    });
  } catch (error) {
    res.status(500).json({ message: "Error generating monthly report", error: error.message });
  }
};
