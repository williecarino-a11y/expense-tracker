document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const mainContent = document.getElementById('main-content');

    const views = {
        home: `
            <div class="space-y-4">
                <div class="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-700">
                    <h2 class="font-semibold text-sm text-gray-400">Group Wallet</h2>
                    <p class="text-2xl font-bold text-emerald-400">$0.00</p>
                </div>
                <div class="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-700">
                    <h3 class="font-medium mb-2 text-gray-200">Recent Transactions</h3>
                    <div id="transaction-list" class="space-y-2">
                        <p class="text-sm text-gray-400">No transactions yet.</p>
                    </div>
                </div>
            </div>
        `,
        logs: `
            <div class="space-y-4 p-2">
                <h2 class="text-lg font-bold text-white">Activity Logs</h2>
                <div class="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-700">
                    <p class="text-sm text-gray-300">Transaction history logs go here.</p>
                </div>
            </div>
        `,
        add: `
            <div class="space-y-4 p-2">
                <h2 class="text-lg font-bold text-white">Add New Transaction</h2>
                <div class="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-700">
                    <p class="text-sm text-gray-300">Form inputs for new entry.</p>
                </div>
            </div>
        `,
        metrics: `
            <div class="space-y-4 p-2">
                <h2 class="text-lg font-bold text-white">Metrics & Analytics</h2>
                <div class="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-700">
                    <p class="text-sm text-gray-300">Analytics overview.</p>
                </div>
            </div>
        `,
        config: `
            <div class="space-y-4 p-2">
                <h2 class="text-lg font-bold text-white">Configuration</h2>
                <div class="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-700">
                    <p class="text-sm text-gray-300">App settings and preferences.</p>
                </div>
            </div>
        `
    };

    // Safely remove any static loading text if present
    const loadingEl = document.querySelector('.loading-insights, h2 + p');
    if (loadingEl && loadingEl.textContent.includes('Loading')) {
        loadingEl.textContent = 'Welcome back!';
    }

    // Render home view initially if mainContent exists
    if (mainContent) {
        mainContent.innerHTML = views.home;
    }

// Handle bottom navigation clicks dynamically using data-target
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        // Highlight active tab
        navItems.forEach(nav => nav.classList.remove('text-emerald-400', 'font-bold'));
        item.classList.add('text-emerald-400', 'font-bold');

        // Get target view safely from a data-target attribute
        const targetView = item.getAttribute('data-target') || 'home';

        if (mainContent && views[targetView]) {
            mainContent.innerHTML = views[targetView];
        }
    });
});
