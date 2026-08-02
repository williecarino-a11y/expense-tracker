async function loadDashboardData() {
    try {
        const userId = "CURRENT_USER_ID"; // Replace with your active authenticated user ID mechanism
        const response = await fetch(`/api/dashboard/${userId}`);
        const result = await response.json();

        if (result.success) {
            const { totalBalance, totalIncome, totalExpenses, totalSavings, recentTransactions } = result.data;

            // Bind real database values to DOM text elements
            document.querySelector('.Total-Balance').textContent = `$${totalBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
            document.querySelector('.Income-Amount').textContent = `$${totalIncome.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
            document.querySelector('.Expense-Amount').textContent = `$${totalExpenses.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
            document.querySelector('.Savings-Amount').textContent = `$${totalSavings.toLocaleString(undefined, {minimumFractionDigits: 2})}`;

            // Render live transaction feed dynamically
            const transactionContainer = document.querySelector('.recent-transactions-list');
            if (!transactionContainer) return;
            
            transactionContainer.innerHTML = '';

            if (recentTransactions.length === 0) {
                transactionContainer.innerHTML = `<p class="no-tx text-gray-400 text-center py-2">No recent activity found.</p>`;
                return;
            }

            recentTransactions.forEach(tx => {
                const isExpense = tx.type === 'expense';
                const sign = isExpense ? '-' : '+';
                const colorClass = isExpense ? 'text-red-500' : 'text-green-500';

                const txElement = `
                    <div class="transaction-card flex items-center justify-between p-3 bg-gray-800 rounded-lg mb-2">
                        <div class="flex items-center gap-3">
                            <div class="icon-box p-2 bg-gray-700 rounded-full">🍔</div>
                            <div>
                                <h4 class="text-white font-medium">${tx.title}</h4>
                                <span class="text-xs text-gray-400">${new Date(tx.date).toLocaleString()}</span>
                            </div>
                        </div>
                        <span class="${colorClass} font-semibold">${sign}$${Math.abs(tx.amount).toFixed(2)}</span>
                    </div>
                `;
                transactionContainer.insertAdjacentHTML('beforeend', txElement);
            });
        }
    } catch (error) {
        console.error("Failed to load real-time dashboard data:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadDashboardData);
