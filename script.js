/**
 * Seong Min-hyuk - Professional Portfolio Script
 * Interactive UI/UX enhancements, tab controls, scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Active State & Scroll Effect
  const header = document.querySelector('.header');
  const navItems = document.querySelectorAll('.nav-item');
  
  // Update header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Highlight active menu item based on current page URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navItems.forEach(item => {
    const link = item.querySelector('a');
    const href = link.getAttribute('href');
    if (href === currentPath) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // 2. Scroll Animation (Reveal Elements)
  const revealElements = document.querySelectorAll('.card, .timeline-item, .project-card, .gallery-card, h2');
  
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    // Set initial styles for animation
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    revealOnScroll.observe(el);
  });

  // 3. Skill Progress Animation (qualifications.html)
  const skillBars = document.querySelectorAll('.skill-bar');
  if (skillBars.length > 0) {
    const animateSkills = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetWidth = entry.target.parentElement.parentElement.dataset.level || '80%';
          entry.target.style.width = targetWidth;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
      animateSkills.observe(bar);
    });
  }

  // 4. Interactive Tabs for Animal Welfare (activities.html)
  const tabBtns = document.querySelectorAll('.welfare-tab-btn');
  const tabPanels = document.querySelectorAll('.welfare-tab-panel');

  if (tabBtns.length > 0 && tabPanels.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons and panels
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        // Add active class to clicked button and corresponding panel
        btn.classList.add('active');
        const targetId = btn.dataset.tab;
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  // 5. Mobile Navigation Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navWrapper = document.querySelector('.nav-menu-wrapper');

  if (menuToggle && navWrapper) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navWrapper.classList.toggle('open');
      if (isOpen) {
        menuToggle.innerHTML = '&times;';
      } else {
        menuToggle.innerHTML = '&#9776;';
      }
    });
  }

  // 6. Theme Toggle (Light / Dark Mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
  }
});
