// ── NAVBAR SCROLL SHADOW ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── MOBILE MENU ──
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ── HERO SLIDESHOW ──
// img01: kitchen counter glove  img02: mop & bucket on stairs
// img04: wiping granite counter  img05: cleaning bucket on tiles
// img06: wiping wooden table     img11: blue mop on wet floor
const heroImages = [
  'img01.jpg',
  'img02.jpg',
  'img04.jpg',
  'img05.jpg',
  'img06.jpg',
  'img11.jpg',
];

let slideIndex = 0;
const slidesEl = document.getElementById('heroSlides');
const indEl = document.getElementById('heroIndicators');

heroImages.forEach((src, i) => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = '';
  img.style.opacity = i === 0 ? '1' : '0';
  slidesEl.appendChild(img);

  const btn = document.createElement('button');
  btn.className = 'hero-dot-btn' + (i === 0 ? ' active' : '');
  btn.setAttribute('aria-label', 'Slide ' + (i + 1));
  btn.onclick = () => goToSlide(i);
  indEl.appendChild(btn);
});

function goToSlide(n) {
  const imgs = slidesEl.querySelectorAll('img');
  const btns = indEl.querySelectorAll('.hero-dot-btn');
  imgs[slideIndex].style.opacity = '0';
  btns[slideIndex].classList.remove('active');
  slideIndex = n;
  imgs[slideIndex].style.opacity = '1';
  btns[slideIndex].classList.add('active');
}

setInterval(() => goToSlide((slideIndex + 1) % heroImages.length), 5000);

// ── BOOKING FORM ──
document.getElementById('date').min = new Date().toISOString().split('T')[0];

function submitForm(e) {
  e.preventDefault();
  const errs = [];
  if (!document.getElementById('fname').value.trim()) errs.push('First name is required');
  if (!document.getElementById('email').value.trim()) errs.push('Email address is required');
  if (!document.getElementById('service').value) errs.push('Please select a service');

  const errEl = document.getElementById('formErrors');
  if (errs.length) {
    errEl.style.display = 'block';
    errEl.innerHTML = '<ul>' + errs.map(e => '<li>' + e + '</li>').join('') + '</ul>';
    return;
  }

  errEl.style.display = 'none';
  document.getElementById('formContent').innerHTML = `
    <div class="form-success">
      <h3>Booking Request Sent!</h3>
      <p>Thank you — we've received your request and will be in touch within a few hours to confirm your booking and discuss your requirements.</p>
      <a href="#services" class="btn-outline">Browse Our Services</a>
    </div>
  `;
}

// ── FADE-UP SCROLL ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
