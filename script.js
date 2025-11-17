function toggleMenu() {
  document.querySelector("nav ul").classList.toggle("show");
}

const slider = document.querySelector('.shop-slider');
if (slider) {
  slider.innerHTML += slider.innerHTML;
}

const fadeItems = document.querySelectorAll(".fade-up");

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      fadeObserver.unobserve(entry.target);  
    }
  });
}, { threshold: 0.25 });

fadeItems.forEach(item => fadeObserver.observe(item));

const form = document.getElementById('loginForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Login form submitted!');
  });
}

const expCards = document.querySelectorAll(".exp-card");

const expObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      expObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

expCards.forEach(card => expObserver.observe(card));

const downlightCards = document.querySelectorAll(".downlight-card");

const downlightObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-visible");
      downlightObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

downlightCards.forEach(card => downlightObserver.observe(card));

const premiumCards = document.querySelectorAll(".premium-card");

const premiumObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-active");
      premiumObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

premiumCards.forEach(card => premiumObserver.observe(card));

document.querySelectorAll(".premium-img").forEach(img => {
  img.addEventListener("click", () => {
    img.classList.add("clicked");

    setTimeout(() => {
      img.classList.remove("clicked");
    }, 500);
  });
});
