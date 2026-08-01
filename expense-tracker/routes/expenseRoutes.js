const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// GET all expenses (with search, filter, and sort capabilities)
router.get("/", async (req, res) => {
    try {
        const { search, category, startDate, endDate, sortBy } = req.query;
        let query = {};

        // 1. Search expenses by title or category
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } }
            ];
        }

        // 2. Filter by category
        if (category && category !== "All") {
            query.category = category;
        }

        // 3. Filter by date range
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        // 4. Sort configuration
        let sortConfig = { createdAt: -1 }; // Default to newest
        if (sortBy === "highest") {
            sortConfig = { amount: -1 };
        } else if (sortBy === "lowest") {
            sortConfig = { amount: 1 };
        } else if (sortBy === "newest") {
            sortConfig = { date: -1 };
        }

        const expenses = await Expense.find(query).sort(sortConfig);
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
        const expenses = await Expense.find({ date: { $gte: startOfMonth } });
        const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
        res.json({ total });
    } catch (error) {
        res.status(500).json({ message: "Error calculating total", error: error.message });
    }
});

module.exports = router;
