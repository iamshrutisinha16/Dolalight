document.addEventListener("DOMContentLoaded", function () {

    /* ================= HERO SLIDER ================= */
   const slider = document.getElementById('heroSlider');
const slides = document.querySelectorAll('.hm-slide'); 

let index = 0;

if (slider) {
    function autoSlide() {
        index = (index + 1) % slides.length; 
        slider.style.transform = `translateX(-${index * 100}%)`;
    }
    setInterval(autoSlide, 5000);
}


    /* ================= SCROLL REVEAL ================= */
    const revealElements = document.querySelectorAll('.hm-fade');

    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    /* ================= FADE UP ================= */
    const fadeElements = document.querySelectorAll('.fade-up, .fade-item');

    if ('IntersectionObserver' in window && fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active', 'show');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        fadeElements.forEach(el => fadeObserver.observe(el));
    }

    /* ================= SHOP SLIDER ================= */
    const shopSlider = document.querySelector('.shop-slider-wrapper');
    if (shopSlider) {
        shopSlider.addEventListener('wheel', e => {
            e.preventDefault();
            shopSlider.scrollLeft += e.deltaY;
        });
    }

    /* ================= NAVBAR SCROLL ================= */
    const nav = document.querySelector(".navbar");
    if (nav) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                nav.style.padding = "5px 0";
                nav.style.background = "rgba(255,255,255,0.98)";
            } else {
                nav.style.padding = "0";
                nav.style.background = "#fff";
            }
        });
    }

    /* ================= MOBILE MENU ================= */
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a'); 

if (toggle && navLinks) {
    toggle.addEventListener('click', (e) => {
        navLinks.classList.toggle('active');
        e.stopPropagation();
    });
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
}

    /* ================= CARD AUTO SCROLL ================= */
    const grid = document.querySelector('.tp-grid');
    const cards = document.querySelectorAll('.tp-card');

    if (grid && cards.length > 0) {
        const cardWidth = cards[0].offsetWidth + 22;
        let scrollPos = 0;

        setInterval(() => {
            scrollPos += cardWidth;
            if (scrollPos > grid.scrollWidth - grid.clientWidth) {
                scrollPos = 0;
            }
            grid.scrollTo({ left: scrollPos, behavior: 'smooth' });
        }, 3000);
    }

    /* ================= FAQ ACCORDION ================= */
   document.querySelectorAll(".dl-faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;

    document.querySelectorAll(".dl-faq-item").forEach(i => {
      if (i !== item) i.classList.remove("active");
    });

    item.classList.toggle("active");
    });
  });

document.querySelectorAll(".faq-questions").forEach(question => {
    question.addEventListener("click", () => {
        const item = question.parentElement;
        item.classList.toggle("active");
    });
});
    /* ================= CARD ANIMATION ================= */
    const animElements = document.querySelectorAll('.anim-up, .anim-fade, .dl-card');

    if ('IntersectionObserver' in window && animElements.length > 0) {
        const cardObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animElements.forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            el.style.transition = "0.6s ease";
            cardObserver.observe(el);
        });
    }

    /* ================= AOS ================= */
    if (typeof AOS !== "undefined") {
        AOS.init({ duration: 1000, once: true });
    }

});


/* ================= GLOBAL FUNCTIONS ================= */

// Scroll to Shop
function scrollToShop() {
    const shop = document.querySelector('.dl-product-grid');
    if (shop) shop.scrollIntoView({ behavior: 'smooth' });
}

// Add to Cart
function addToCart(btn) {
    const product = btn.closest('.dl-card');
    if (!product) return;

    const name = product.querySelector('h3')?.innerText || "Product";
    alert("Opening details for: " + name);
    window.location.href = "details.html";
}

// Login Popup
function openLogin() {
    const popup = document.getElementById('loginPopup');
    if (popup) popup.style.display = 'flex';
}
function closeLogin() {
    const popup = document.getElementById('loginPopup');
    if (popup) popup.style.display = 'none';
}

// WhatsApp
function connectWhatsApp() {
    const msg = encodeURIComponent(
        "Hello, I am interested in a product listed on your website dolalight. Please share more details."
    );
    window.open(`https://wa.me/919560348099?text=${msg}`, '_blank');
}

// Signup
function closeSignup() {
    const signup = document.querySelector(".signup-overlay");
    if (signup) signup.style.display = "none";
}
function goToLogin() {
    alert("Redirect to Login Page / Popup");
}

