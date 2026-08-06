document.addEventListener('DOMContentLoaded', () => {
    // 1. Check if the login token exists
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
        // If not logged in, force a redirect to your login/index page
        window.location.href = '/index.html';
        return;
    }

    // 2. Category icon mappings
    const categoryIcons = {
        'Food & Groceries': '🛒',
        'Rent & Utilities': '⚡',
        'Transportation': '🚗',
        'Entertainment': '🎮',
        'Shopping': '🛍️',
        'Health & Fitness': '💊',
        'Bills & Subscriptions': '📱',
        'Education': '📚',
        'Others': '📦'
    };

    // 3. Universal Logout Handler
    function setupLogout() {
        const logoutBtn = document.getElementById('logout-btn') || document.querySelector('.logout-trigger');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                window.location.href = '/index.html';
            });
        }
    }

    setupLogout();
});

// 4. Bottom Navigation and Notification Handlers
document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item, nav button, footer button'); 
  const views = document.querySelectorAll('.app-view, .view-section');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active states from all and highlight current
      navItems.forEach(nav => nav.classList.remove('active', 'text-green-500'));
      item.classList.add('active', 'text-green-500');
      
      const targetViewId = item.getAttribute('data-target') || item.textContent.trim().toLowerCase();
      
      views.forEach(view => {
        if (view.id.toLowerCase().includes(targetViewId)) {
          view.classList.remove('hidden');
        } else {
          view.classList.add('hidden');
        }
      });
    });
  });

  // Notification Bell Handler
  const notificationBell = document.querySelector('.fa-bell, #notification-btn');
  const notificationDrawer = document.getElementById('notification-drawer');

  if (notificationBell && notificationDrawer) {
    notificationBell.addEventListener('click', (e) => {
      e.preventDefault();
      notificationDrawer.classList.toggle('hidden');
    });
  }
});
