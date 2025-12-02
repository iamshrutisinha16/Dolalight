
function searchMyWebsite() {
    const searchInput = document.getElementById("searchInput");
    
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase().trim();

    if (query === "") {
        alert("Please type something to search (e.g., Indoor, Smart).");
        return;
    }

    // --- Search Logic ---
    if (query.includes("indoor") || query.includes("room") || query.includes("living") || query.includes("bedroom")) {
        window.location.href = "indoor.html";
    } 
    else if (query.includes("outdoor") || query.includes("garden") || query.includes("street")) {
        window.location.href = "outdoor.html";
    } 
    else if (query.includes("smart") || query.includes("wifi") || query.includes("alexa") || query.includes("google")) {
        window.location.href = "SmartHomeLighting.html";
    } 
    else if (query.includes("parking") || query.includes("garage")) {
        window.location.href = "parking.html";
    } 
    else if (query.includes("product") || query.includes("shop") || query.includes("buy")) {
        window.location.href = "shop-by-product.html";
    }
    else if (query.includes("contact") || query.includes("call") || query.includes("phone")) {
        window.location.href = "contact.html";
    }
    else if (query.includes("cart") || query.includes("bag")) {
        window.location.href = "cart.html";
    }
    else {
        alert("Sorry! Item not found. Try searching for 'Indoor', 'Outdoor', 'Smart', etc.");
    }
}

// 'Enter' Button Listener - Taaki Enter dabane par bhi search ho
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                searchMyWebsite();
            }
        });
    }
});


/* ==================== MOBILE MENU ==================== */
function toggleMenu() {
    const navMenu = document.querySelector("nav ul");
    if (navMenu) navMenu.classList.toggle("show");
}

/* ==================== BRAND LOGO SLIDER ==================== */
const logoTrack = document.querySelector(".logo-track");
if (logoTrack) {
    logoTrack.innerHTML += logoTrack.innerHTML;
}

/* ==================== FADE-UP ANIMATIONS ==================== */
document.addEventListener("DOMContentLoaded", () => {
    const fadeUpItems = document.querySelectorAll(".fade-up");

    if (fadeUpItems.length > 0) {
        const fadeUpObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    fadeUpObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        fadeUpItems.forEach(item => fadeUpObserver.observe(item));
    }
});

/* ==================== REVIEW SLIDER ==================== */
const cards = document.querySelectorAll(".review-card");
const dots = document.querySelectorAll(".dot");

if (cards.length && dots.length && cards.length === dots.length) {
    let index = 0;

    function showReview(i) {
        cards.forEach(card => card.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        cards[i].classList.add("active");
        dots[i].classList.add("active");
    }

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            index = i;
            showReview(index);
        });
    });

    setInterval(() => {
        index = (index + 1) % cards.length;
        showReview(index);
    }, 3000);

    showReview(0);
}

/* ==================== GENERIC SCROLL REVEAL ==================== */
const revealElements = document.querySelectorAll(
    ".reveal, .diff-card, .team-card, .fade-item, .fade-box, .product-card, .fade-left, .fade-right, [data-reveal]"
);

window.addEventListener("scroll", () => {
    revealElements.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;

        if (revealTop < windowHeight - 150) {
            el.classList.add("active", "show");
        }
    });
});

/* ==================== FAQ ==================== */
document.querySelectorAll(".faq-item").forEach(faq => {
    const question = faq.querySelector(".faq-question");
    if (question) {
        question.addEventListener("click", () => {
            faq.classList.toggle("active");
        });
    }
});

/* ==================== SCROLL TO SHOP BUTTON ==================== */
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", () => {
        const target = document.querySelector(".shop-section");
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: "smooth"
            });
        }
    });
});

/* ==================== ICON ANIMATION ==================== */
document.addEventListener("DOMContentLoaded", function () {
    const icons = document.querySelectorAll(".dynamic-icon");

    if (!icons.length) return;

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
});

/* ==================== OUTDOOR PAGE OBSERVER ==================== */
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

/* ==================== SCENARIO TRACK HOVER PAUSE ==================== */
const scenarioTrack2 = document.querySelector(".scenario-track");
if (scenarioTrack2) {
    scenarioTrack2.addEventListener("mouseover", () => {
        scenarioTrack2.style.animationPlayState = "paused";
    });
    scenarioTrack2.addEventListener("mouseout", () => {
        scenarioTrack2.style.animationPlayState = "running";
    });
}

/* ==================== YEAR ==================== */
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

/* ==================== PREVIEW TOAST ==================== */
document.querySelectorAll('[data-preview]').forEach(btn => {
    btn.addEventListener('click', () => {
        previewToast(btn.getAttribute('data-preview') + " — Preview Activated");
    });
});

