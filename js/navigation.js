// Handle navigation between views
document.addEventListener('DOMContentLoaded', () => {
    // Handle tab switching
    const tabs = document.querySelectorAll('.nav-tab');
    const homeView = document.querySelector('.home-view');
    const adminView = document.querySelector('.admin-view');

    if (tabs) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                if (tab.textContent === 'Home View') {
                    homeView.classList.add('active');
                    adminView.classList.remove('active');
                } else if (tab.textContent === 'Admin View') {
                    homeView.classList.remove('active');
                    adminView.classList.add('active');
                }
            });
        });
    }

    // Handle category navigation
    const categoryCards = document.querySelectorAll('.category-card');
    if (categoryCards) {
        categoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const href = card.getAttribute('href');
                if (href) {
                    window.location.href = href;
                }
            });
        });
    }
});
