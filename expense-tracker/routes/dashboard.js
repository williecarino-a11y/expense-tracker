const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET live dashboard metrics and transactions
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const transactions = await Transaction.find({ userId }).sort({ date: -1 });

        let totalIncome = 0;
        let totalExpenses = 0;
        let totalSavings = 0;

        transactions.forEach(tx => {
            if (tx.type === 'income') totalIncome += tx.amount;
            if (tx.type === 'expense') totalExpenses += tx.amount;
            if (tx.type === 'savings') totalSavings += tx.amount;
        });

        const totalBalance = totalIncome - totalExpenses + totalSavings;

        res.status(200).json({
            success: true,
            data: {
                totalBalance,
                totalIncome,
                totalExpenses,
                totalSavings,
                recentTransactions: transactions.slice(0, 5)
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
});

module.exports = router;
