/* ========================================
   NAV SCROLL BEHAVIOR
   ======================================== */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

/* ========================================
   MOBILE MENU
   ======================================== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('mobileOverlay');

function openMenu() {
  hamburger.classList.add('open');
  navLinks.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (navLinks.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

overlay.addEventListener('click', closeMenu);

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* ========================================
   SCROLL ANIMATIONS (Intersection Observer)
   ======================================== */
const animatedElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => {
        el.classList.add('visible');
      }, parseInt(delay));
      observer.unobserve(el);
    }
  });
}, observerOptions);

animatedElements.forEach(el => observer.observe(el));

/* Card stagger: assign incremental delays to cards in grids */
document.querySelectorAll('[data-stagger]').forEach(grid => {
  const cards = grid.querySelectorAll('.card');
  cards.forEach((card, i) => {
    card.dataset.delay = i * 80;
  });
});

// Re-observe cards after stagger delays are set
document.querySelectorAll('.card[data-animate]').forEach(el => {
  observer.observe(el);
});

/* ========================================
   SMOOTH SCROLL (nav offset fix)
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

