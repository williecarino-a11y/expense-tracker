document.addEventListener("DOMContentLoaded", () => {
    // 1. Check if the login token exists
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    
    if (!token) {
        // If not logged in, force a redirect to your login/index page
        window.location.href = "/index.html"; 
        return;
    }

    // 2. Category icon mappings
    const categoryIcons = {
        'Food & Groceries': '🍔',
        'Rent & Utilities': '🏠',
        'Transportation': '🚗',
        'Entertainment': '🎮',
        'Shopping': '🛍️',
        'Health & Fitness': '💊',
        'Bills & Subscriptions': '📱',
        'Education': '📚',
        'Others': '📦'
    };

    // Add the rest of your dashboard initialization/binding logic here
});