function previewToast(text) {
    const toast = document.createElement('div');
    toast.className = 'preview-toast';
    toast.textContent = text;

    document.body.appendChild(toast);

    toast.animate([
        { opacity: 0, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-8px)' }
    ], { duration: 2000 });

    setTimeout(() => toast.remove(), 2200);
}

/* ==================== DEMO ROOM LIGHT SYSTEM ==================== */
document.querySelectorAll('[data-scene]').forEach(btn => {
    btn.addEventListener('click', () => {
        setScene(btn.getAttribute('data-scene'));
    });
});

function setScene(name) {
    const light = document.getElementById('demoLight');
    if (!light) return;

    light.style.transition = 'all .5s cubic-bezier(.2,.9,.3,1)';

    if (name === 'Warm Relax') {
        light.style.opacity = '1';
        light.style.background =
            'radial-gradient(circle at 30% 30%, rgba(230,194,122,0.98), rgba(182,139,58,0.75) 40%, rgba(182,139,58,0.05) 70%)';
    }
    else if (name === 'Cool Focus') {
        light.style.opacity = '1';
        light.style.background =
            'radial-gradient(circle at 30% 30%, rgba(200,230,255,0.98), rgba(130,170,230,0.75) 40%, rgba(130,170,230,0.04) 70%)';
    }
    else if (name === 'Party') {
        light.style.opacity = '1';
        light.style.background =
            'conic-gradient(from 0deg, #ff5f6d, #ffc371, #9be15d, #00c9ff, #9be15d)';
        light.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.06)' }, { transform: 'scale(1)' }],
            { duration: 900, iterations: 3 });
    }
}

/* ==================== CART SYSTEM ==================== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {
    let existing = cart.find(p => p.id === product.id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveCart();
    alert(product.name + " added to cart!");
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

const cartItemsDiv = document.getElementById("cartItems");
const subtotalBox = document.getElementById("subtotal");
const totalBox = document.getElementById("total");

function loadCart() {
    if (!cartItemsDiv) return;

    cartItemsDiv.innerHTML = "";

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<h3 style='text-align:center; padding: 20px;'>Your Cart is Empty</h3>";
        if (subtotalBox) subtotalBox.innerText = "₹0.00";
        if (totalBox) totalBox.innerText = "₹0.00";
        return;
    }

    cart.forEach((item, index) => {
        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" class="cart-img" alt="${item.name}">
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

    calculateTotals();
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

function calculateTotals() {
    if (!subtotalBox || !totalBox) return;

    let subtotal = 0;
    cart.forEach(item => subtotal += item.price * item.qty);
    let shipping = cart.length ? 49 : 0;
    let total = subtotal + shipping;

    subtotalBox.innerText = "₹" + subtotal.toFixed(2);
    totalBox.innerText = "₹" + total.toFixed(2);

    localStorage.setItem("orderSubtotal", subtotal.toFixed(2));
    localStorage.setItem("orderTotal", total.toFixed(2));
}

loadCart();

document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const product = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: Number(btn.dataset.price),
            image: btn.dataset.image
        };
        addToCart(product);
    });
});

/* ==================== CHECKOUT PAGE ==================== */
const checkoutItemsDiv = document.getElementById("checkoutItems");

if (checkoutItemsDiv) {
    const checkoutCart = JSON.parse(localStorage.getItem("cart")) || [];

    checkoutCart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("chk-item");

        div.innerHTML = `
            <img src="${item.image}" width="60">
            <p>${item.name} (x${item.qty})</p>
            <span>₹${item.price * item.qty}</span>
        `;

        checkoutItemsDiv.appendChild(div);
    });

    document.getElementById("chkSubtotal").innerText = "₹" + localStorage.getItem("orderSubtotal");
    document.getElementById("chkTotal").innerText = "₹" + localStorage.getItem("orderTotal");
}

// Place Order Button
const placeOrderBtn = document.getElementById("placeOrderBtn");
if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", () => {
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;

        if (!name || !phone || !address) {
            alert("Please fill all details!");
            return;
        }

        localStorage.removeItem("cart");
        alert("Your order has been placed successfully!");
        window.location.href = "index.html";
    });
}

