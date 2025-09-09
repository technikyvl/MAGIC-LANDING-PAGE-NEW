// Utilities
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

// Set current year
document.addEventListener('DOMContentLoaded', function() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Initialize reveal animations with IntersectionObserver
  const revealElements = document.querySelectorAll(".reveal, .hero-reveal, .slow-reveal");
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });
  
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Header island shrink on scroll
  const island = document.getElementById("islandNav");
  const onScroll = () => island?.classList.toggle("island--shrink", window.scrollY > 6);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Smooth scroll for anchor links
  const handleSmoothScroll = (e) => {
    const target = e.target.closest('a[href^="#"]');
    if (!target) return;
    
    const href = target.getAttribute('href');
    if (href === '#') return;
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  document.addEventListener('click', handleSmoothScroll);

  // Active navigation link tracking
  const ids = ["why", "audience", "process", "reviews", "faq", "contact"];
  const secObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all nav links
        $$('.navlink').forEach(link => link.classList.remove('active'));
        // Add active class to current section link
        const activeLink = $(`.navlink[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { 
    rootMargin: '-40% 0px -55% 0px', 
    threshold: [0, 0.25, 0.5, 1] 
  });
  
  ids.forEach((id) => {
    const element = document.getElementById(id);
    if (element) secObs.observe(element);
  });

  // FAQ Accordion functionality
  const faqButtons = $$('.faq-btn');
  faqButtons.forEach(button => {
    button.addEventListener('click', function() {
      const panel = this.parentElement.querySelector('.faq-panel');
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const icon = this.querySelector('span:last-child');
      
      // Close all other panels
      faqButtons.forEach(otherButton => {
        if (otherButton !== this) {
          otherButton.setAttribute('aria-expanded', 'false');
          const otherPanel = otherButton.parentElement.querySelector('.faq-panel');
          const otherIcon = otherButton.querySelector('span:last-child');
          if (otherPanel && otherIcon) {
            otherPanel.style.height = '0';
            otherPanel.style.opacity = '0';
            otherIcon.textContent = '+';
          }
        }
      });
      
      // Toggle current panel
      this.setAttribute('aria-expanded', String(!isExpanded));
      icon.textContent = isExpanded ? '+' : '–';
      
      if (isExpanded) {
        panel.style.height = '0';
        panel.style.opacity = '0';
      } else {
        panel.style.height = 'auto';
        const height = panel.scrollHeight + 'px';
        panel.style.height = '0';
        requestAnimationFrame(() => {
          panel.style.height = height;
          panel.style.opacity = '1';
        });
      }
    });
  });

  // Form submission handling
  const contactForm = $('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('fields[name]') || this.querySelector('input[name="fields[name]"]')?.value;
      const email = formData.get('fields[email]') || this.querySelector('input[name="fields[email]"]')?.value;
      const phone = formData.get('fields[phone]') || this.querySelector('input[name="fields[phone]"]')?.value;
      const message = formData.get('fields[message]') || this.querySelector('textarea[name="fields[message]"]')?.value;
      
      // Basic validation
      if (!name || !email) {
        alert('Proszę wypełnić pola Imię i E-mail.');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Proszę podać prawidłowy adres e-mail.');
        return;
      }
      
      // Show success message
      alert('Dziękuję za wiadomość! Skontaktuję się z Tobą w ciągu 24h.');
      
      // Reset form
      this.reset();
    });
  }

  // Additional reveal animations for any missed elements
  const additionalRevealElements = $$('.reveal, .hero-reveal, .slow-reveal');
  const additionalRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        additionalRevealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  additionalRevealElements.forEach(el => {
    // Only observe if not already animated
    if (!el.classList.contains('is-in')) {
      additionalRevealObserver.observe(el);
    }
  });
});

// Additional utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
  const smoothScrollPolyfill = () => {
    const links = $$('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = $(href);
        if (target) {
          e.preventDefault();
          const targetPosition = target.offsetTop - 80; // Account for fixed header
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };
  
  document.addEventListener('DOMContentLoaded', smoothScrollPolyfill);
}
