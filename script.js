// script.js - interactions and carousel for homepage (Galaxy Pips Academy)

document.addEventListener('DOMContentLoaded', function () {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Hero carousel
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const indicators = Array.from(document.querySelectorAll('.ind-btn'));
  let current = 0;
  let timer = null;
  const delay = 5000;

  function goTo(n) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === n);
    });
    indicators.forEach((d, i) => d.classList.toggle('active', i === n));
    current = n;
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  // init
  if (slides.length && indicators.length) {
    goTo(0);
    timer = setInterval(next, delay);

    // indicator click
    indicators.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.getAttribute('data-slide'), 10);
        goTo(idx);
        // restart timer
        clearInterval(timer);
        timer = setInterval(next, delay);
      });
    });
  }

  // Newsletter example handler
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm && newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email')?.value?.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    // Demo: replace with your server logic
    const btn = newsletterForm.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Subscribed ✓';
    newsletterForm.reset();
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Subscribe';
    }, 2200);
  });

  // Smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