// REALISTIC LED BULB DATA
const bulbData = [
    {
        id: 101,
        name: "9W Cool Day Light LED",
        watt: "9 Watt",
        type: "standard",
        base: "B22",
        color: "6500K",
        price: "₹99",
        image: "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 102,
        name: "12W Warm White LED",
        watt: "12 Watt",
        type: "standard",
        base: "E27",
        color: "3000K",
        price: "₹149",
        image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=500&q=80" // Warm look
    },
    {
        id: 103,
        name: "Smart Wi-Fi RGB Bulb",
        watt: "10 Watt",
        type: "smart",
        base: "B22",
        color: "16M Colors",
        price: "₹699",
        image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 104,
        name: "Inverter Emergency Bulb",
        watt: "9 Watt",
        type: "inverter",
        base: "B22",
        color: "White",
        price: "₹349",
        image: "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 105,
        name: "Vintage Filament Edison",
        watt: "4 Watt",
        type: "filament",
        base: "E27",
        color: "Golden",
        price: "₹299",
        image: "https://images.unsplash.com/photo-1507646227500-4d389b0012be?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 106,
        name: "High Power Hammer LED",
        watt: "40 Watt",
        type: "standard",
        base: "B22",
        color: "6500K",
        price: "₹450",
        image: "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 107,
        name: "Music Sync Smart Bulb",
        watt: "12 Watt",
        type: "smart",
        base: "E27",
        color: "RGB + Music",
        price: "₹850",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 108,
        name: "Candle Filament Bulb",
        watt: "4 Watt",
        type: "filament",
        base: "E14",
        color: "Warm",
        price: "₹210",
        image: "https://images.unsplash.com/photo-1540932296774-7097c27d42df?auto=format&fit=crop&w=500&q=80"
    }
];

// Display Function
function renderBulbs(items) {
    const grid = document.getElementById('bulbGrid');
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
                        <span class="price">${bulb.price}</span>
                        <div class="add-cart-icon">Add to cart</i></div>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

// Filter Function
function filterBulbs(category) {
    // Button Active Logic
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'all') {
        renderBulbs(bulbData);
    } else {
        const filtered = bulbData.filter(item => item.type === category);
        renderBulbs(filtered);
    }
}

// Smooth Scroll
function scrollToGrid() {
    document.getElementById('bulbShop').scrollIntoView({behavior: 'smooth'});
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    renderBulbs(bulbData);
});

// ================= CEILING LIGHTS DATA =================
const ceilingProducts = [
    // --- PANELS (Recessed) ---
    {
        id: "c1",
        name: "15W Slim Panel Light",
        category: "panel",
        image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=500", // Generic lighting img
        watts: ["8W", "15W", "22W"],
        shapes: ["circle", "square"],
        price: 450,
        mrp: 850,
        cutout: "100mm",
        warranty: "2 Years"
    },
    {
        id: "c2",
        name: "Adjustable Panel (Rimless)",
        category: "panel",
        image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=500",
        watts: ["12W", "20W"],
        shapes: ["circle"],
        price: 599,
        mrp: 1200,
        cutout: "Adjustable",
        warranty: "2 Years"
    },

    // --- COB (Spotlights) ---
    {
        id: "c3",
        name: "7W COB Spotlight (Tiltable)",
        category: "cob",
        image: "https://plus.unsplash.com/premium_photo-1678297270385-ad50621b6d58?q=80&w=500",
        watts: ["7W", "12W"],
        shapes: ["circle"],
        price: 850,
        mrp: 1500,
        cutout: "75mm",
        warranty: "3 Years"
    },
    {
        id: "c4",
        name: "Deep Series Anti-Glare COB",
        category: "cob",
        image: "https://images.unsplash.com/photo-1513506003013-08061e80816b?q=80&w=500",
        watts: ["15W"],
        shapes: ["circle", "square"],
        price: 1200,
        mrp: 2200,
        cutout: "90mm",
        warranty: "5 Years"
    },

    // --- SURFACE (Cylinders) ---
    {
        id: "c5",
        name: "Black Cylinder Surface Light",
        category: "surface",
        image: "https://images.unsplash.com/photo-1540932296774-7097c27d42df?q=80&w=500",
        watts: ["10W", "20W"],
        shapes: ["circle"],
        price: 990,
        mrp: 1800,
        cutout: "Surface Mount",
        warranty: "2 Years"
    },
    
    // --- PROFILE (Linear) ---
    {
        id: "c6",
        name: "2M Magnetic Track Light",
        category: "profile",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=500",
        watts: ["24W"],
        shapes: ["square"],
        price: 2500,
        mrp: 4500,
        cutout: "Track System",
        warranty: "3 Years"
    }
];

