// public/js/dashboard.js
window.addEventListener('load', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const mainContent = document.getElementById('main-content');

    const views = {
        home: `
            <div class="space-y-4">
                <div class="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-700">
                    <h2 class="font-semibold text-sm text-gray-400">Total Balance</h2>
                    <p class="text-2xl font-bold text-emerald-400">$0.00</p>
                </div>
                <div class="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-700">
                    <h3 class="font-medium mb-2 text-gray-200">Recent Transactions</h3>
                    <div id="transaction-list" class="space-y-2">
                        <p class="text-sm text-gray-400">No transactions recorded yet.</p>
                    </div>
                </div>
            </div>
        `,
        transactions: `
            <div class="space-y-4 p-2">
                <h2 class="text-lg font-bold text-white">Transaction Logs</h2>
                <div class="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-700">
                    <p class="text-sm text-gray-300">All transaction records will be displayed here.</p>
                </div>
            </div>
        `,
        add: `
            <div class="space-y-4 p-2">
                <h2 class="text-lg font-bold text-white">Add New Transaction</h2>
                <div class="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-700">
                    <p class="text-sm text-gray-300">Form inputs for recording income or expenses.</p>
                </div>
            </div>
        `,
        analytics: `
            <div class="space-y-4 p-2">
                <h2 class="text-lg font-bold text-white">Spending Metrics</h2>
                <div class="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-700">
                    <p class="text-sm text-gray-300">Analytics and charts summary.</p>
                </div>
            </div>
        `,
        settings: `
            <div class="space-y-4 p-2">
                <h2 class="text-lg font-bold text-white">Configuration</h2>
                <div class="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-700">
                    <p class="text-sm text-gray-300">App settings and preferences.</p>
                </div>
            </div>
        `
    };

    // Ensure home view loads initially
    if (mainContent) {
        mainContent.innerHTML = views.home;
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Reset active states
            navItems.forEach(nav => {
                nav.style.color = '#9ca3af';
            });
            item.style.color = '#34d399';

            const targetView = item.getAttribute('data-target');
            if (views[targetView] && mainContent) {
                mainContent.innerHTML = views[targetView];
            }
        });
    });
});
