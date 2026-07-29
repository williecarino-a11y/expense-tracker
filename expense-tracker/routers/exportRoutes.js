const express = require("express");
const router = express.Router();
const { Parser } = require("json2csv");
const Transaction = require("../models/Transaction"); // Adjust path to your Transaction model if needed

// GET /api/export/csv
router.get("/csv", async (req, res) => {
  try {
    // Fetch transactions (you can filter by req.user.id if using auth middleware)
    const transactions = await Transaction.find().lean();

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found to export." });
    }

    const fields = ["_id", "title", "amount", "category", "date", "createdAt"];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(transactions);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=expense-report.csv");
    res.status(200).end(csv);
  } catch (error) {
    console.error("Export error:", error);
    res.status(500).json({ message: "Server error during export" });
  }
});

module.exports = router;
