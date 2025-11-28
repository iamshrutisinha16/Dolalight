/* ==================== SEARCH SYSTEM (NEW ADDED) ==================== */
function searchMyWebsite() {
    // Input element dhundo
    const searchInput = document.getElementById("searchInput");
    
    // Agar input box page par nahi hai (kisi aur page par) to error na aaye
    if (!searchInput) return;

    // Value lo aur lowercase mein convert karo
    const query = searchInput.value.toLowerCase().trim();

    // Agar khali hai to alert do
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