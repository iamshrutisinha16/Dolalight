/* ==================== MOBILE MENU ==================== */
function toggleMenu() {
    const navMenu = document.querySelector("nav ul");
    if (navMenu) navMenu.classList.toggle("show");
}

/* ==================== BRAND LOGO SLIDER ==================== */
const track = document.querySelector(".logo-track");
if (track) {
    track.innerHTML += track.innerHTML; // loop fix
}

/* ==================== FADE-UP ANIMATIONS ==================== */
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
        if (dot) {
            dot.addEventListener("click", () => {
                index = i;
                showReview(index);
            });
        }
    });

    setInterval(() => {
        index = (index + 1) % cards.length;
        showReview(index);
    }, 3000);

    showReview(0);
}

/* ==================== REVEAL ON SCROLL ==================== */
const revealElements = document.querySelectorAll(".diff-card, .team-card, .fade-item, .fade-box, .product-card");

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(item => revealObserver.observe(item));
}

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
    if (button) {
        button.addEventListener("click", () => {
            const target = document.querySelector(".shop-section");
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    }
});

