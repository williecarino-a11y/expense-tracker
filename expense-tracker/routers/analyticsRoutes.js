const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

router.get("/summary", async (req, res) => {
    try {
        const transactions = await Transaction.find();

        let totalIncome = 0;
        let totalExpense = 0;
        const categoryBreakdown = {};

        transactions.forEach(txn => {
            if (txn.type === "income") {
                totalIncome += txn.amount;
            } else if (txn.type === "expense") {
                totalExpense += txn.amount;

                if (!categoryBreakdown[txn.category]) {
                    categoryBreakdown[txn.category] = 0;
                }
                categoryBreakdown[txn.category] += txn.amount;
            }
        });

        const netBalance = totalIncome - totalExpense;

        res.status(200).json({
            success: true,
            data: {
                totalIncome,
                totalExpense,
                netBalance,
                categoryBreakdown
            }
        });
    } catch (error) {
        console.error("Analytics error:", error);
        res.status(500).json({ success: false, message: "Server error calculating analytics" });
    }
});

module.exports = router;
