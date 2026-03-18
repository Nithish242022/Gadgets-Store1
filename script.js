// Product Data
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        category: "mobile",
        price: 1199.00,
        image: "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Samsung S24 Ultra",
        category: "mobile",
        price: 1299.00,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Apple Watch Ultra 2",
        category: "watch",
        price: 799.00,
        image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Sony WH-1000XM5",
        category: "headset",
        price: 398.00,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "AirPods Max",
        category: "headset",
        price: 549.00,
        image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Galaxy Watch 6",
        category: "watch",
        price: 299.00,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 7,
        name: "Google Pixel 8 Pro",
        category: "mobile",
        price: 999.00,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351cb315?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 8,
        name: "Bose QC Ultra",
        category: "headset",
        price: 429.00,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 9,
        name: "OnePlus 12",
        category: "mobile",
        price: 799.00,
        image: "https://images.unsplash.com/photo-1603184017968-953f5d5da506?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 10,
        name: "Garmin Fenix 7 Pro",
        category: "watch",
        price: 899.00,
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 11,
        name: "Sennheiser Momentum 4",
        category: "headset",
        price: 349.00,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 12,
        name: "Nothing Phone (2)",
        category: "mobile",
        price: 599.00,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop"
    }
];

// State
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartModal = document.getElementById('cart-modal');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalPriceEl = document.getElementById('total-price');

// Initialize
function init() {
    renderProducts(products);
    setupEventListeners();
}

// Render Products
function renderProducts(productsToRender) {
    if (!productsGrid) return;
    productsGrid.innerHTML = '';

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <div class="img-container">
                <img src="${product.image}" alt="${product.name}" class="product-img">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;

        productsGrid.appendChild(productCard);
    });
}

// Filter Products
function filterProducts(category) {
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(product => product.category === category);
        renderProducts(filtered);
    }
}

// Cart Functionality
window.addToCart = function (productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();

    if (cartBtn) {
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 200);
    }
};

window.removeFromCart = function (productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
};

window.changeQuantity = function (productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            window.removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
};

function updateCartUI() {
    if (!cartCount || !cartItemsContainer || !totalPriceEl) return;

    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update items HTML
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color:#8b949e; margin-top: 20px;">Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const cartItemEl = document.createElement('div');
            cartItemEl.classList.add('cart-item');

            cartItemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;

            cartItemsContainer.appendChild(cartItemEl);
        });
    }

    // Update total price
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceEl.textContent = `$${total.toFixed(2)}`;
}

function toggleCart() {
    if (cartModal && cartOverlay) {
        cartModal.classList.toggle('active');
        cartOverlay.classList.toggle('active');
    }
}

// Event Listeners
function setupEventListeners() {
    // Filtering
    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                const category = e.target.getAttribute('data-filter');
                filterProducts(category);
            });
        });
    }

    // Cart modal toggles
    if (cartBtn) cartBtn.addEventListener('click', toggleCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
    if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.padding = '1rem 5%';
                navbar.style.background = 'rgba(13, 17, 23, 0.95)';
            } else {
                navbar.style.padding = '1.5rem 5%';
                navbar.style.background = 'rgba(13, 17, 23, 0.8)';
            }
        }
    });
}

// Run the app
document.addEventListener('DOMContentLoaded', init);
