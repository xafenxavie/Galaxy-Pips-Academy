/* ============================
   script.js - Galaxy Pips Academy
   - Mobile menu toggle
   - Header & mobile search (client-side blog filtering)
   - Continuous ticker (duplicate nodes, pause on hover, center highlight)
   - Levels carousel (arrows + autoplay)
   - Testimonials carousel
   - Footer year
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile menu toggle ---------- */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  mobileToggle && mobileToggle.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    mobileToggle.setAttribute('aria-expanded', mobileMenu.style.display === 'block');
  });

  /* ---------- Header & Mobile search (client-side blog filter) ---------- */
  // function to filter posts by keyword (title & excerpt)
  function filterPosts(keyword) {
    const posts = Array.from(document.querySelectorAll('.posts-area .post'));
    if (!posts.length) return;
    const q = keyword.trim().toLowerCase();
    posts.forEach(post => {
      const title = (post.querySelector('h3, h4')?.textContent || '').toLowerCase();
      const excerpt = (post.querySelector('.excerpt')?.textContent || '').toLowerCase();
      if (!q || title.includes(q) || excerpt.includes(q)) {
        post.style.display = '';
      } else {
        post.style.display = 'none';
      }
    });
  }

  const headerSearchForm = document.getElementById('headerSearchForm');
  headerSearchForm && headerSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = document.getElementById('headerSearch').value || '';
    filterPosts(val);
    // scroll to posts area
    document.querySelector('.posts-area')?.scrollIntoView({behavior:'smooth'});
  });

  const mobileSearchForm = document.getElementById('mobileSearchForm');
  mobileSearchForm && mobileSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = document.getElementById('mobileSearch').value || '';
    filterPosts(val);
    mobileMenu.style.display = 'none';
    // ensure posts visible
    document.querySelector('.posts-area')?.scrollIntoView({behavior:'smooth'});
  });

  /* ---------- CONTINUOUS TICKER: duplication, pause on hover, center highlight & speed control ---------- */
  (function setupTicker(){
    const track = document.getElementById('continuousTrack');
    if (!track) return;

    // Duplicate items to enable seamless looping
    const items = Array.from(track.children);
    items.forEach(item => track.appendChild(item.cloneNode(true)));

    // Handle hover pause/resume
    const carousel = document.getElementById('continuousCarousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
      });
      carousel.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
      });
    }

    // Center highlight: periodically compute center card and add class
    let lastCenterIndex = -1;
    function highlightCenter(){
      const trackRect = track.getBoundingClientRect();
      const midX = trackRect.left + trackRect.width / 2;
      const cards = Array.from(track.querySelectorAll('.feature'));
      cards.forEach(card => card.classList.remove('center-highlight', 'glow'));
      // find card whose center is nearest to midX
      let best = null; let bestDist = Infinity;
      cards.forEach((card, idx) => {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const dist = Math.abs(cx - midX);
        if (dist < bestDist) { bestDist = dist; best = {card, idx}; }
      });
      if (best && best.idx !== lastCenterIndex) {
        // remove old
        lastCenterIndex = best.idx;
        // add highlight & glow
        best.card.classList.add('center-highlight');
        // add glow to nearby
        const prev = cards[best.idx - 1]; const next = cards[best.idx + 1];
        if (prev) prev.classList.add('glow');
        if (next) next.classList.add('glow');
      }
    }
    // call repeatedly (keeps in sync while animating)
    setInterval(highlightCenter, 350);

    // Adjust ticker speed for mobile/desktop by changing CSS animation duration
    function setTickerSpeed(){
      const isMobile = window.matchMedia('(max-width:768px)').matches;
      if (isMobile) {
        track.style.animation = `scrollTicker var(--ticker-speed-mobile) linear infinite`;
      } else {
        track.style.animation = `scrollTicker var(--ticker-speed-desktop) linear infinite`;
      }
    }
    setTickerSpeed();
    window.addEventListener('resize', setTickerSpeed);

    // parallax effect: small vertical movement on hover for each card
    track.querySelectorAll('.feature').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width/2;
        const offset = (e.clientX - cx) / rect.width;
        card.style.transform = `translateY(${offset * -6}px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  })();

  /* ---------- LEVELS CAROUSEL (arrows + autoplay + responsive) ---------- */
  (function setupLevels(){
    const carousel = document.getElementById('levelsCarousel');
    if (!carousel) return;
    const prevBtn = document.querySelector('.level-arrow.prev');
    const nextBtn = document.querySelector('.level-arrow.next');

    // scroll one card width per click
    function scrollNext() {
      const cardWidth = carousel.querySelector('.level')?.offsetWidth || 260;
      carousel.scrollBy({left: cardWidth + 16, behavior: 'smooth'});
    }
    function scrollPrev() {
      const cardWidth = carousel.querySelector('.level')?.offsetWidth || 260;
      carousel.scrollBy({left: -(cardWidth + 16), behavior: 'smooth'});
    }

    nextBtn && nextBtn.addEventListener('click', scrollNext);
    prevBtn && prevBtn.addEventListener('click', scrollPrev);

    // autoplay
    let levelTimer = setInterval(scrollNext, 4200);
    // pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(levelTimer));
    carousel.addEventListener('mouseleave', () => levelTimer = setInterval(scrollNext, 4200));
    // make sure mobile shows one per view
    window.addEventListener('resize', () => {
      // optional adjustments could go here
    });
  })();

  /* ---------- TESTIMONIALS CAROUSEL (auto) ---------- */
  (function setupTestimonials(){
    const track = document.querySelector('.test-track');
    if (!track) return;
    const cards = Array.from(track.children);
    let idx = 0;
    function shift(){ 
      const w = cards[0].offsetWidth + 16;
      track.style.transform = `translateX(-${idx * (w)}px)`;
      idx = (idx + 1) % cards.length;
    }
    // autoplay with responsive delay
    let delay = window.matchMedia('(max-width:768px)').matches ? 4200 : 5200;
    let timer = setInterval(shift, delay);
    track.addEventListener('mouseenter', ()=> clearInterval(timer));
    track.addEventListener('mouseleave', ()=> timer = setInterval(shift, delay));
    window.addEventListener('resize', ()=> {
      clearInterval(timer);
      delay = window.matchMedia('(max-width:768px)').matches ? 4200 : 5200;
      timer = setInterval(shift, delay);
    });
  })();

  /* ---------- BLOG: ensure images and cards layout are responsive (extra safety) ---------- */
  // No additional JS necessary. Search handled above.

  /* ---------- Duplicate continuous-track children for smooth loop (if not already duplicated) ---------- */
  // done inside setupTicker()

  /* ---------- Smooth anchor behavior ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  /* ---------- Newsletter demo handler ---------- */
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm && newsletterForm.addEventListener('submit', function(e){
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email.');
      return;
    }
    const btn = newsletterForm.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Subscribed ✓';
    setTimeout(()=>{ btn.disabled=false; btn.textContent='Subscribe'; newsletterForm.reset(); }, 2200);
  });
});
