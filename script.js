/* ==================== MOBILE MENU ==================== */
function toggleMenu() {
    const navMenu = document.querySelector("nav ul");
    if (navMenu) navMenu.classList.toggle("show");
}

/* ==================== BRAND LOGO SLIDER ==================== */
const logoTrack = document.querySelector(".logo-track");
if (logoTrack) {
    logoTrack.innerHTML += logoTrack.innerHTML; // loop fix
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

/* ==================== REVEAL ON SCROLL (Generic) ==================== */
document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(
        ".reveal, .diff-card, .team-card, .fade-item, .fade-box, .product-card, .fade-left, .fade-right"
    );

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active", "show");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        revealElements.forEach(item => revealObserver.observe(item));
    }
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
            let index = parseInt(icon.dataset.index);
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

/* ==================== SCENARIO IMAGE TRACK ==================== */
const scenarioTrack2 = document.querySelector(".scenario-track");

if (scenarioTrack2) {
    scenarioTrack2.addEventListener("mouseover", () => {
        scenarioTrack2.style.animationPlayState = "paused";
    });
    scenarioTrack2.addEventListener("mouseout", () => {
        scenarioTrack2.style.animationPlayState = "running";
    });
}

/* Reveal on Scroll */
const revealItems = document.querySelectorAll(".fade-up");

const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("active");
            io.unobserve(entry.target);
        }
    });
},{threshold:0.2});

revealItems.forEach(el=>io.observe(el));

let lightsOn = false;

        function toggleLights() {
            const lights = document.querySelectorAll('.ceiling-light');
            const btn = document.querySelector('.toggle-btn');
            
            lightsOn = !lightsOn;

            lights.forEach((light, index) => {
                // Add a small delay for each light to turn on sequentially (Like a real long corridor)
                setTimeout(() => {
                    if (lightsOn) {
                        light.classList.add('on');
                    } else {
                        light.classList.remove('on');
                    }
                }, index * 150); // 150ms delay per light
            });

            if (lightsOn) {
                btn.innerText = "Turn Lights Off";
                btn.style.boxShadow = "0 0 20px var(--accent)";
            } else {
                btn.innerText = "Turn Lights On";
                btn.style.boxShadow = "none";
            }
        }

        // Scroll Animation Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

        // Apply fade-in to product cards
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });