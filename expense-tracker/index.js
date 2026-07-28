const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routers/authRoutes");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'));

// Replace YOUR_PASSWORD_HERE with your actual password
const MONGO_URI = "mongodb+srv://williecarino23_db_user:williecarino070@expense-tracker0.xoeajf4.mongodb.net/?appName=Expense-Tracker0";

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

const analyticsRoutes = require("./routers/analyticsRoutes");// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
const transactionRoutes = require("./routers/transactionRoutes");
app.use("/api/transactions", transactionRoutes);
// Homepage route to fix "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running successfully!");
});
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



