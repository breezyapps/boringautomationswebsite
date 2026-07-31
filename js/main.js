// Hero phrase rotation
const HERO_PHRASES = [
  'Increase your brand’s visibility.',
  'Generate more leads and sales.',
  'Delight more customers.',
  'Spend less time on boring work.',
];
let phraseIndex = 0;
const heroPhraseEl = document.getElementById('heroPhrase');
setInterval(() => {
  heroPhraseEl.classList.add('fading');
  setTimeout(() => {
    phraseIndex = (phraseIndex + 1) % HERO_PHRASES.length;
    heroPhraseEl.textContent = HERO_PHRASES[phraseIndex];
    heroPhraseEl.classList.remove('fading');
  }, 260);
}, 2600);

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
}));

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Sticky mobile CTA
const stickyCta = document.getElementById('stickyCta');
const contactSection = document.getElementById('contact');
let formSubmitted = false;
function updateStickyCta() {
  const nearContact = contactSection.getBoundingClientRect().top < window.innerHeight;
  const show = window.scrollY > 560 && window.innerWidth < 900 && !formSubmitted && !nearContact;
  stickyCta.classList.toggle('show', show);
}
window.addEventListener('scroll', updateStickyCta, { passive: true });
window.addEventListener('resize', updateStickyCta);
updateStickyCta();

// Contact form
const FORM_ENDPOINT = 'https://formspree.io/f/mzdnqgkd';

const form = document.getElementById('contactForm');
const thanksCard = document.getElementById('thanksCard');
const formError = document.getElementById('formError');
const submitBtn = document.getElementById('formSubmitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.classList.add('pulse');
  setTimeout(() => submitBtn.classList.remove('pulse'), 260);
  formError.classList.remove('show');

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    });
    if (!res.ok) throw new Error('form submit failed');
    formSubmitted = true;
    form.style.display = 'none';
    thanksCard.style.display = 'block';
    updateStickyCta();
  } catch (err) {
    formError.classList.add('show');
  }
});
