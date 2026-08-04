window.addEventListener('load', () => {
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
        transactions: `
            <div class="space-y-4 p-2">
                <h2 class="text-lg font-bold text-white">Transactions</h2>
                <div class="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-700">
                    <p class="text-sm text-gray-300">All transactions list goes here.</p>
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
            </div>
        `,
        config: `
            <div class="space-y-4 p-2">
                <h2 class="text-lg font-bold text-white">Configuration</h2>
            </div>
        `
    };

    // 1. Render default home view on load
    if (mainContent && views.home) {
        mainContent.innerHTML = views.home;
    }

    // 2. Attach click listeners to bottom navigation items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active styles from all nav items if needed
            navItems.forEach(nav => nav.classList.remove('text-emerald-400'));
            item.classList.add('text-emerald-400');

            const viewKey = item.getAttribute('data-view') || item.textContent.trim().toLowerCase();
            if (mainContent && views[viewKey]) {
                mainContent.innerHTML = views[viewKey];
            }
        });
    });
});
