const router = require("express").Router();
const { getMonthlyReport } = require("../controllers/reportController");

router.get("/monthly", getMonthlyReport);

module.exports = router;
