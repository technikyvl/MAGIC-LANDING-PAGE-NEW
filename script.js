// utilities
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

// year
$('#year').textContent = new Date().getFullYear();

// reveal on scroll
const revealEls = $$('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  })
}, { threshold: 0.6 });
revealEls.forEach(el => io.observe(el));

// sticky island shrink on scroll
const island = $('#islandNav');
window.addEventListener('scroll', () => {
  island.classList.toggle('island--shrink', window.scrollY > 6);
}, { passive: true });

// active nav link tracking
const sectionIds = ['why','for','process','reviews','faq','contact'];
const secObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      $$('.navlink').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] });
sectionIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) secObserver.observe(el);
});

// FAQ data + accordion
const faq = [
  ["Na czym polega hipnoterapia i SET?", "Pracujemy w lekkim transie nad emocjami/obrazami, wprowadzając trwałe zmiany na poziomie podświadomości."],
  ["Ile trwa sesja / ile potrzeba?", "Sesja 60–90 min. Często wystarcza 1–3 spotkania, zależnie od tematu."],
  ["Czy to bezpieczne? Czy będę pamiętać sesję?", "Tak. Pełna świadomość, pełna kontrola. Większość osób pamięta przebieg pracy."],
  ["Jak się przygotować?", "Spokojna przestrzeń, wygodne słuchawki (online), jasny cel pracy."],
  ["Online czy stacjonarnie? Gwarancje?", "Pracuję obie formy. Gwarancja rzetelnej pracy — bez obietnic medycznych."]
];
const faqList = document.getElementById('faqList');
faq.forEach(([q, a], i) => {
  const row = document.createElement('div');
  row.className = 'px-5 sm:px-6 py-4';
  row.innerHTML = \`
    <button class="flex w-full items-center justify-between text-left faq-btn" aria-expanded="\${i===0}">
      <span class="font-semibold">\${q}</span>
      <span class="ml-4 select-none">\${i===0 ? '–' : '+'}</span>
    </button>
    <div class="faq-panel overflow-hidden" style="height:\${i===0 ? 'auto' : 0}; opacity:\${i===0 ? 1 : 0}">
      <p class="mt-3 pb-3 text-neutral-600">\${a}</p>
    </div>
  \`;
  faqList.appendChild(row);
});
faqList.addEventListener('click', (e) => {
  const btn = e.target.closest('.faq-btn');
  if (!btn) return;
  const panel = btn.parentElement.querySelector('.faq-panel');
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!open));
  btn.querySelector('span:last-child').textContent = open ? '+' : '–';
  if (open) {
    panel.style.height = 0;
    panel.style.opacity = 0;
  } else {
    panel.style.height = 'auto';
    const h = panel.clientHeight + 'px';
    panel.style.height = 0;
    requestAnimationFrame(() => {
      panel.style.height = h;
      panel.style.opacity = 1;
    });
  }
});

// draw timeline when visible
const timeline = document.getElementById('timelinePath');
const lineObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      timeline.classList.add('drawn');
      lineObserver.unobserve(timeline);
    }
  })
}, { threshold: 0.4 });
if (timeline) lineObserver.observe(timeline);
