require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONOG_URI || process.env.MONGO_URI)
    .then(() => console.log("🟢 MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Error:", err));

// Import routes
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const reportRoutes = require("./routes/reportRoutes");

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/reports", reportRoutes);

// Static files (served AFTER API routes so they don't override endpoints)
app.use(express.static(path.join(__dirname, "public")));

// Dashboard View Route
app.get("/d", (req, res) => {
    res.sendFile(path.join(__dirname, "public/dashboard.html"));
});

// Default root route serves the login page first
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
