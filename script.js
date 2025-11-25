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

function toggleLight() {
    let bulb = document.getElementById("lightCircle");
    bulb.style.opacity = bulb.style.opacity === "1" ? "0" : "1";
}

// reveal on scroll
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) e.target.classList.add('reveal');
  });
},{threshold: 0.15});
revealEls.forEach(el => revealObserver.observe(el));

// set current year
const year = document.getElementById('year');
if(year) year.textContent = new Date().getFullYear();

// product preview toasts
document.querySelectorAll('[data-preview]').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.getAttribute('data-preview');
    previewToast(`${name} — Preview Activated`);
  });
});

function previewToast(text){
  const toast = document.createElement('div');
  toast.className = 'preview-toast';
  toast.textContent = text;
  document.body.appendChild(toast);
  toast.animate([{opacity:0, transform:'translateY(8px)'},{opacity:1, transform:'translateY(0)'},{opacity:0, transform:'translateY(-8px)'}],{duration:2000});
  setTimeout(()=> toast.remove(),2200);
}

// product buttons - scroll links
document.querySelectorAll('[data-scroll]').forEach(btn => {
  btn.addEventListener('click', () => {
    const sel = btn.getAttribute('data-scroll');
    const el = document.querySelector(sel);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// demo room scene control
document.querySelectorAll('[data-scene]').forEach(btn => {
  btn.addEventListener('click', () => {
    setScene(btn.getAttribute('data-scene'));
  });
});

function setScene(name){
  const light = document.getElementById('demoLight');
  if(!light) return;
  light.style.transition = 'all .5s cubic-bezier(.2,.9,.3,1)';
  if(name === 'Warm Relax'){
    light.style.opacity = '1';
    light.style.background = 'radial-gradient(circle at 30% 30%, rgba(230,194,122,0.98), rgba(182,139,58,0.75) 40%, rgba(182,139,58,0.05) 70%)';
    light.style.boxShadow = '0 30px 80px rgba(182,139,58,0.18)';
  } else if(name === 'Cool Focus'){
    light.style.opacity = '1';
    light.style.background = 'radial-gradient(circle at 30% 30%, rgba(200,230,255,0.98), rgba(130,170,230,0.75) 40%, rgba(130,170,230,0.04) 70%)';
    light.style.boxShadow = '0 30px 80px rgba(130,170,230,0.12)';
  } else if(name === 'Party'){
    light.style.opacity = '1';
    light.style.background = 'conic-gradient(from 0deg, #ff5f6d, #ffc371, #9be15d, #00c9ff, #9be15d)';
    light.style.boxShadow = '0 30px 80px rgba(0,0,0,0.12)';
    light.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:900,iterations:3});
  }
};
  