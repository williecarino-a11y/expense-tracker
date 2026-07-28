const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// Add Income or Expense
router.post("/add", async (req, res) => {
  try {
    const { userId, type, amount, category, description } = req.body;

    // Validate required fields
    if (!userId || !type || !amount || !category) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    const newTransaction = new Transaction({
      userId,
      type,
      amount,
      category,
      description
    });

    await newTransaction.save();
    res.status(201).json({ message: "Transaction added successfully!", transaction: newTransaction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// View Transactions for a User
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
    
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
