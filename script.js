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
        const fadeUpObserver = new IntersectionObserver((entries) => {
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

if (cards.length > 0 && dots.length > 0 && cards.length === dots.length) {
    let index = 0;

    function showReview(i) {
        cards.forEach(card => card.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        if (cards[i]) cards[i].classList.add("active");
        if (dots[i]) dots[i].classList.add("active");
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
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
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

    if (icons.length === 0) return;

    setInterval(() => {
        icons.forEach(icon => {
            let iconList = icon.dataset.icons.split(",").map(i => i.trim());
            let index = parseInt(icon.dataset.index) || 0;
            icon.style.opacity = "0";

            setTimeout(() => {
                iconList.forEach(cls => icon.classList.remove(cls));

                let next = (index + 1) % iconList.length;

                icon.classList.add(iconList[next]);
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
    const outdoorObserver = new IntersectionObserver((entries) => {
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

/* ==================== YEAR UPDATE ==================== */
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

/* ==================== PREVIEW TOAST ==================== */
document.querySelectorAll('[data-preview]').forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-preview');
        previewToast(`${name} — Preview Activated`);
    });
});

function previewToast(text) {
    const toast = document.createElement('div');
    toast.className = 'preview-toast';
    toast.textContent = text;
    document.body.appendChild(toast);
    toast.animate([{ opacity: 0, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-8px)' }],
        { duration: 2000 });
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
        light.animate([{ transform: 'scale(1)' },
            { transform: 'scale(1.06)' },
            { transform: 'scale(1)' }],
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

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(product.name + " added to cart!");
    loadCart(); 
}

// Elements select karna
const cartItemsDiv = document.getElementById("cartItems");
const subtotalBox = document.getElementById("subtotal");
const totalBox = document.getElementById("total");

function loadCart() {
    if (!cartItemsDiv) return;

    cartItemsDiv.innerHTML = "";
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<h3 style='text-align:center; padding: 20px;'>Your Cart is Empty</h3>";
        if(subtotalBox) subtotalBox.innerText = "₹0.00";
        if(totalBox) totalBox.innerText = "₹0.00";
        return;
    }

    // Cart Items ko Loop karke Show karna
    cart.forEach((item, index) => {
        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" class="cart-img" alt="${item.name}">
                <div class="details">
                    <h3>${item.name}</h3>
                    <p class="price">₹${item.price}</p> <!-- Dollar hata kar Rupee kiya -->
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
    // Quantity 1 se kam nahi honi chahiye
    if (cart[index].qty + amount > 0) {
        cart[index].qty += amount;
        saveCart();
    }
}

function removeItem(index) {
    cart.splice(index, 1); // Item delete
    saveCart();
}

function calculateTotals() {
    // Agar elements nahi mile to error na aaye
    if (!subtotalBox || !totalBox) return;

    let subtotal = 0;
    cart.forEach(item => subtotal += item.price * item.qty);

    // Shipping Logic: Agar cart mein saman hai to ₹49, nahi to ₹0
    let shipping = cart.length > 0 ? 49 : 0;
    let total = subtotal + shipping;

    // Values update karna (₹ symbol ke sath)
    subtotalBox.innerText = "₹" + subtotal.toFixed(2);
    totalBox.innerText = "₹" + total.toFixed(2);
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Page load hone par cart show karo
loadCart();

// "Add to Cart" Buttons par click event lagana
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
function handleLogin() {
    // 1. HTML se values lena
    const nameInput = document.getElementById("userName"); // ID match honi chahiye
    const mobileInput = document.getElementById("userMobile"); // ID match honi chahiye

    const name = nameInput.value.trim();
    const mobile = mobileInput.value.trim();

    // 2. Validation (Check karna)
    if (name === "") {
        alert("Please enter your Full Name.");
        return;
    }

    if (mobile === "" || mobile.length !== 10) {
        alert("Please enter a valid 10-digit Mobile Number.");
        return;
    }

    // 3. Data Save karna
    localStorage.setItem("dolaUser", name);
    localStorage.setItem("dolaMobile", mobile);

    // 4. Success aur Redirect
    alert(`Login Successful! Welcome ${name}`);
    window.location.href = "index.html";
}