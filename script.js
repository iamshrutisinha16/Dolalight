/* ==================== 1. SEARCH SYSTEM (Global) ==================== */
function searchMyWebsite() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase().trim();

    if (query === "") {
        alert("Please type something to search (e.g., Indoor, Smart).");
        return;
    }

    if (query.includes("indoor") || query.includes("room") || query.includes("living")) {
        window.location.href = "indoor.html";
    } else if (query.includes("outdoor") || query.includes("garden")) {
        window.location.href = "outdoor.html";
    } else if (query.includes("smart") || query.includes("wifi")) {
        window.location.href = "SmartHomeLighting.html";
    } else if (query.includes("parking") || query.includes("garage")) {
        window.location.href = "parking.html";
    } else if (query.includes("product") || query.includes("shop")) {
        window.location.href = "shop-by-product.html";
    } else if (query.includes("contact")) {
        window.location.href = "contact.html";
    } else if (query.includes("cart")) {
        window.location.href = "cart.html";
    } else {
        alert("Sorry! Item not found. Try searching for 'Indoor', 'Outdoor', 'Smart', etc.");
    }
}

// Enter Key Listener
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") searchMyWebsite();
        });
    }
});

/* ==================== 2. MOBILE MENU & UI ==================== */
function toggleMenu() {
    const navMenu = document.querySelector("nav ul");
    if (navMenu) navMenu.classList.toggle("show");
}

/* ==================== 3. ANIMATIONS (Unified) ==================== */
document.addEventListener("DOMContentLoaded", () => {
    // Combine all fade elements
    const fadeElements = document.querySelectorAll(".fade-up, .lux-product-row, .reveal, .diff-card, .team-card, .fade-item");
    
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active", "visible", "show");
                    // Don't unobserve if you want re-animation, but usually unobserve is better for performance
                }
            });
        }, { threshold: 0.15 });

        fadeElements.forEach(item => observer.observe(item));
    }
    
    // Icon Animation
    const icons = document.querySelectorAll(".dynamic-icon");
    if (icons.length) {
        setInterval(() => {
            icons.forEach(icon => {
                let list = icon.dataset.icons.split(",").map(i => i.trim());
                let index = parseInt(icon.dataset.index) || 0;
                icon.style.opacity = "0";
                setTimeout(() => {
                    list.forEach(cls => icon.classList.remove(cls));
                    let next = (index + 1) % list.length;
                    icon.classList.add(list[next]);
                    icon.dataset.index = next;
                    icon.style.opacity = "1";
                }, 250);
            });
        }, 2000);
    }
});

