/* ===== DOM ELEMENTS ===== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const backToTop = document.getElementById('backToTop');
const yearSpan = document.getElementById('year');
const typingText = document.getElementById('typing-text');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

/* ===== MOBILE NAVIGATION ===== */
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const icon = hamburger.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    const icon = hamburger.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

/* ===== NAVBAR SCROLL EFFECT ===== */
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

/* ===== ACTIVE NAV LINK HIGHLIGHTING ===== */
function updateActiveLink() {
  let current = '';
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}
window.addEventListener('scroll', updateActiveLink);

/* ===== TYPING ANIMATION ===== */
const typingWords = ['Web Developer', 'Creative Coder', 'Problem Solver'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = typingWords[wordIndex];
  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 120;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 1600;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typingWords.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}
typeEffect();

/* ===== SCROLL REVEAL ANIMATION ===== */
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

/* ===== BACK TO TOP ===== */
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== DYNAMIC COPYRIGHT YEAR ===== */
yearSpan.textContent = new Date().getFullYear();

/* ===== CONTACT FORM VALIDATION ===== */
function showError(input, errorId, message) {
  input.classList.add('invalid');
  document.getElementById(errorId).textContent = message;
}

function clearError(input, errorId) {
  input.classList.remove('invalid');
  document.getElementById(errorId).textContent = '';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formSuccess.textContent = '';

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');

  let isValid = true;

  if (name.value.trim() === '') {
    showError(name, 'nameError', 'Please enter your name.');
    isValid = false;
  } else clearError(name, 'nameError');

  if (!validateEmail(email.value.trim())) {
    showError(email, 'emailError', 'Please enter a valid email address.');
    isValid = false;
  } else clearError(email, 'emailError');

  if (subject.value.trim() === '') {
    showError(subject, 'subjectError', 'Please enter a subject.');
    isValid = false;
  } else clearError(subject, 'subjectError');

  if (message.value.trim() === '') {
    showError(message, 'messageError', 'Please enter your message.');
    isValid = false;
  } else clearError(message, 'messageError');

  if (isValid) {
    formSuccess.textContent = '✅ Message sent successfully! I will get back to you soon.';
    contactForm.reset();
    setTimeout(() => { formSuccess.textContent = ''; }, 5000);
  }
});

/* Clear errors on input */
['name', 'email', 'subject', 'message'].forEach(id => {
  const el = document.getElementById(id);
  const errorId = id + 'Error';
  el.addEventListener('input', () => clearError(el, errorId));
});