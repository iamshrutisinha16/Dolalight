document.addEventListener("DOMContentLoaded", function () {
 // 1. Hero Slider Logic
        const slider = document.getElementById('heroSlider');
        let index = 0;
        function autoSlide() {
            index = (index + 1) % 2; // Humare paas 2 slides hain
            slider.style.transform = `translateX(-${index * 100}%)`;
        }
        setInterval(autoSlide, 5000);

        // 2. Scroll Reveal Animation
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.hm-fade').forEach(el => observer.observe(el));
    /* ================= FADE-UP SCROLL ================= */
    const fadeElements = document.querySelectorAll('.fade-up, .fade-item');

    if ('IntersectionObserver' in window) {
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

    
    /* ================= SHOP SLIDER SCROLL ================= */
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

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

    /* ================= FAQ ================= */
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;

            document.querySelectorAll('.faq-item').forEach(faq => {
                if (faq !== item) faq.classList.remove('active');
            });

            item.classList.toggle('active');
        });
    });

    /* ================= PRODUCTS / CARDS ANIMATION ================= */
    const animElements = document.querySelectorAll('.anim-up, .anim-fade, .dl-card');

    if ('IntersectionObserver' in window) {
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
        AOS.init({
            duration: 1000,
            once: true
        });
    }

});


/* ================= EXTRA FUNCTIONS ================= */

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
    document.getElementById('loginPopup').style.display = 'flex';
}
function closeLogin() {
    document.getElementById('loginPopup').style.display = 'none';
}

/*details page*/
// Fade Animation
const faders = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
        const answer = q.nextElementSibling;
        answer.style.display =
            answer.style.display === 'block' ? 'none' : 'block';
    });
});

// WhatsApp Connect
function connectWhatsApp() {
    const msg = encodeURIComponent(
        "Hello, I am interested in a product listed on your website dolalight. Please share more details."
    );
    window.open(`https://wa.me/919560348099?text=${msg}`, '_blank');
}

/*signup*/
function closeSignup() {
  document.querySelector(".signup-overlay").style.display = "none";
}

function goToLogin() {
  alert("Redirect to Login Page / Popup");
  // yahan aap login popup open kar sakte ho
}
