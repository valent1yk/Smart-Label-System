document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    initializeTheme();
    initializeQRScanner();
    initializeAdminView();
    showView('home');
    updateProductTable();
});

function initializeElements() {
    initializeDropdowns();
    initializeButtons();
    initializeToggles();
    initializeTabSwitching();
}

function initializeTabSwitching() {
    const tabs = document.querySelectorAll('.nav-tab');
    const homeView = document.querySelector('.home-view');
    const adminView = document.querySelector('.admin-view');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding view
            if (tab.textContent === 'Home View') {
                homeView.classList.add('active');
                adminView.classList.remove('active');
            } else if (tab.textContent === 'Admin View') {
                homeView.classList.remove('active');
                adminView.classList.add('active');
                loadAdminDashboard();
            }
        });
    });
}

function initializeAdminView() {
    // Initialize admin buttons
    const addProductBtn = document.getElementById('addProductBtn');
    const editProductsBtn = document.getElementById('editProductsBtn');
    const manageStockBtn = document.getElementById('manageStockBtn');

    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => {
            hideAllViews();
            document.querySelector('.add-product-view').classList.add('active');
        });
    }

    if (editProductsBtn) {
        editProductsBtn.addEventListener('click', () => {
            hideAllViews();
            document.querySelector('.edit-products-view').classList.add('active');
            loadProductsTable();
        });
    }

    if (manageStockBtn) {
        manageStockBtn.addEventListener('click', () => {
            hideAllViews();
            document.querySelector('.manage-stock-view').classList.add('active');
            loadStockTable();
        });
    }

    // Initialize back buttons
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            hideAllViews();
            document.querySelector('.admin-view').classList.add('active');
        });
    });
}

function hideAllViews() {
    const views = document.querySelectorAll('.view');
    views.forEach(view => view.classList.remove('active'));
}

function loadAdminDashboard() {
    // Load statistics
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const lowStock = products.filter(product => product.stock < 10).length;
    
    // Update statistics in the dashboard
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('totalStock').textContent = totalStock;
    document.getElementById('lowStock').textContent = lowStock;
}

function initializeDropdowns() {
    // Notifications Dropdown
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationsDropdown = document.getElementById('notificationsDropdown');

    if (notificationBtn && notificationsDropdown) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown(notificationsDropdown);
        });
    }

    // Profile Dropdown
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');

    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown(profileDropdown);
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        const dropdowns = document.querySelectorAll('.notifications-dropdown, .profile-dropdown');
        dropdowns.forEach((dropdown) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });
}

function initializeButtons() {
    // Admin Buttons
    document.querySelectorAll('.admin-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const action = button.textContent.trim();
            switch(action) {
                case 'Add Product':
                    showView('add-product');
                    break;
                case 'Edit Products':
                    showView('edit-products');
                    break;
                case 'Manage Stock':
                    showView('manage-stock');
                    break;
                default:
                    console.log('Action not implemented:', action);
            }
        });
    });

    // Profile Menu Items
    document.querySelectorAll('.profile-menu-item').forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.getAttribute('href').replace('#', '').replace('-view', '');
            if (view === 'logout') {
                handleLogout();
            } else {
                showView(view);
                closeAllDropdowns();
            }
        });
    });

    // Navigation Buttons
    document.querySelectorAll('.nav-buttons button').forEach((button) => {
        button.addEventListener('click', () => {
            const view = button.dataset.view;
            showView(view);
        });
    });

    // Back Buttons
    document.querySelectorAll('.back-button').forEach((button) => {
        button.addEventListener('click', () => {
            showView('home');
        });
    });

    // Save Profile Button
    const saveProfileBtn = document.querySelector('.save-profile-btn');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', handleProfileSave);
    }

    // View Details Buttons
    document.querySelectorAll('.view-details-btn').forEach((button) => {
        button.addEventListener('click', (e) => {
            const orderItem = e.target.closest('.order-item');
            const orderId = orderItem.querySelector('h4').textContent.split('#')[1];
            alert(`Viewing details for Order #${orderId}\nThis feature will be implemented soon!`);
        });
    });

    // Add to Cart Buttons
    document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
        button.addEventListener('click', (e) => {
            const wishlistItem = e.target.closest('.wishlist-item');
            const productName = wishlistItem.querySelector('h4').textContent;
            alert(`Added ${productName} to cart!\nThis feature will be implemented soon!`);
        });
    });

    // Remove from Wishlist Buttons
    document.querySelectorAll('.remove-from-wishlist-btn').forEach((button) => {
        button.addEventListener('click', (e) => {
            const wishlistItem = e.target.closest('.wishlist-item');
            const productName = wishlistItem.querySelector('h4').textContent;
            if (confirm(`Remove ${productName} from wishlist?`)) {
                wishlistItem.remove();
            }
        });
    });
}