/* ==================== 4. CART SYSTEM (Core) ==================== */
// Load cart once
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Unified Add to Cart Function
function addToCart(product) {
    let existing = cart.find(p => p.id === product.id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart();
    
    // Show notification based on available toast system
    if(document.getElementById("lux-toast-box")) {
        luxAddToCartToast(product.name);
    } else if(document.getElementById("toast")) {
        // Fallback to old toast if exists
        const toast = document.getElementById('toast');
        const toastText = toast.querySelector('p');
        if(toastText) toastText.innerText = `${product.name} added!`;
        toast.classList.add('active');
        setTimeout(() => toast.classList.remove('active'), 3000);
    } else {
        alert(product.name + " added to cart!");
    }
    
    // Update Cart Count Badge if exists
    const cartCount = document.getElementById('cart-count');
    if(cartCount) cartCount.innerText = cart.length;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    // If we are on the cart page, reload the display
    if(document.getElementById("cartItems")) loadCart();
}

// Load Cart Display (Run only on Cart Page)
function loadCart() {
    const cartItemsDiv = document.getElementById("cartItems");
    const subtotalBox = document.getElementById("subtotal");
    const totalBox = document.getElementById("total");

    if (!cartItemsDiv) return; // Exit if not on cart page

    cartItemsDiv.innerHTML = "";
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<h3 style='text-align:center; padding: 20px;'>Your Cart is Empty</h3>";
        if (subtotalBox) subtotalBox.innerText = "₹0.00";
        if (totalBox) totalBox.innerText = "₹0.00";
        return;
    }

    let subtotal = 0;
    cart.forEach((item, index) => {
        subtotal += item.price * item.qty;
        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" class="cart-img" alt="${item.name}" onerror="this.src='https://via.placeholder.com/100'">
                <div class="details">
                    <h3>${item.name}</h3>
                    <p class="price">₹${item.price}</p>
                    <div class="qty-box">
                        <button onclick="changeQty(${index}, -1)" class="qty-btn">-</button>
                        <span class="qty">${item.qty}</span>
                        <button onclick="changeQty(${index}, 1)" class="qty-btn">+</button>
                    </div>
                </div>
                <button onclick="removeItem(${index})" class="remove-btn">Remove</button>
            </div>
        `;
    });

    if (subtotalBox) subtotalBox.innerText = "₹" + subtotal.toFixed(2);
    let shipping = 49;
    if (totalBox) totalBox.innerText = "₹" + (subtotal + shipping).toFixed(2);

    localStorage.setItem("orderSubtotal", subtotal.toFixed(2));
    localStorage.setItem("orderTotal", (subtotal + shipping).toFixed(2));
}

function changeQty(index, amount) {
    if (cart[index].qty + amount > 0) {
        cart[index].qty += amount;
        saveCart();
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
}

// Init Cart on load
document.addEventListener('DOMContentLoaded', loadCart);


/* ==================== 5. NEW LUXURY WALL LIGHTS LOGIC ==================== */

// Color Picker
function selectColor(element) {
    let parent = element.parentElement;
    if(!parent) return;
    let siblings = parent.getElementsByClassName('lux-color-circle');
    for (let i = 0; i < siblings.length; i++) {
        siblings[i].classList.remove('selected');
    }
    element.classList.add('selected');
}

// Wrapper for Luxury Page Add to Cart
function luxAddToCart(itemName) {
    // In a real app, you would pass real price/image. 
    // Creating a placeholder object for now to work with the main cart system.
    const product = {
        id: 'lux-' + itemName.replace(/\s+/g, '-').toLowerCase(),
        name: itemName,
        price: 3499, 
        image: 'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?q=80&w=200'
    };
    addToCart(product);
}

// Helper for Luxury Toast
function luxAddToCartToast(itemName) {
    const toast = document.getElementById('lux-toast-box');
    const msg = document.getElementById('lux-toast-msg');
    if(toast && msg) {
        msg.innerText = `"${itemName}" added to cart.`;
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3500);
    }
}

/* ==================== 6. BULB PAGE LOGIC ==================== */
const bulbData = [
    { id: 101, name: "9W Cool Day Light LED", watt: "9 Watt", type: "standard", base: "B22", color: "6500K", price: 99, image: "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&w=500&q=80" },
    { id: 102, name: "12W Warm White LED", watt: "12 Watt", type: "standard", base: "E27", color: "3000K", price: 149, image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=500&q=80" },
    { id: 103, name: "Smart Wi-Fi RGB Bulb", watt: "10 Watt", type: "smart", base: "B22", color: "16M Colors", price: 699, image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=500&q=80" },
    { id: 104, name: "Inverter Emergency Bulb", watt: "9 Watt", type: "inverter", base: "B22", color: "White", price: 349, image: "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&w=500&q=80" },
    { id: 105, name: "Vintage Filament Edison", watt: "4 Watt", type: "filament", base: "E27", color: "Golden", price: 299, image: "https://images.unsplash.com/photo-1507646227500-4d389b0012be?auto=format&fit=crop&w=500&q=80" },
    { id: 106, name: "High Power Hammer LED", watt: "40 Watt", type: "standard", base: "B22", color: "6500K", price: 450, image: "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&w=500&q=80" },
    { id: 107, name: "Music Sync Smart Bulb", watt: "12 Watt", type: "smart", base: "E27", color: "RGB + Music", price: 850, image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=500&q=80" },
    { id: 108, name: "Candle Filament Bulb", watt: "4 Watt", type: "filament", base: "E14", color: "Warm", price: 210, image: "https://images.unsplash.com/photo-1540932296774-7097c27d42df?auto=format&fit=crop&w=500&q=80" }
];

function renderBulbs(items) {
    const grid = document.getElementById('bulbGrid');
    if(!grid) return; // SAFE CHECK

    grid.innerHTML = "";
    items.forEach(bulb => {
        const card = `
            <div class="bulb-card fade-up">
                <div class="bulb-img-box">
                    <span class="watt-badge">${bulb.watt}</span>
                    <span class="type-badge">${bulb.base}</span>
                    <img src="${bulb.image}" alt="${bulb.name}">
                </div>
                <div class="bulb-details">
                    <h3>${bulb.name}</h3>
                    <span class="tech-specs">Color: ${bulb.color} | Base: ${bulb.base}</span>
                    <div class="price-row">
                        <span class="price">₹${bulb.price}</span>
                        <div class="add-cart-icon" onclick="addToCart({id: '${bulb.id}', name: '${bulb.name}', price: ${bulb.price}, image: '${bulb.image}'})">Add to cart</div>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

function filterBulbs(category) {
    if(!document.getElementById('bulbGrid')) return;
    
    // UI Update
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if(event && event.target) event.target.classList.add('active');

    if (category === 'all') {
        renderBulbs(bulbData);
    } else {
        const filtered = bulbData.filter(item => item.type === category);
        renderBulbs(filtered);
    }
}

// Init Bulbs
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('bulbGrid')) renderBulbs(bulbData);
});


