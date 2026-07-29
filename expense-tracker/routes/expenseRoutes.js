const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// GET all expenses
router.get("/", async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ createdAt: -1, _id: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching expenses", error: error.message });
    }
});

// POST a new expense
router.post("/", async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;
        const newExpense = new Expense({ 
            title: title || category, 
            amount, 
            category, 
            date: date || Date.now() 
        });
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(500).json({ message: "Error creating expense", error: error.message });
    }
});

// GET total expenses for the current month
router.get("/total", async (req, res) => {
    try {
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const expenses = await Expense.find({
            $or: [
                { date: { $gte: startOfMonth } },
                { createdAt: { $gte: startOfMonth } }
            ]
        });
        const total = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
        res.json({ total });
    } catch (error) {
        res.status(500).json({ message: "Error calculating total", error: error.message });
    }
});

module.exports = router;
