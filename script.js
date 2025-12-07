/* script.js - Galaxy Pips Academy - Fixed continuous sliding and all functionality */

// ========== DOM ready ==========
document.addEventListener('DOMContentLoaded', function () {
  
  // ===== Footer year =====
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ===== Mobile menu toggle with close functionality =====
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  
  let isMenuOpen = false;
  
  function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    mobileMenu.setAttribute('aria-hidden', !isMenuOpen);
    mobileMenu.style.display = isMenuOpen ? 'block' : 'none';
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    mobileToggle.textContent = isMenuOpen ? '✕' : '☰';
    
    // Hide search if open
    hideAllSearch();
  }

  function closeMobileMenu() {
    if (isMenuOpen) {
      isMenuOpen = false;
      mobileMenu.setAttribute('aria-hidden', 'true');
      mobileMenu.style.display = 'none';
      document.body.style.overflow = 'auto';
      mobileToggle.textContent = '☰';
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  // Close menu when clicking a mobile link
  if (mobileMenu) {
    mobileMenu.querySelectorAll('.mm-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside (only on mobile)
    document.addEventListener('click', (event) => {
      if (window.innerWidth <= 768 && isMenuOpen) {
        if (!mobileMenu.contains(event.target) && 
            !mobileToggle.contains(event.target)) {
          closeMobileMenu();
        }
      }
    });
  }

  // ===== Search Functionality =====
  
  // Elements
  const desktopSearchBtn = document.getElementById('desktopSearchBtn');
  const desktopSearchInputWrapper = document.getElementById('desktopSearchInputWrapper');
  const desktopSearchInput = document.getElementById('desktopSearchInput');
  const desktopSearchClose = document.getElementById('desktopSearchClose');
  
  const mobileSearchIcon = document.getElementById('mobileSearchIcon');
  const mobileSearchContainer = document.getElementById('mobileSearchContainer');
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  const mobileSearchClose = document.getElementById('mobileSearchClose');
  
  // All posts for search
  const allPosts = Array.from(document.querySelectorAll('.post-analysis, .post-regular'));
  
  // Show desktop search
  if (desktopSearchBtn && desktopSearchInputWrapper) {
    desktopSearchBtn.addEventListener('click', () => {
      desktopSearchInputWrapper.classList.add('show');
      desktopSearchInput.focus();
      hideMobileSearch();
    });
  }
  
  // Close desktop search
  if (desktopSearchClose) {
    desktopSearchClose.addEventListener('click', () => {
      desktopSearchInputWrapper.classList.remove('show');
      desktopSearchInput.value = '';
      showAllPosts();
    });
  }
  
  // Show mobile search
  if (mobileSearchIcon && mobileSearchContainer) {
    mobileSearchIcon.addEventListener('click', () => {
      mobileSearchContainer.classList.add('show');
      mobileSearchInput.focus();
      hideDesktopSearch();
      closeMobileMenu();
    });
  }
  
  // Close mobile search
  if (mobileSearchClose) {
    mobileSearchClose.addEventListener('click', () => {
      mobileSearchContainer.classList.remove('show');
      mobileSearchInput.value = '';
      showAllPosts();
    });
  }
  
  // Search function
  function performSearch(searchTerm) {
    if (!searchTerm.trim()) {
      showAllPosts();
      return;
    }
    
    const term = searchTerm.toLowerCase().trim();
    let hasResults = false;
    
    allPosts.forEach(post => {
      const title = post.querySelector('h3, h4')?.textContent.toLowerCase() || '';
      const excerpt = post.querySelector('.excerpt')?.textContent.toLowerCase() || '';
      const category = post.querySelector('.post-category, .post-category-small')?.textContent.toLowerCase() || '';
      const author = post.querySelector('.post-author')?.textContent.toLowerCase() || '';
      
      const matches = title.includes(term) || 
                     excerpt.includes(term) || 
                     category.includes(term) || 
                     author.includes(term);
      
      if (matches) {
        post.style.display = '';
        post.classList.add('search-highlight');
        hasResults = true;
      } else {
        post.style.display = 'none';
        post.classList.remove('search-highlight');
      }
    });
    
    // Show no results message
    const noResultsMsg = document.getElementById('noResultsMessage');
    if (!hasResults) {
      if (!noResultsMsg) {
        const msg = document.createElement('div');
        msg.id = 'noResultsMessage';
        msg.className = 'no-results-message';
        msg.textContent = `No posts found for "${searchTerm}"`;
        document.querySelector('.posts-column').appendChild(msg);
      }
    } else if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }
  
  // Show all posts
  function showAllPosts() {
    allPosts.forEach(post => {
      post.style.display = '';
      post.classList.remove('search-highlight');
    });
    
    const noResultsMsg = document.getElementById('noResultsMessage');
    if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }
  
  // Event listeners for search inputs
  if (desktopSearchInput) {
    desktopSearchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });
    
    desktopSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch(e.target.value);
      }
    });
  }
  
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });
    
    mobileSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch(e.target.value);
      }
    });
  }
  
  // Helper functions
  function hideDesktopSearch() {
    if (desktopSearchInputWrapper) {
      desktopSearchInputWrapper.classList.remove('show');
      desktopSearchInput.value = '';
    }
  }
  
  function hideMobileSearch() {
    if (mobileSearchContainer) {
      mobileSearchContainer.classList.remove('show');
      mobileSearchInput.value = '';
    }
  }
  
  function hideAllSearch() {
    hideDesktopSearch();
    hideMobileSearch();
    showAllPosts();
  }
  
  // Close search when clicking outside (for desktop)
  document.addEventListener('click', (event) => {
    if (desktopSearchInputWrapper && desktopSearchInputWrapper.classList.contains('show')) {
      if (!desktopSearchInputWrapper.contains(event.target) && 
          !desktopSearchBtn.contains(event.target)) {
        hideDesktopSearch();
        showAllPosts();
      }
    }
  });

  // ===== Features continuous ticker =====
  function initFeaturesTicker() {
    const ticker = document.querySelector('.continuous-carousel');
    if (!ticker) return;
    
    const track = ticker.querySelector('.continuous-track');
    const features = Array.from(track.querySelectorAll('.feature'));
    
    // Clone features for seamless loop
    features.forEach(feature => {
      const clone = feature.cloneNode(true);
      track.appendChild(clone);
    });

    // Set initial animation
    let speedRange = document.getElementById('tickerSpeed');
    let currentSpeed = parseInt(ticker.getAttribute('data-speed')) || 35;
    
    // Update animation with current speed
    function updateAnimation(speed) {
      track.style.animation = `scrollTicker ${speed}s linear infinite`;
    }
    
    updateAnimation(currentSpeed);

    // Center highlight logic
    function updateCenterHighlight() {
      const parentRect = ticker.getBoundingClientRect();
      const centerX = parentRect.left + parentRect.width / 2;
      const allFeatures = Array.from(track.querySelectorAll('.feature'));
      
      // Remove previous highlights
      allFeatures.forEach(f => f.classList.remove('center-highlight'));
      
      // Find and highlight center feature
      let closestFeature = null;
      let minDistance = Infinity;
      
      allFeatures.forEach(feature => {
        const rect = feature.getBoundingClientRect();
        const featureCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(featureCenterX - centerX);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestFeature = feature;
        }
      });
      
      if (closestFeature) {
        closestFeature.classList.add('center-highlight');
      }
    }

    // Update highlight periodically
    let highlightInterval = setInterval(updateCenterHighlight, 100);

    // Speed control
    if (speedRange) {
      speedRange.addEventListener('input', (e) => {
        const newSpeed = e.target.value;
        updateAnimation(newSpeed);
      });
    }

    // Pause on hover
    ticker.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
      clearInterval(highlightInterval);
    });

    ticker.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
      highlightInterval = setInterval(updateCenterHighlight, 100);
    });

    // Initial highlight update
    updateCenterHighlight();
  }

  initFeaturesTicker();

  // ===== Levels carousel continuous sliding =====
  function initLevelsCarousel() {
    const levelsTrack = document.querySelector('.levels-track');
    if (!levelsTrack) return;
    
    const levelCards = Array.from(levelsTrack.querySelectorAll('.level-card'));
    
    // Clone first few cards for continuous effect
    for (let i = 0; i < 3; i++) {
      const clone = levelCards[i].cloneNode(true);
      levelsTrack.appendChild(clone);
    }
    
    // Auto-sliding for desktop
    function startLevelsAnimation() {
      if (window.innerWidth < 768) {
        // Faster speed for mobile
        levelsTrack.style.animationDuration = '25s';
      } else {
        // Normal speed for desktop
        levelsTrack.style.animationDuration = '40s';
      }
    }
    
    startLevelsAnimation();
    
    // Update speed on resize
    window.addEventListener('resize', startLevelsAnimation);
    
    // Pause on hover
    const levelsCarousel = document.querySelector('.levels-carousel');
    if (levelsCarousel) {
      levelsCarousel.addEventListener('mouseenter', () => {
        levelsTrack.style.animationPlayState = 'paused';
      });
      
      levelsCarousel.addEventListener('mouseleave', () => {
        levelsTrack.style.animationPlayState = 'running';
      });
    }
  }

  initLevelsCarousel();

  // ===== Tools carousel auto-sliding =====
  function initToolsCarousel() {
    const toolsTrack = document.querySelector('.tools-track');
    if (!toolsTrack) return;
    
    function startToolsAnimation() {
      if (window.innerWidth < 768) {
        toolsTrack.style.animationDuration = '20s';
      } else {
        toolsTrack.style.animationDuration = '35s';
      }
    }
    
    startToolsAnimation();
    
    window.addEventListener('resize', startToolsAnimation);
    
    // Pause on hover
    const toolsCarousel = document.querySelector('.tools-carousel');
    if (toolsCarousel) {
      toolsCarousel.addEventListener('mouseenter', () => {
        toolsTrack.style.animationPlayState = 'paused';
      });
      
      toolsCarousel.addEventListener('mouseleave', () => {
        toolsTrack.style.animationPlayState = 'running';
      });
    }
  }

  initToolsCarousel();

  // ===== Testimonials carousel continuous sliding =====
  function initTestimonialsCarousel() {
    const testTrack = document.querySelector('.test-track');
    if (!testTrack) return;
    
    const testimonials = Array.from(testTrack.querySelectorAll('.testimonial'));
    
    // Clone first few testimonials for continuous effect
    for (let i = 0; i < 2; i++) {
      const clone = testimonials[i].cloneNode(true);
      testTrack.appendChild(clone);
    }
    
    function startTestAnimation() {
      if (window.innerWidth < 768) {
        testTrack.style.animationDuration = '30s';
      } else {
        testTrack.style.animationDuration = '45s';
      }
    }
    
    startTestAnimation();
    
    window.addEventListener('resize', startTestAnimation);
    
    // Pause on hover
    const testCarousel = document.querySelector('.test-carousel');
    if (testCarousel) {
      testCarousel.addEventListener('mouseenter', () => {
        testTrack.style.animationPlayState = 'paused';
      });
      
      testCarousel.addEventListener('mouseleave', () => {
        testTrack.style.animationPlayState = 'running';
      });
    }
  }

  initTestimonialsCarousel();

  // ===== Newsletter form handling =====
  function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!email) {
          alert('Please enter your email address.');
          return;
        }
        
        if (!isValidEmail(email)) {
          alert('Please enter a valid email address.');
          return;
        }
        
        // Show success message
        alert('Thank you for subscribing to our newsletter! You will receive updates soon.');
        emailInput.value = '';
      });
    }
    
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }

  initNewsletterForm();

  // ===== Smooth scrolling for anchor links =====
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Close mobile menu if open
          closeMobileMenu();
          
          // Close search if open
          hideAllSearch();
          
          // Smooth scroll to target
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  initSmoothScrolling();

  // ===== Add CSS for search highlights =====
  function addSearchStyles() {
    const styleTag = document.createElement('style');
    styleTag.textContent = `
      .search-highlight {
        animation: highlightPulse 2s ease-in-out;
        border-color: var(--accent) !important;
        box-shadow: 0 0 0 2px rgba(106, 43, 184, 0.2) !important;
      }
      
      @keyframes highlightPulse {
        0%, 100% { box-shadow: 0 0 0 2px rgba(106, 43, 184, 0.2); }
        50% { box-shadow: 0 0 0 4px rgba(106, 43, 184, 0.4); }
      }
      
      .no-results-message {
        text-align: center;
        padding: 40px;
        background: #f8fafc;
        border-radius: 12px;
        border: 2px dashed #e2e8f0;
        color: var(--muted);
        font-size: 18px;
        margin: 20px 0;
      }
      
      /* Continuous sliding fix */
      .levels-track,
      .test-track {
        will-change: transform;
      }
    `;
    document.head.appendChild(styleTag);
  }

  addSearchStyles();

  // ===== Performance optimization =====
  function initPerformanceOptimization() {
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        // Reinitialize animations on resize
        const tracks = [
          document.querySelector('.continuous-track'),
          document.querySelector('.levels-track'),
          document.querySelector('.tools-track'),
          document.querySelector('.test-track')
        ];
        
        tracks.forEach(track => {
          if (track) {
            const currentAnimation = track.style.animation;
            track.style.animation = 'none';
            void track.offsetWidth; // Trigger reflow
            track.style.animation = currentAnimation;
          }
        });
      }, 250);
    });
  }

  initPerformanceOptimization();

  // ===== Touch swipe for mobile carousels =====
  function initTouchSwipe() {
    if (window.innerWidth >= 768) return; // Only for mobile
    
    const carousels = [
      { track: document.querySelector('.levels-track'), name: 'levels' },
      { track: document.querySelector('.tools-track'), name: 'tools' },
      { track: document.querySelector('.test-track'), name: 'testimonials' }
    ];
    
    carousels.forEach(carousel => {
      if (!carousel.track) return;
      
      let startX = 0;
      let isSwiping = false;
      let currentTranslate = 0;
      
      carousel.track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
        carousel.track.style.transition = 'none';
        currentTranslate = getTranslateX(carousel.track);
      });
      
      carousel.track.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        carousel.track.style.transform = `translateX(${currentTranslate - diff}px)`;
      });
      
      carousel.track.addEventListener('touchend', () => {
        isSwiping = false;
        carousel.track.style.transition = 'transform 0.3s ease';
        
        // Reset position with bounds
        const bounds = getCarouselBounds(carousel.name);
        const currentPos = getTranslateX(carousel.track);
        
        if (currentPos > 0) {
          carousel.track.style.transform = 'translateX(0)';
        } else if (currentPos < bounds.min) {
          carousel.track.style.transform = `translateX(${bounds.min}px)`;
        }
      });
    });
    
    function getTranslateX(element) {
      const style = window.getComputedStyle(element);
      const matrix = new DOMMatrixReadOnly(style.transform);
      return matrix.m41;
    }
    
    function getCarouselBounds(carouselName) {
      // Calculate bounds based on carousel type
      const cardWidth = carouselName === 'tools' ? 260 : 300;
      const cardCount = carouselName === 'tools' ? 8 : 
                       carouselName === 'levels' ? 9 : 8;
      
      return {
        min: -(cardWidth * (cardCount - 1) + 25 * (cardCount - 1))
      };
    }
  }

  // Initialize touch swipe for mobile
  if ('ontouchstart' in window) {
    initTouchSwipe();
    window.addEventListener('resize', initTouchSwipe);
  }

  // ===== Console welcome message =====
  console.log('%c🌌 Galaxy Pips Academy %c- Final Tweaks Applied!', 
    'color: #22e6ff; font-size: 16px; font-weight: bold;', 
    'color: #6b7280; font-size: 14px;'
  );
  console.log('%c• Blog: First 2 posts side-by-side, increased to 12 posts • Testimonials match level cards size • Mobile menu gradient fixed', 
    'color: #0c1b46; font-size: 12px;'
  );

});

// ===== Initialize when DOM is fully loaded =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    // Already handled above
  });
} else {
  // DOM already loaded
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ===== Window load event for final optimizations =====
window.addEventListener('load', function() {
  // Ensure all images are loaded
  const images = document.querySelectorAll('img');
  let imagesLoaded = 0;
  
  images.forEach(img => {
    if (img.complete) {
      imagesLoaded++;
    } else {
      img.addEventListener('load', () => {
        imagesLoaded++;
      });
    }
  });
  
  // Add loaded class to body when all images are loaded
  const checkImagesLoaded = setInterval(() => {
    if (imagesLoaded >= images.length) {
      document.body.classList.add('images-loaded');
      clearInterval(checkImagesLoaded);
    }
  }, 100);
  
  // Remove loading class after a timeout as fallback
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 1000);
});
