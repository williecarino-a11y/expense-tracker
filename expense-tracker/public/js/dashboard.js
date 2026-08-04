// public/js/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const mainContent = document.getElementById('main-content');

    // Define custom views matching your dashboard layout
    const views = {
        home: `
            <div class="space-y-4">
                <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                    <h2 class="font-semibold text-sm text-gray-500">Total Balance</h2>
                    <p class="text-2xl font-bold text-emerald-600">$0.00</p>
                </div>
                <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                    <h3 class="font-medium mb-2">Recent Transactions</h3>
                    <div id="transaction-list" class="space-y-2">
                        <!-- Dynamic transaction rows inject here -->
                    </div>
                </div>
            </div>
        `,
        transactions: `
            <div class="space-y-4">
                <h2 class="text-lg font-bold">Transaction Logs</h2>
                <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                    <p class="text-sm text-gray-500">All transaction records will be displayed here.</p>
                </div>
            </div>
        `,
        add: `
            <div class="space-y-4">
                <h2 class="text-lg font-bold">Add New Transaction</h2>
                <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                    <p class="text-sm text-gray-500">Form inputs for recording income or expenses.</p>
                </div>
            </div>
        `,
        analytics: `
            <div class="space-y-4">
                <h2 class="text-lg font-bold">Spending Metrics</h2>
                <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                    <p class="text-sm text-gray-500">Analytics and charts summary.</p>
                </div>
            </div>
        `,
        settings: `
            <div class="space-y-4">
                <h2 class="text-lg font-bold">Configuration</h2>
                <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                    <p class="text-sm text-gray-500">App settings and preferences.</p>
                </div>
            </div>
        `
    };

    // Initial load defaults to home
    if (mainContent) {
        mainContent.innerHTML = views.home;
    }

    // Handle navigation clicks
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault(); // Stop any default anchor/form action if present
        
        navItems.forEach(nav => nav.classList.remove('text-emerald-400', 'text-emerald-600'));
        navItems.forEach(nav => nav.classList.add('text-gray-400'));
        
        item.classList.remove('text-gray-400');
        item.classList.add('text-emerald-400');

        const targetView = item.getAttribute('data-target');
        if (views[targetView] && mainContent) {
            mainContent.innerHTML = views[targetView];
        }
    });
});