// ================= RENDER LOGIC =================
function renderCeilingLights(data) {
    const grid = document.getElementById('ceilingGrid');
    grid.innerHTML = ""; // Clear existing

    data.forEach(item => {
        // Wattage Options
        let wattOps = item.watts.map(w => `<option>${w}</option>`).join('');
        
        // Shape Icons Logic
        let shapeHTML = '';
        if(item.shapes.includes('circle')) shapeHTML += '<i class="fa-solid fa-circle selected"></i>';
        if(item.shapes.includes('square')) shapeHTML += '<i class="fa-solid fa-square"></i>';

        const card = `
            <div class="ceiling-card fade-in-up">
                <span class="warranty-badge"><i class="fa-solid fa-shield"></i> ${item.warranty}</span>
                <div class="img-box">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="card-body">
                    <span class="c-cat">${item.category} Series</span>
                    <h3 class="c-title">${item.name}</h3>
                    
                    <div class="config-row">
                        <div class="config-group">
                            <label>Wattage</label>
                            <select class="watt-select">${wattOps}</select>
                        </div>
                        <div class="config-group">
                            <label>Shape</label>
                            <div class="shape-icons">
                                ${shapeHTML}
                            </div>
                        </div>
                    </div>

                    <div class="card-foot">
                        <div class="price">
                            <h4>₹${item.price}</h4>
                            <small>₹${item.mrp}</small>
                        </div>
                        <button class="add-btn" onclick="addToCartCeiling('${item.name}')">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

// Product Data Array
        const products = [
            {
                id: 1,
                name: "Royal Crystal Chandelier",
                category: "Luxury",
                price: 15999,
                image: "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?q=80&w=600&auto=format&fit=crop"
            },
            {
                id: 2,
                name: "Nordic Minimalist Pendant",
                category: "Modern",
                price: 4500,
                image: "https://images.unsplash.com/photo-1565814329-27bf6468a129?q=80&w=600&auto=format&fit=crop"
            },
            {
                id: 3,
                name: "Industrial Cage Lamp",
                category: "Vintage",
                price: 2800,
                image: "https://images.unsplash.com/photo-1540932296774-74d421319242?q=80&w=600&auto=format&fit=crop"
            },
            {
                id: 4,
                name: "Golden Sphere Flush",
                category: "Premium",
                price: 8900,
                image: "https://images.unsplash.com/photo-1550920427-4638d27a4253?q=80&w=600&auto=format&fit=crop"
            },
            {
                id: 5,
                name: "Geometric LED Light",
                category: "Tech",
                price: 6500,
                image: "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?q=80&w=600&auto=format&fit=crop"
            },
            {
                id: 6,
                name: "Boho Rattan Weave",
                category: "Artistic",
                price: 3200,
                image: "https://plus.unsplash.com/premium_photo-1670359036329-873d6eb65553?q=80&w=600&auto=format&fit=crop"
            },
            {
                id: 7,
                name: "Matte Black Cluster",
                category: "Modern",
                price: 5600,
                image: "https://images.unsplash.com/photo-1540932296774-74d421319242?q=80&w=600&auto=format&fit=crop"
            },
            {
                id: 8,
                name: "Glass Globe Duo",
                category: "Luxury",
                price: 9200,
                image: "https://images.unsplash.com/photo-1513506003013-194a5d68d8ed?q=80&w=600&auto=format&fit=crop"
            }
        ];

        let cartItemCount = 0;

        // Render Products
        const productContainer = document.getElementById('product-list');

        function initProducts() {
            let output = '';
            products.forEach(prod => {
                output += `
                    <div class="product-card">
                        <div class="p-image">
                            <img src="${prod.image}" alt="${prod.name}">
                            <!-- Floating Button on Image -->
                            <button class="overlay-btn" onclick="addToCart('${prod.name}')">
                                <i class="fa-solid fa-cart-plus"></i>
                            </button>
                        </div>
                        <div class="p-details">
                            <div>
                                <div class="p-cat">${prod.category}</div>
                                <h3 class="p-title">${prod.name}</h3>
                                <div class="p-price">₹${prod.price.toLocaleString()}</div>
                            </div>
                            <!-- Full Width Button Below -->
                            <button class="full-add-btn" onclick="addToCart('${prod.name}')">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                `;
            });
            productContainer.innerHTML = output;
        }

        // Add to Cart Logic
        function addToCart(name) {
            // Update Count
            cartItemCount++;
            document.getElementById('cart-count').innerText = cartItemCount;

            // Show Toast
            const toast = document.getElementById('toast');
            const toastText = toast.querySelector('p');
            toastText.innerText = `${name} added successfully!`;
            
            toast.classList.add('active');

            // Hide Toast after 3 seconds
            setTimeout(() => {
                toast.classList.remove('active');
            }, 3000);
        }

        // Initialize
        initProducts();
