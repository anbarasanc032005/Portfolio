/* ============================================
   ANBARASAN C — Portfolio Script
   ============================================ */

// ===== WAIT FOR DOM =====
document.addEventListener('DOMContentLoaded', () => {

  // ===== PARTICLES.JS =====
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 55, density: { enable: true, value_area: 900 } },
        color:  { value: '#38BDF8' },
        shape:  { type: 'circle' },
        opacity: {
          value: 0.22,
          random: true,
          anim: { enable: true, speed: 0.4, opacity_min: 0.06, sync: false }
        },
        size: {
          value: 2.2,
          random: true,
          anim: { enable: false }
        },
        line_linked: {
          enable: true,
          distance: 145,
          color: '#2563EB',
          opacity: 0.12,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.65,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: false },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.3 } }
        }
      },
      retina_detect: true
    });
  }

  // ===== AOS =====
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');

  function handleScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  // ===== TYPING ANIMATION =====
  const roles = [
    'Frontend Developer',
    'Data Analyst',
    'Aspiring Cloud Engineer'
  ];

  const typedEl = document.getElementById('typed-text');
  let  roleIdx  = 0;
  let  charIdx  = 0;
  let  deleting = false;
  let  pauseMs  = 0;

  function typeLoop() {
    const current = roles[roleIdx];

    if (deleting) {
      charIdx--;
      typedEl.textContent = current.slice(0, charIdx);
      pauseMs = 45;
    } else {
      charIdx++;
      typedEl.textContent = current.slice(0, charIdx);
      pauseMs = 80;
    }

    if (!deleting && charIdx === current.length) {
      // Pause at the end before deleting
      pauseMs = 1800;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
      pauseMs  = 400;
    }

    setTimeout(typeLoop, pauseMs);
  }

  // Small initial delay so the name animates in first
  setTimeout(typeLoop, 800);

  // ===== SMOOTH ACTIVE-LINK HIGHLIGHT =====
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(a => {
          a.classList.toggle(
            'active',
            a.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { threshold: 0.35, rootMargin: '-64px 0px -30% 0px' });

  sections.forEach(s => observer.observe(s));

});
