/* ════════════════════════════════════════════════════
   HITAISHI PANDEY PORTFOLIO — script.js
════════════════════════════════════════════════════ */

/* ── Custom Cursor ── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, [data-tilt]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
    cursorRing.classList.add('active');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
    cursorRing.classList.remove('active');
  });
});


/* ── Stars Canvas ── */
const canvas = document.getElementById('stars');
const ctx    = canvas.getContext('2d');
let stars    = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      r:       Math.random() * 1.4 + 0.2,
      alpha:   Math.random(),
      speed:   Math.random() * 0.4 + 0.05,
      twinkle: Math.random() * 0.02 + 0.005,
      dir:     Math.random() > 0.5 ? 1 : -1
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.alpha += s.twinkle * s.dir;
    if (s.alpha >= 1 || s.alpha <= 0) s.dir *= -1;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 232, 255, ${s.alpha * 0.7})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

resizeCanvas();
createStars(220);
drawStars();

window.addEventListener('resize', () => {
  resizeCanvas();
  createStars(220);
});


/* ── Navbar scroll effects ── */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});


/* ── Mobile hamburger ── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  hamburger.classList.toggle('open');
});
navLinks.forEach(a => {
  a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});


/* ── Reveal on scroll ── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const parent = entry.target.closest(
        '.about-grid, .projects-grid, .timeline, .contact-grid'
      );
      if (parent) {
        parent.querySelectorAll('.reveal').forEach((el, idx) => {
          setTimeout(() => el.classList.add('visible'), idx * 120);
        });
      } else {
        entry.target.classList.add('visible');
      }
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));


/* ── Skill bars animate on scroll ── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        const w = fill.dataset.width;
        setTimeout(() => { fill.style.width = w + '%'; }, 300);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillSection = document.querySelector('.about-skills');
if (skillSection) skillObserver.observe(skillSection);


/* ── Tilt effect on project cards ── */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect    = card.getBoundingClientRect();
    const centerX = rect.left + rect.width  / 2;
    const centerY = rect.top  + rect.height / 2;
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -6;
    const rotateY = ((e.clientX - centerX) / (rect.width  / 2)) *  6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});


/* ── Glitch title effect ── */
const heroLines = document.querySelectorAll('.hero-title .line1, .hero-title .line2');
function glitchEffect() {
  heroLines.forEach(line => {
    line.style.textShadow = `2px 0 var(--magenta), -2px 0 var(--cyan), 0 0 20px rgba(0,245,255,0.6)`;
    setTimeout(() => { line.style.textShadow = ''; }, 80);
  });
}
setInterval(glitchEffect, 4000);


/* ── Typing cursor blink on hero line3 ── */
const heroline3 = document.querySelector('.hero-title .line3');
if (heroline3) {
  let showCursor = true;
  setInterval(() => {
    showCursor = !showCursor;
    heroline3.style.borderRight = showCursor
      ? '3px solid var(--magenta)'
      : '3px solid transparent';
  }, 530);
}


/* ── Contact form ── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn     = form.querySelector('.btn-submit span');
    const origTxt = btn.textContent;
    const btnEl   = form.querySelector('.btn-submit');

    btn.textContent   = 'SENDING...';
    btnEl.style.opacity = '0.7';

    setTimeout(() => {
      btn.textContent         = '✓ MESSAGE SENT!';
      btnEl.style.color       = '#00ff88';
      btnEl.style.borderColor = '#00ff88';
      form.reset();

      setTimeout(() => {
        btn.textContent         = origTxt;
        btnEl.style.color       = '';
        btnEl.style.borderColor = '';
        btnEl.style.opacity     = '';
      }, 3000);
    }, 1500);
  });
}


/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  });
});


/* ── Neon ambient mouse glow ── */
const glowEl = document.createElement('div');
glowEl.style.cssText = `
  position: fixed; pointer-events: none; z-index: 0;
  width: 400px; height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: left 0.3s ease, top 0.3s ease;
`;
document.body.appendChild(glowEl);
document.addEventListener('mousemove', (e) => {
  glowEl.style.left = e.clientX + 'px';
  glowEl.style.top  = e.clientY + 'px';
});


/* ── Particle burst on click ── */
function spawnParticle(x, y) {
  for (let i = 0; i < 10; i++) {
    const p     = document.createElement('div');
    const angle = (Math.PI * 2 / 10) * i;
    const dist  = 40 + Math.random() * 40;
    const dx    = Math.cos(angle) * dist;
    const dy    = Math.sin(angle) * dist;

    p.style.cssText = `
      position:fixed; pointer-events:none; z-index:9999;
      width:4px; height:4px; border-radius:50%;
      background:${Math.random() > 0.5 ? 'var(--cyan)' : 'var(--magenta)'};
      left:${x}px; top:${y}px;
      transform:translate(-50%,-50%);
      transition:all 0.5s ease-out;
      opacity:1;
      box-shadow:0 0 6px currentColor;
    `;
    document.body.appendChild(p);
    requestAnimationFrame(() => {
      p.style.left    = (x + dx) + 'px';
      p.style.top     = (y + dy) + 'px';
      p.style.opacity = '0';
    });
    setTimeout(() => p.remove(), 550);
  }
}
document.addEventListener('click', (e) => spawnParticle(e.clientX, e.clientY));


/* ── Counter animation for stats ── */
function animateCounter(el, target, duration = 1400) {
  // If it's a number, animate. If it's text like "IT", skip.
  if (isNaN(target)) return;
  let start = 0;
  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(num => {
        const val = parseInt(num.textContent);
        if (!isNaN(val)) animateCounter(num, val);
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.about-stats');
if (statsEl) statObserver.observe(statsEl);