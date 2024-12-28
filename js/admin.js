// Admin Dashboard Functions
document.addEventListener('DOMContentLoaded', () => {
    initializeAdmin();
});

function initializeAdmin() {
    // Update stats
    updateStats();
    
    // Show products section by default
    showAdminSection('products');
    
    // Load initial products
    loadProducts();
}

function updateStats() {
    document.getElementById('totalProducts').textContent = '15';
    document.getElementById('totalOrders').textContent = '8';
    document.getElementById('lowStockItems').textContent = '3';
}

function showAdminSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    const selectedSection = document.getElementById(`${sectionId}-section`);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

function loadProducts() {
    const products = [
        { name: 'Orange Juice', category: 'Beverages', price: '$4.99', stock: 50 },
        { name: 'Whole Wheat Bread', category: 'Bakery', price: '$3.99', stock: 30 },
        { name: 'Fresh Milk', category: 'Dairy', price: '$2.99', stock: 40 },
        { name: 'Red Apples', category: 'Fruits', price: '$1.99', stock: 100 }
    ];

    const tbody = document.getElementById('productsTableBody');
    if (tbody) {
        tbody.innerHTML = products.map(product => `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editProduct('${product.name}')">
                        <span class="material-icons-outlined">edit</span>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteProduct('${product.name}')">
                        <span class="material-icons-outlined">delete</span>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

function showAddProductForm() {
    alert('Add Product form will be implemented soon!');
}

function editProduct(name) {
    alert(`Edit product: ${name}`);
}

function deleteProduct(name) {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
        alert(`Deleted product: ${name}`);
        loadProducts(); // Reload the table
    }
}
