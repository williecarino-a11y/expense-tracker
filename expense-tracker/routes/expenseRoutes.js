const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    const newExpense = new Expense({ title, amount, category, date: date || Date.now() });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ message: "Error creating expense", error: error.message });
  }
});
// GET total expenses for the current month
router.get("/total", async (req, res) => {
    try {
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const expenses = await Expense.find({ 
            date: { $gte: startOfMonth } 
        });
        const total = expenses.reduce((sum, item) => sum + item.amount, 0);
        res.json({ total });
    } catch (error) {
        res.status(500).json({ message: "Error calculating total", error: error.message });
    }
});

module.exports = router;
