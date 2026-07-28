const express = require("express");
const router = express.Router();

const { getDashboardSummary } = require("../controllers/dashboardController");

// Dashboard summary route
router.get("/", getDashboardSummary);

module.exports = router;
