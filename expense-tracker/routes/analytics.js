const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');

// GET /api/analytics/monthly
router.get('/monthly', async (req, res) => {
    try {
        const { year, month } = req.query;
        const userId = req.user.id;

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const stats = await Transaction.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    date: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $group: {
                    _id: { category: "$category", type: "$type" },
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { totalAmount: -1 }
            }
        ]);

        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
