/* =============================================
   A&R GROUP – JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- AOS Init ---- */
  if (typeof AOS !== 'undefined') {
    AOS.init({ once: true, offset: 80, duration: 800, easing: 'ease-out-cubic' });
  }

  /* ---- Header scroll effect ---- */
  const header = document.getElementById('header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 50);
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Hamburger / mobile nav ---- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      const isOpen = nav.classList.contains('open');
      spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.opacity = isOpen ? '0' : '1';
      spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
    });
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
      });
    });
  }

  /* ---- Scroll to top ---- */
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- Project Slider ---- */
  const slides = document.querySelectorAll('.project-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

  // Auto-advance slider every 6s
  let sliderTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
  const sliderEl = document.getElementById('project-slider');
  if (sliderEl) {
    sliderEl.addEventListener('mouseenter', () => clearInterval(sliderTimer));
    sliderEl.addEventListener('mouseleave', () => {
      sliderTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
    });
  }

  /* ---- Testimonials Slider ---- */
  const testimonialsAll = document.querySelectorAll('.testimonial');
  const testiDots = document.querySelectorAll('.testi-dot');
  let currentTesti = 0;

  function goToTesti(index) {
    testimonialsAll[currentTesti].classList.remove('active');
    testiDots[currentTesti].classList.remove('active');
    currentTesti = (index + testimonialsAll.length) % testimonialsAll.length;
    testimonialsAll[currentTesti].classList.add('active');
    testiDots[currentTesti].classList.add('active');
  }
  testiDots.forEach((dot, i) => dot.addEventListener('click', () => goToTesti(i)));

  let testiTimer = setInterval(() => goToTesti(currentTesti + 1), 5000);

  /* ---- Animated Stat Counters ---- */
  function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = target >= 10 ? '+' : '';
      const duration = 1800;
      const start = performance.now();
      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target) + (progress < 1 ? '' : suffix);
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }

  // Trigger counters when stats section enters viewport
  const statsSection = document.getElementById('stats');
  if (statsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }
  /* ---- Newsletter form ---- */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = document.getElementById('email-input');
      const btn = document.getElementById('btn-subscribe');
      if (!input.value) return;
      btn.textContent = 'SUBSCRIBED ✓';
      btn.style.background = '#2A385A';
      btn.style.color = '#fff';
      input.value = '';
      setTimeout(() => {
        btn.textContent = 'SUBSCRIBE';
        btn.style.background = '';
        btn.style.color = '';
      }, 3500);
    });
  }
  /* ---- Smooth anchor scrolling ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});