/* ==================== 7. CEILING LIGHTS LOGIC ==================== */
const ceilingProducts = [
    { id: "c1", name: "15W Slim Panel Light", category: "panel", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=500", watts: ["8W", "15W"], shapes: ["circle", "square"], price: 450, mrp: 850, warranty: "2 Years" },
    { id: "c2", name: "Adjustable Panel (Rimless)", category: "panel", image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=500", watts: ["12W"], shapes: ["circle"], price: 599, mrp: 1200, warranty: "2 Years" },
    { id: "c3", name: "7W COB Spotlight", category: "cob", image: "https://plus.unsplash.com/premium_photo-1678297270385-ad50621b6d58?q=80&w=500", watts: ["7W"], shapes: ["circle"], price: 850, mrp: 1500, warranty: "3 Years" },
    { id: "c5", name: "Black Cylinder Surface", category: "surface", image: "https://images.unsplash.com/photo-1540932296774-7097c27d42df?q=80&w=500", watts: ["10W"], shapes: ["circle"], price: 990, mrp: 1800, warranty: "2 Years" }
];

function renderCeilingLights(data) {
    const grid = document.getElementById('ceilingGrid');
    if(!grid) return; // SAFE CHECK

    grid.innerHTML = "";
    data.forEach(item => {
        let wattOps = item.watts.map(w => `<option>${w}</option>`).join('');
        const card = `
            <div class="ceiling-card fade-up">
                <span class="warranty-badge"><i class="fa-solid fa-shield"></i> ${item.warranty}</span>
                <div class="img-box"><img src="${item.image}" alt="${item.name}"></div>
                <div class="card-body">
                    <span class="c-cat">${item.category} Series</span>
                    <h3 class="c-title">${item.name}</h3>
                    <div class="config-row">
                        <div class="config-group"><label>Wattage</label><select class="watt-select">${wattOps}</select></div>
                    </div>
                    <div class="card-foot">
                        <div class="price"><h4>₹${item.price}</h4><small>₹${item.mrp}</small></div>
                        <button class="add-btn" onclick="addToCart({id: '${item.id}', name: '${item.name}', price: ${item.price}, image: '${item.image}'})"><i class="fa-solid fa-plus"></i> Add</button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}
// Init Ceiling
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('ceilingGrid')) renderCeilingLights(ceilingProducts);
});


/* ==================== 8. GENERAL PRODUCTS (Shop Page) ==================== */
const products = [
    { id: 1, name: "Royal Crystal Chandelier", category: "Luxury", price: 15999, image: "assets/cellinglights.avif" },
    { id: 2, name: "Nordic Minimalist Pendant", category: "Modern", price: 4500, image: "assets/NordicMinimalistPendant.jpg" },
    { id: 3, name: "Industrial Cage Lamp", category: "Vintage", price: 2800, image: "assets/IndustrialCageLamp.jpg" },
    { id: 4, name: "Golden Sphere Flush", category: "Premium", price: 8900, image: "assets/GoldenSphereFlush.jpg" },
    { id: 5, name: "Geometric LED Light", category: "Tech", price: 6500, image: "assets/GeometricLEDLight.avif" },
    { id: 6, name: "Boho Rattan Weave", category: "Artistic", price: 3200, image: "assets/BohoRattanWeave.jpg" }
];

function initProducts() {
    const productContainer = document.getElementById('product-list');
    if(!productContainer) return; // SAFE CHECK

    let output = '';
    products.forEach(prod => {
        output += `
            <div class="product-card fade-up">
                <div class="p-image">
                    <img src="${prod.image}" alt="${prod.name}" onerror="this.src='https://via.placeholder.com/200'">
                    <button class="overlay-btn" onclick="addToCart({id: ${prod.id}, name: '${prod.name}', price: ${prod.price}, image: '${prod.image}'})"><i class="fa-solid fa-cart-plus"></i></button>
                </div>
                <div class="p-details">
                    <div>
                        <div class="p-cat">${prod.category}</div>
                        <h3 class="p-title">${prod.name}</h3>
                        <div class="p-price">₹${prod.price.toLocaleString()}</div>
                    </div>
                    <button class="full-add-btn" onclick="addToCart({id: ${prod.id}, name: '${prod.name}', price: ${prod.price}, image: '${prod.image}'})">Add to Cart</button>
                </div>
            </div>
        `;
    });
    productContainer.innerHTML = output;
}
// Init General Products
document.addEventListener('DOMContentLoaded', initProducts);


/* ==================== 9. CHECKOUT & MISC ==================== */
// Checkout Render
document.addEventListener("DOMContentLoaded", () => {
    const checkoutItemsDiv = document.getElementById("checkoutItems");
    if (checkoutItemsDiv) {
        const checkoutCart = JSON.parse(localStorage.getItem("cart")) || [];
        checkoutItemsDiv.innerHTML = "";
        
        checkoutCart.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("chk-item");
            div.innerHTML = `
                <div style="display:flex; align-items:center; gap:10px; border-bottom:1px solid #eee; padding:5px 0;">
                    <img src="${item.image}" width="50">
                    <div><p style="margin:0; font-weight:600;">${item.name}</p><small>x${item.qty}</small></div>
                    <span style="margin-left:auto;">₹${item.price * item.qty}</span>
                </div>
            `;
            checkoutItemsDiv.appendChild(div);
        });

        const chkSub = document.getElementById("chkSubtotal");
        const chkTot = document.getElementById("chkTotal");
        if(chkSub) chkSub.innerText = "₹" + (localStorage.getItem("orderSubtotal") || "0");
        if(chkTot) chkTot.innerText = "₹" + (localStorage.getItem("orderTotal") || "0");
    }

    // Place Order Btn
    const placeOrderBtn = document.getElementById("placeOrderBtn");
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener("click", () => {
            if (!document.getElementById("name").value) { alert("Please fill details!"); return; }
            localStorage.removeItem("cart");
            alert("Order placed successfully!");
            window.location.href = "index.html";
        });
    }
});

// FAQ Accordion
document.querySelectorAll(".faq-item").forEach(faq => {
    const question = faq.querySelector(".faq-question");
    if (question) {
        question.addEventListener("click", () => {
            faq.classList.toggle("active");
        });
    }
});

// Outdoor Observer
const outdoorContent = document.querySelector('.outdoor-content');
const outdoorImage = document.querySelector('.outdoor-image-wrapper');
const outdoorTrigger = document.querySelector('#outdoorTrigger');
if (outdoorTrigger && outdoorContent && outdoorImage) {
    const outdoorObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                outdoorContent.classList.add('active');
                outdoorImage.classList.add('active');
                outdoorObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    outdoorObserver.observe(outdoorTrigger);
}

// Year update
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Demo Room
function setScene(name) {
    const light = document.getElementById('demoLight');
    if (!light) return;
    light.style.transition = 'all .5s cubic-bezier(.2,.9,.3,1)';
    if (name === 'Warm Relax') {
        light.style.opacity = '1';
        light.style.background = 'radial-gradient(circle at 30% 30%, rgba(230,194,122,0.98), rgba(182,139,58,0.75) 40%, rgba(182,139,58,0.05) 70%)';
    } else if (name === 'Cool Focus') {
        light.style.opacity = '1';
        light.style.background = 'radial-gradient(circle at 30% 30%, rgba(200,230,255,0.98), rgba(130,170,230,0.75) 40%, rgba(130,170,230,0.04) 70%)';
    } else if (name === 'Party') {
        light.style.opacity = '1';
        light.style.background = 'conic-gradient(from 0deg, #ff5f6d, #ffc371, #9be15d, #00c9ff, #9be15d)';
    }
}
document.querySelectorAll('[data-scene]').forEach(btn => {
    btn.addEventListener('click', () => setScene(btn.getAttribute('data-scene')));
});

    // Animation Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-show');
            }
        });
    }, { threshold: 0.1 });

    // Target elements
    const hiddenElements = document.querySelectorAll('.scroll-hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Simple Text Reveal on Load
    window.onload = () => {
        const texts = document.querySelectorAll('.reveal-text');
        texts.forEach((text, index) => {
            setTimeout(() => {
                text.style.opacity = '1';
                text.style.transform = 'translateY(0)';
            }, index * 200);
        });
    };

document.addEventListener('DOMContentLoaded', () => {
    
    const addToCartBtns = document.querySelectorAll('.cart-btn, .buy-btn, .add-btn');
    let cartCountElement = document.querySelector('.cart-count'); 

    let cart = JSON.parse(localStorage.getItem('myDecorCart')) || [];

    updateCartUI();

    // --- 3. Add to Cart Logic ---
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Button ka parent card dhundo
            const card = e.target.closest('.prod-card') || e.target.closest('.glass-card') || e.target.closest('.light-card');
            
            if (card) {
                // Product ki details nikalo
                const title = card.querySelector('h3, h4').innerText;
                const price = card.querySelector('.price').innerText;
                const imageSrc = card.querySelector('img').src;

                // Product object banao
                const product = {
                    title: title,
                    price: price,
                    image: imageSrc,
                    id: Date.now() // Unique ID
                };

                // Cart array me add karo
                cart.push(product);

                // LocalStorage me save karo
                localStorage.setItem('myDecorCart', JSON.stringify(cart));

                // UI update karo
                updateCartUI();
                
                // Notification dikhao
                showToast(product);

                const originalText = e.target.innerText;
                e.target.innerText = "Added ✔";
                e.target.style.background = "#d4af37";
                e.target.style.color = "#fff";
                
                setTimeout(() => {
                    e.target.innerText = originalText;
                    e.target.style.background = ""; 
                    e.target.style.color = "";
                }, 2000);
            }
        });
    });

    function updateCartUI() {
        if (cartCountElement) {
            cartCountElement.innerText = cart.length;
            if(cart.length > 0) {
                cartCountElement.style.display = 'inline-block';
            }
        }
    }

    function showToast(product) {
      
        const existingToast = document.querySelector('.toast-box');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.classList.add('toast-box');
        toast.innerHTML = `
            <img src="${product.image}" alt="img">
            <div>
                <h5 style="margin:0; font-size:0.9rem;">Added to Cart</h5>
                <p style="margin:0; font-size:0.8rem; color:#ccc;">${product.title}</p>
            </div>
        `;

        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400); 
        }, 3000);
    }

    const observerOptions = {
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-anim');
                scrollObserver.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Target Elements
    const animatedElements = document.querySelectorAll('.room-card, .feature-box');
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .room-card, .feature-box {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        .active-anim {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleSheet);

    animatedElements.forEach(el => scrollObserver.observe(el));

});