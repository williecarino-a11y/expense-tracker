const Notification = require('../models/Notification');

// Get all notifications
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
        res.status(200).json({ message: 'Notification marked as read', notification });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
