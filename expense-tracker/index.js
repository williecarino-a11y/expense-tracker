require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routers/authRoutes");
const expenseRoutes = require("./routers/expenseRoutes");
const transactionRoutes = require("./routers/transactionRoutes");
const subscriptionRoutes = require("./routers/subscriptionRoutes");
const analyticsRoutes = require("./routers/analyticsRoutes");
const exportRoutes = require("./routers/exportRoutes");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Connect to MongoDB Atlas
const MONGO_URI = "mongodb+srv://williecarino23_db_user:williecarino070@expense-tracker0.xoeajf4.mongodb.net/?appName=Expense-Tracker0";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/export", exportRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
