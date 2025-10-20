// Static JavaScript for Magic Life website
document.addEventListener('DOMContentLoaded', function() {
  // Set current year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Intersection Observer for reveal animations
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.05,
    rootMargin: "0px 0px 50px 0px"
  });

  // Observe all reveal elements
  const revealElements = document.querySelectorAll(".reveal, .hero-reveal, .slow-reveal, .central-dot, .line-draw");
  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // Shrink island navigation
  const island = document.getElementById("islandNav");
  const onScroll = () => island?.classList.toggle("island--shrink", window.scrollY > 6);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  
  if (mobileMenuToggle && mobileMenu) {
    const toggleMenu = () => {
      mobileMenu.classList.toggle("hidden");
      const isOpen = !mobileMenu.classList.contains("hidden");
      
      // Update button icon
      const icon = mobileMenuToggle.querySelector("svg");
      if (icon) {
        if (isOpen) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
          mobileMenuToggle.setAttribute("aria-label", "Zamknij menu");
        } else {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
          mobileMenuToggle.setAttribute("aria-label", "Otwórz menu");
        }
      }
    };
    
    mobileMenuToggle.addEventListener("click", toggleMenu);
    
    // Close menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        const icon = mobileMenuToggle.querySelector("svg");
        if (icon) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
          mobileMenuToggle.setAttribute("aria-label", "Otwórz menu");
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenu.classList.add("hidden");
        const icon = mobileMenuToggle.querySelector("svg");
        if (icon) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
          mobileMenuToggle.setAttribute("aria-label", "Otwórz menu");
        }
      }
    });
    
    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
        const icon = mobileMenuToggle.querySelector("svg");
        if (icon) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
          mobileMenuToggle.setAttribute("aria-label", "Otwórz menu");
        }
      }
    });
  }

  // Smooth scroll for anchor links
  const handleSmoothScroll = (e) => {
    const href = e.target.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Calculate offset for sticky header
        const headerHeight = 80; // Approximate header height
        const elementPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Add smooth scroll to all anchor links
  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      const href = e.target.getAttribute('href');
      if (href?.startsWith('#')) {
        handleSmoothScroll(e);
      } else if (href?.startsWith('/#')) {
        // Handle cross-page navigation with anchors
        e.preventDefault();
        window.location.href = href;
      } else if (href === '/#reviews' || href === '/#pricing' || href === '/#contact' || href === '/#faq') {
        // Handle specific cross-page anchors
        e.preventDefault();
        window.location.href = href;
      }
    }
  });

  // Prevent rubber-band overscroll at top/bottom on touch devices
  let startY = 0;
  const onTouchStart = (e) => { startY = e.touches[0]?.clientY || 0; };
  const onTouchMove = (e) => {
    const currentY = e.touches[0]?.clientY || 0;
    const scrollingDownFromTop = window.scrollY <= 0 && currentY > startY;
    const reachedBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight;
    const scrollingUpFromBottom = reachedBottom && currentY < startY;
    if (scrollingDownFromTop || scrollingUpFromBottom) {
      e.preventDefault();
    }
  };
  window.addEventListener('touchstart', onTouchStart, { passive: false });
  window.addEventListener('touchmove', onTouchMove, { passive: false });

  // Cleanup function
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchmove', onTouchMove);
  };
});
