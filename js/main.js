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
  const show = window.scrollY > 560 && window.innerWidth < 900 && !formSubmitted;
  stickyCta.classList.toggle('show', show);
}
window.addEventListener('scroll', updateStickyCta, { passive: true });
window.addEventListener('resize', updateStickyCta);
updateStickyCta();

// Industry examples tabs
const industryData = [
  { label: 'Retail & ecommerce', examples: [
    'Abandoned carts get a friendly nudge',
    'Regulars get a birthday discount automatically',
    'Restock alerts sent before you sell out',
    'Weekly sales summary lands in your inbox',
  ]},
  { label: 'Services', examples: [
    'Every finished job triggers a review request',
    'Quotes are followed up automatically',
    'New enquiries get an instant reply',
    'Seasonal campaigns go out on schedule',
  ]},
  { label: 'Trades', examples: [
    'Missed calls get an instant text back',
    'Job reminders sent the day before',
    'Overdue invoices chased automatically',
    'Customers notified the moment you’re on your way',
  ]},
  { label: 'Health & wellbeing', examples: [
    'Appointment reminders sent automatically',
    'Clients who haven’t been in get a nudge',
    'No-show risk flagged before it happens',
    'Reviews requested after a great session',
  ]},
  { label: 'Membership', examples: [
    'Renewals flagged three weeks out',
    'New members get a warm welcome sequence',
    'Lapsed members get a win-back message',
    'Attendance summarised automatically',
  ]},
];

const checkIconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent);"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 16h5v5"></path></svg>`;

const tabsEl = document.getElementById('industryTabs');
const listEl = document.getElementById('examplesList');
let activeIndustry = 0;

function renderIndustries() {
  tabsEl.innerHTML = industryData.map((ind, i) =>
    `<button class="industry-tab${i === activeIndustry ? ' active' : ''}" data-i="${i}" role="tab">${ind.label}</button>`
  ).join('');
  listEl.innerHTML = industryData[activeIndustry].examples.map(ex =>
    `<div class="example-item">${checkIconSvg}<span>${ex}</span></div>`
  ).join('');
  tabsEl.querySelectorAll('.industry-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeIndustry = Number(btn.dataset.i);
      renderIndustries();
    });
  });
}
renderIndustries();

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