function initializeToggles() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }

    // Push Notifications Toggle
    const pushNotificationsToggle = document.getElementById('pushNotificationsToggle');
    if (pushNotificationsToggle) {
        pushNotificationsToggle.addEventListener('change', () => {
            localStorage.setItem('pushNotifications', pushNotificationsToggle.checked ? 'enabled' : 'disabled');
        });
    }

    // Email Notifications Toggle
    const emailNotificationsToggle = document.getElementById('emailNotificationsToggle');
    if (emailNotificationsToggle) {
        emailNotificationsToggle.addEventListener('change', () => {
            localStorage.setItem('emailNotifications', emailNotificationsToggle.checked ? 'enabled' : 'disabled');
        });
    }

    // Two Factor Authentication Toggle
    const twoFactorToggle = document.getElementById('twoFactorToggle');
    if (twoFactorToggle) {
        twoFactorToggle.addEventListener('change', () => {
            localStorage.setItem('twoFactor', twoFactorToggle.checked ? 'enabled' : 'disabled');
        });
    }
}

function toggleDropdown(dropdown) {
    const allDropdowns = document.querySelectorAll('.notifications-dropdown, .profile-dropdown');
    allDropdowns.forEach((dd) => {
        if (dd !== dropdown) {
            dd.classList.remove('active');
        }
    });
    dropdown.classList.toggle('active');
}

function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.notifications-dropdown, .profile-dropdown');
    dropdowns.forEach((dropdown) => dropdown.classList.remove('active'));
}

function showView(viewId) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });

    // Show selected view
    const selectedView = document.querySelector(`.${viewId}-view`);
    if (selectedView) {
        selectedView.classList.add('active');
    }

    // Update navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.textContent.toLowerCase().includes(viewId.toLowerCase())) {
            tab.classList.add('active');
        }
    });
}

function setActiveButton(activeButton) {
    const buttons = document.querySelectorAll('.nav-buttons button');
    buttons.forEach((button) => button.classList.remove('active'));
    activeButton.classList.add('active');
}

function handleProfileSave() {
    const saveProfileBtn = document.querySelector('.save-profile-btn');
    saveProfileBtn.textContent = 'Saved!';
    saveProfileBtn.style.background = '#4CAF50';
    setTimeout(() => {
        saveProfileBtn.textContent = 'Save Changes';
        saveProfileBtn.style.background = '#1A73E8';
    }, 2000);
}

function handleLogout() {
    // Clear user data
    localStorage.removeItem('darkMode');
    localStorage.removeItem('pushNotifications');
    localStorage.removeItem('emailNotifications');
    localStorage.removeItem('twoFactor');
    
    // Reset UI
    document.documentElement.setAttribute('data-theme', 'light');
    
    // Show home view
    showView('home');
    
    // Optional: Redirect to login page
    // window.location.href = '/login.html';
}

// Product Management
const views = {
    addProduct: document.querySelector('.add-product-view'),
    editProducts: document.querySelector('.edit-products-view'),
    manageStock: document.querySelector('.manage-stock-view')
};

const backButtons = document.querySelectorAll('.back-button');
backButtons.forEach(button => {
    button.addEventListener('click', () => {
        hideAllViews();
        showAdminDashboard();
    });
});

function hideAllViews() {
    Object.values(views).forEach(view => {
        view.classList.remove('active');
    });
}

function showView(viewName) {
    hideAllViews();
    hideAdminDashboard();
    views[viewName].classList.add('active');
}

// Add Product Form Handling
const addProductForm = document.getElementById('add-product-form');
addProductForm.addEventListener('submit', handleAddProduct);

function handleAddProduct(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value)
    };

    // Get existing products or initialize empty array
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    
    // Add new product
    products.push({
        id: Date.now(), // Simple way to generate unique ID
        ...formData
    });

    // Save back to localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Reset form and show success message
    addProductForm.reset();
    alert('Product added successfully!');
}

// Event listeners for admin buttons
document.getElementById('addProductBtn').addEventListener('click', () => showView('addProduct'));
document.getElementById('editProductsBtn').addEventListener('click', () => {
    showView('editProducts');
    loadProductsTable();
});
document.getElementById('manageStockBtn').addEventListener('click', () => {
    showView('manageStock');
    loadStockTable();
});

