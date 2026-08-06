const Expense = require('../models/Expense');
const Wallet = require('../models/Wallet');

// Get all expenses (with search, filter, and sort capabilities)
exports.getExpenses = async (req, res) => {
    try {
        const { search, category, startDate, endDate, sortBy } = req.query;
        let query = {};

        // 1. Search expenses by title or category
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ];
        }

        // 2. Filter by category
        if (category && category !== 'All') {
            query.category = category;
        }

        // 3. Filter by date range
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        // 4. Sort configuration
        let sortConfig = { createdAt: -1 }; // Default to newest
        if (sortBy === 'highest') {
            sortConfig = { amount: -1 };
        } else if (sortBy === 'lowest') {
            sortConfig = { amount: 1 };
        } else if (sortBy === 'newest') {
            sortConfig = { date: -1 };
        }

        const expenses = await Expense.find(query).sort(sortConfig);
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new transaction
exports.addExpense = async (req, res) => {
    try {
        const { title, amount, category, type, walletId, date } = req.body;

        const expense = new Expense({
            title,
            amount,
            category,
            type,
            wallet: walletId,
            date: date || Date.now()
        });

        await expense.save();

        if (walletId) {
            const wallet = await Wallet.findById(walletId);
            if (wallet) {
                if (type === 'income') {
                    wallet.balance += Number(amount);
                } else if (type === 'expense') {
                    wallet.balance -= Number(amount);
                }
                await wallet.save();
            }
        }

        res.status(201).json({ message: 'Transaction added successfully', expense });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a transaction
exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findByIdAndDelete(id);
        
        if (!expense) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