function loadProductsTable() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const tableContainer = document.querySelector('.products-table');
    
    if (products.length === 0) {
        tableContainer.innerHTML = '<p>No products found.</p>';
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${products.map(product => `
                <tr data-id="${product.id}">
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>${product.stock}</td>
                    <td>
                        <button class="edit-btn" onclick="editProduct(${product.id})">
                            <span class="material-icons">edit</span>
                        </button>
                        <button class="delete-btn" onclick="deleteProduct(${product.id})">
                            <span class="material-icons">delete</span>
                        </button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}

function loadStockTable() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const tableContainer = document.querySelector('.stock-table');
    
    if (products.length === 0) {
        tableContainer.innerHTML = '<p>No products found.</p>';
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Current Stock</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${products.map(product => `
                <tr data-id="${product.id}">
                    <td>${product.name}</td>
                    <td>${product.stock}</td>
                    <td>
                        <button class="stock-btn" onclick="adjustStock(${product.id}, 1)">
                            <span class="material-icons">add</span>
                        </button>
                        <button class="stock-btn" onclick="adjustStock(${product.id}, -1)">
                            <span class="material-icons">remove</span>
                        </button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}

function editProduct(productId) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // For now, we'll just use prompt/confirm dialogs
    const newName = prompt('Enter new name:', product.name);
    if (!newName) return;
    
    const newPrice = parseFloat(prompt('Enter new price:', product.price));
    if (isNaN(newPrice)) return;
    
    product.name = newName;
    product.price = newPrice;
    
    localStorage.setItem('products', JSON.stringify(products));
    loadProductsTable();
}

function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const updatedProducts = products.filter(p => p.id !== productId);
    
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    loadProductsTable();
}

function adjustStock(productId, change) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const newStock = product.stock + change;
    if (newStock < 0) {
        alert('Stock cannot be negative!');
        return;
    }
    
    product.stock = newStock;
    localStorage.setItem('products', JSON.stringify(products));
    loadStockTable();
}

// QR Scanner
let html5QrcodeScanner = null;

function initializeQRScanner() {
    const startButton = document.getElementById('start-scanner');
    const stopButton = document.getElementById('stop-scanner');
    const resultsContainer = document.getElementById('qr-reader-results');

    if (startButton && stopButton) {
        startButton.addEventListener('click', startScanner);
        stopButton.addEventListener('click', stopScanner);
    }

    function onScanSuccess(decodedText, decodedResult) {
        // Stop the scanner after successful scan
        stopScanner();
        
        // Display the result
        resultsContainer.innerHTML = `
            <div class="scan-result">
                <h3>QR Code Detected!</h3>
                <p>Content: ${decodedText}</p>
            </div>
        `;

        // Try to parse the QR code content as a product ID or URL
        try {
            // If it's a URL, you might want to extract the product ID from it
            const productId = decodedText.includes('product=') 
                ? decodedText.split('product=')[1] 
                : decodedText;

            // Look up the product in your products array
            const product = JSON.parse(localStorage.getItem('products') || '[]').find(p => p.id === productId);
            
            if (product) {
                resultsContainer.innerHTML += `
                    <div class="product-details">
                        <img src="${product.image}" alt="${product.name}">
                        <h4>${product.name}</h4>
                        <p class="price">$${product.price}</p>
                        <p>${product.description}</p>
                        <button class="add-to-cart" onclick="addToCart('${product.id}')">
                            Add to Cart
                        </button>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error processing QR code:', error);
        }
    }

    function onScanFailure(error) {
        // handle scan failure, usually better to ignore and keep scanning
        console.warn(`QR scan error: ${error}`);
    }

    function startScanner() {
        html5QrcodeScanner = new Html5QrcodeScanner(
            "qr-reader",
            { 
                fps: 10,
                qrbox: {width: 250, height: 250},
                aspectRatio: 1.0
            }
        );
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
        
        startButton.style.display = 'none';
        stopButton.style.display = 'flex';
        resultsContainer.innerHTML = '<p>Scanner is running...</p>';
    }

    function stopScanner() {
        if (html5QrcodeScanner) {
            html5QrcodeScanner.clear().catch(error => {
                console.error('Failed to clear scanner:', error);
            });
            html5QrcodeScanner = null;
        }
        
        startButton.style.display = 'flex';
        stopButton.style.display = 'none';
    }
}

// Tab Switching
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const viewName = tab.textContent.toLowerCase().replace(' view', '');
            showView(viewName);
        });
    });

    // Show home view by default
    showView('home');
});

// Simulate chart data (for demo purposes)
function updateChart() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        const randomHeight = Math.floor(Math.random() * 60) + 30; // Random height between 30% and 90%
        bar.style.height = `${randomHeight}%`;
    });
}

// Update chart periodically
setInterval(updateChart, 3000);
