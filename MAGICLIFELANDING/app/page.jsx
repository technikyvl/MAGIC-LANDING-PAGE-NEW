'use client';

import { useEffect } from "react";

const CONTAINER = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const SPACING = "py-32 sm:py-40 lg:py-48";

export default function Page() {
  useEffect(() => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // reveal
    const revealEls = Array.from(document.querySelectorAll(".reveal"));
    const heroRevealEls = Array.from(document.querySelectorAll(".hero-reveal"));
    const slowRevealEls = Array.from(document.querySelectorAll(".slow-reveal"));
    const centralDots = Array.from(document.querySelectorAll(".central-dot"));
    const lineDraws = Array.from(document.querySelectorAll(".line-draw"));
    
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    
    revealEls.forEach((el) => io.observe(el));
    heroRevealEls.forEach((el) => io.observe(el));
    slowRevealEls.forEach((el) => io.observe(el));
    centralDots.forEach((el) => io.observe(el));
    lineDraws.forEach((el) => io.observe(el));

    // shrink island
    const island = document.getElementById("islandNav");
    const onScroll = () => island?.classList.toggle("island--shrink", window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // active nav
    const ids = ["why", "for", "process", "reviews", "faq", "contact"];
    const secObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          document.querySelectorAll(".navlink").forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id);
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] });
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) secObs.observe(el);
    });

    // timeline draw
    const timeline = document.getElementById("timelinePath");
    if (timeline) {
      const lineObs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            timeline.classList.add("drawn");
            lineObs.unobserve(timeline);
          }
        });
      }, { threshold: 0.4 });
      lineObs.observe(timeline);
    }

    // tree root animation
    const treeRoots = Array.from(document.querySelectorAll(".tree-root"));
    const rootBranches = Array.from(document.querySelectorAll(".root-branch"));
    const statReveals = Array.from(document.querySelectorAll(".stat-reveal"));
    
    const rootObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          // Animate main root first
          setTimeout(() => {
            treeRoots.forEach(root => root.classList.add("drawn"));
          }, 100);
          
          // Then animate branches sequentially
          setTimeout(() => {
            rootBranches.forEach((branch, index) => {
              setTimeout(() => {
                branch.classList.add("drawn");
              }, index * 150); // Stagger each branch by 150ms
            });
          }, 600);
          
          // Finally animate statistics
          setTimeout(() => {
            statReveals.forEach((stat, index) => {
              setTimeout(() => {
                stat.classList.add("visible");
              }, index * 100); // Stagger each stat by 100ms
            });
          }, 1200);
          
          rootObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    
    const rootContainer = document.getElementById("rootContainer");
    if (rootContainer) rootObs.observe(rootContainer);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* 0) Header */}
      <div className="sticky top-4 z-50">
        <nav id="islandNav" aria-label="Główna nawigacja"
          className={"mx-auto flex items-center gap-3 rounded-3xl backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/85 border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,.06)] transition-all duration-300 max-w-4xl px-6 py-4"}>
          <a href="#" className="font-extrabold tracking-tight text-neutral-900">
            Magic<span className="text-accent">Life</span>
          </a>
          <ul className="hidden md:flex items-center gap-3 text-sm">
            <li><a href="#why" className="navlink relative px-2 py-1">Dlaczego</a></li>
            <li><a href="#for" className="navlink relative px-2 py-1">Dla kogo</a></li>
            <li><a href="#process" className="navlink relative px-2 py-1">Proces</a></li>
            <li><a href="#reviews" className="navlink relative px-2 py-1">Opinie</a></li>
            <li><a href="#faq" className="navlink relative px-2 py-1">FAQ</a></li>
            <li><a href="#contact" className="navlink relative px-2 py-1">Kontakt</a></li>
          </ul>
          <a href="#contact" className="ml-auto inline-flex items-center rounded-xl bg-neutral-900 text-white text-sm font-semibold px-3 py-2 hover:bg-neutral-800">
            Umów konsultację
          </a>
        </nav>
      </div>

      {/* 1) HERO */}
      <section className={"relative bg-white text-neutral-900 " + SPACING}>
        <div className={CONTAINER + " text-center flex flex-col items-center justify-center min-h-[60vh]"}>
          <span className="hero-reveal inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 text-xs">
            <span className="inline-block h-2 w-2 rounded-full bg-accent"></span>
            Metoda SET (Simple Effective Therapy)
          </span>
          <h1 className="hero-reveal mt-8 font-extrabold leading-[1.04] tracking-[-0.02em] text-[clamp(40px,8vw,76px)] max-w-5xl">
            Hipnoterapia dla ludzi, którzy chcą więcej od życia.
          </h1>
          <p className="hero-reveal mx-auto mt-6 max-w-4xl text-xl text-neutral-600 leading-relaxed">
            Pomagam osobom świadomym – liderom, sportowcom, przedsiębiorcom – uwolnić się od blokad,
            odkryć pełnię swojego potencjału i świadomie tworzyć życie, które kochają.
          </p>
          <div className="hero-reveal mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="rounded-xl bg-neutral-900 text-white px-8 py-4 font-semibold hover:bg-neutral-800 text-lg">Umów konsultację</a>
            <a href="https://wa.me/0000000000" className="rounded-xl border border-neutral-300 px-8 py-4 font-semibold text-neutral-900 hover:bg-neutral-50 text-lg">Napisz na WhatsApp</a>
          </div>
        </div>
      </section>

      {/* 2) Cytat */}
      <section className={"bg-white " + SPACING}>
        <div className={CONTAINER}>
          <div className="reveal">
            <div className="h-[1px] w-16 bg-accent"></div>
            <blockquote className="mt-6 text-2xl sm:text-3xl leading-snug text-neutral-800 max-w-3xl">
              „Nasze życie jest owocem naszych myśli.” — Marek Aureliusz
            </blockquote>
          </div>
        </div>
      </section>

      {/* 3) For whom (dark) */}
      <section id="for" className={"relative bg-neutral-950 text-white " + SPACING}>
        <div className={CONTAINER}>
          <div className="text-center mb-16">
            <h2 className="slow-reveal text-3xl sm:text-4xl font-extrabold">Dla kogo jest ta praca</h2>
            <p className="slow-reveal mt-3 max-w-2xl mx-auto text-neutral-300">Pracuję z ludźmi, którzy są gotowi na głęboką transformację…</p>
          </div>

          <div className="relative min-h-[600px]">
            {/* Central dot and lines SVG */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="forGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF5A3D" />
                  <stop offset="100%" stopColor="#ff2d20" />
                </linearGradient>
              </defs>
              
              {/* Central red dot */}
              <circle className="central-dot" cx="600" cy="80" r="4" fill="url(#forGradient)" />
              
              {/* Lines from central dot to each box - arc layout */}
              <path className="line-draw" d="M600 80 Q300 150 150 350" stroke="url(#forGradient)" strokeWidth="2" fill="none" />
              <path className="line-draw" d="M600 80 Q450 150 350 380" stroke="url(#forGradient)" strokeWidth="2" fill="none" />
              <path className="line-draw" d="M600 80 Q600 150 600 400" stroke="url(#forGradient)" strokeWidth="2" fill="none" />
              <path className="line-draw" d="M600 80 Q750 150 850 380" stroke="url(#forGradient)" strokeWidth="2" fill="none" />
              <path className="line-draw" d="M600 80 Q900 150 1050 350" stroke="url(#forGradient)" strokeWidth="2" fill="none" />
            </svg>

            {/* Boxes arranged in arc layout */}
            <div className="relative mt-16 h-80">
              {/* Box 1 - Left */}
              <div className="slow-reveal absolute left-0 top-0 w-48 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white">Przedsiębiorcy</h3>
                <p className="mt-2 text-sm text-neutral-300">Decyzje, lekkość w rozwoju firmy.</p>
              </div>
              
              {/* Box 2 - Second from left */}
              <div className="slow-reveal absolute left-32 top-12 w-48 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white">Przełamywanie schematów</h3>
                <p className="mt-2 text-sm text-neutral-300">Nowa energia i jasność.</p>
              </div>
              
              {/* Box 3 - Center bottom */}
              <div className="slow-reveal absolute left-1/2 top-24 transform -translate-x-1/2 w-48 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white">Odpowiedzialność</h3>
                <p className="mt-2 text-sm text-neutral-300">Wybierasz rozwój, nie ucieczkę.</p>
              </div>
              
              {/* Box 4 - Second from right */}
              <div className="slow-reveal absolute right-32 top-12 w-48 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white">Sportowcy</h3>
                <p className="mt-2 text-sm text-neutral-300">Pewność siebie, koncentracja, rekordy.</p>
              </div>
              
              {/* Box 5 - Right */}
              <div className="slow-reveal absolute right-0 top-0 w-48 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white">Związki</h3>
                <p className="mt-2 text-sm text-neutral-300">Komunikacja, zaufanie, bliskość.</p>
              </div>
            </div>
          </div>
          
          <p className="slow-reveal mt-8 text-center text-sm text-neutral-300">Jeśli czujesz, że to czas na prawdziwą zmianę — ta praca jest dla Ciebie.</p>
        </div>
      </section>

      {/* 4) Why (white) */}
      <section id="why" className={"bg-white text-neutral-900 " + SPACING}>
        <div className={CONTAINER}>
          <div className="text-center mb-16">
            <h2 className="slow-reveal text-5xl sm:text-6xl font-extrabold">Dlaczego hipnoterapia?</h2>
            <p className="slow-reveal mt-6 max-w-3xl mx-auto text-lg text-neutral-600">
              Hipnoterapia to jedna z najszybszych i najskuteczniejszych metod trwałej zmiany — pracuje na poziomie
              podświadomości (ok. 95% umysłu).
            </p>
          </div>

          <div className="relative min-h-[400px]">
            {/* Central dot and lines SVG */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="whyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF5A3D" />
                  <stop offset="100%" stopColor="#ff2d20" />
                </linearGradient>
              </defs>
              
              {/* Central red dot */}
              <circle className="central-dot" cx="600" cy="80" r="4" fill="url(#whyGradient)" />
              
              {/* Lines from central dot to each box - precise positioning */}
              <path className="line-draw" d="M600 80 Q300 150 150 300" stroke="url(#whyGradient)" strokeWidth="2" fill="none" />
              <path className="line-draw" d="M600 80 Q450 150 330 300" stroke="url(#whyGradient)" strokeWidth="2" fill="none" />
              <path className="line-draw" d="M600 80 Q600 150 510 300" stroke="url(#whyGradient)" strokeWidth="2" fill="none" />
              <path className="line-draw" d="M600 80 Q750 150 690 300" stroke="url(#whyGradient)" strokeWidth="2" fill="none" />
              <path className="line-draw" d="M600 80 Q900 150 870 300" stroke="url(#whyGradient)" strokeWidth="2" fill="none" />
            </svg>

            {/* All boxes in one perfectly aligned horizontal row */}
            <div className="flex justify-center items-center gap-4 mt-16">
              <div className="slow-reveal">
                <div className="rounded-xl border border-neutral-200 bg-white p-3 backdrop-blur-sm w-[140px] h-[100px] flex flex-col justify-center shadow-[0_8px_30px_rgba(0,0,0,.06)]">
                  <div className="text-2xl font-extrabold text-accent">38%</div>
                  <div className="mt-1 text-xs text-neutral-600">Psychoanaliza<br/>(600 sesji)</div>
                </div>
              </div>

              <div className="slow-reveal">
                <div className="rounded-xl border border-neutral-200 bg-white p-3 backdrop-blur-sm w-[140px] h-[100px] flex flex-col justify-center shadow-[0_8px_30px_rgba(0,0,0,.06)]">
                  <div className="text-2xl font-extrabold text-accent">72%</div>
                  <div className="mt-1 text-xs text-neutral-600">Klasyczna terapia<br/>(22 sesji)</div>
                </div>
              </div>

              <div className="slow-reveal">
                <div className="rounded-xl border border-neutral-200 bg-white p-3 backdrop-blur-sm w-[140px] h-[100px] flex flex-col justify-center shadow-[0_8px_30px_rgba(0,0,0,.06)]">
                  <div className="text-2xl font-extrabold text-accent">93%</div>
                  <div className="mt-1 text-xs text-neutral-600">Hipnoterapia<br/>(6 sesji)</div>
                </div>
              </div>

              <div className="slow-reveal">
                <div className="rounded-xl border border-neutral-200 bg-white p-3 backdrop-blur-sm w-[140px] h-[100px] flex flex-col justify-center shadow-[0_8px_30px_rgba(0,0,0,.06)]">
                  <h3 className="font-semibold text-accent text-xs">To nie magia</h3>
                  <p className="mt-1 text-xs text-neutral-600">Naukowo potwierdzona praca z mózgiem. Bezpieczna, konkretna, oparta o mechanizmy uczenia.</p>
                </div>
              </div>

              <div className="slow-reveal">
                <a href="#process" className="block rounded-xl border border-neutral-200 bg-white p-3 hover:bg-neutral-50 transition backdrop-blur-sm w-[140px] h-[100px] flex flex-col justify-center shadow-[0_8px_30px_rgba(0,0,0,.06)]">
                  <h3 className="font-semibold text-accent text-xs">Jak to działa?</h3>
                  <p className="mt-1 text-xs text-neutral-600">Poznaj proces SET <span aria-hidden>→</span></p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5) Process – timeline */}
      <section id="process" className={"relative bg-neutral-950 text-white " + SPACING}>
        <div className={CONTAINER}>
          <h2 className="slow-reveal text-3xl sm:text-4xl font-extrabold">Jak wygląda proces – metoda SET</h2>
          <ul className="slow-reveal mt-4 grid gap-2 text-neutral-300 sm:grid-cols-2">
            {[
              "szybka i skuteczna (często efekt po 1. sesji)",
              "bez rozdrapywania przeszłości",
              "praca na emocjach i obrazach",
              "bezpiecznie i z szacunkiem do granic"
            ].map(b => <li key={b} className="pl-5 before:content-['•'] before:text-accent before:mr-3">{b}</li>)}
          </ul>

          <div className="relative mt-10 grid gap-8 sm:grid-cols-2">
            <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FF5A3D" />
                  <stop offset="100%" stopColor="#ff2d20" />
                </linearGradient>
              </defs>
              <path id="timelinePath" d="M10 10 C 35 25, 65 25, 90 10 S 65 75, 10 90" fill="none" stroke="url(#line)" strokeWidth="0.8" />
            </svg>

            {[
              ["Diagnoza źródła problemu","Odkrywamy, co zatrzymuje."],
              ["Uwolnienie blokad","Bezpieczne oczyszczanie emocji."],
              ["Reprogramowanie podświadomości","Wgrywamy nowe wspierające schematy."],
              ["Implementacja","Świadomie kreujesz codzienność."],
            ].map(([t,d],i)=>(
              <div key={i} className="slow-reveal relative rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm text-neutral-300">0{i+1}</div>
                <h3 className="mt-1 text-lg font-semibold">{t}</h3>
                <p className="mt-1 text-neutral-300">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6) Support */}
      <section className={"bg-white text-neutral-900 " + SPACING}>
        <div className={CONTAINER}>
          <h2 className="slow-reveal text-3xl sm:text-4xl font-extrabold">Zakres wsparcia</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Odblokowanie potencjału (biznes / życie)",
              "Wyższe wyniki w sporcie / karierze",
              "Przełamywanie przekonań",
              "Zdrowe relacje i komunikacja",
              "Praca z traumami",
              "Nałogi / fobie / lęki / prokrastynacja",
              "Spokój / klarowność / równowaga"
            ].map(t => (
              <article key={t} className="slow-reveal group rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,.06)]">
                <h3 className="text-lg font-semibold">{t}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7) Reviews */}
      <section id="reviews" className={"bg-white " + SPACING}>
        <div className={CONTAINER}>
          <h2 className="slow-reveal text-3xl sm:text-4xl font-extrabold text-neutral-900">Opinie klientów</h2>
          <p className="slow-reveal mt-2 text-sm text-neutral-600">Średnia ocen w Google: <strong>5.0/5</strong> (ponad 89 opinii)</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[["Andrzej W.","„…jak nowonarodzony…”"],["Sysia S.","„…po trzech sesjach realna zmiana…”"],["Sebastian B.","„…rozwiązałem problem od lat…”"]].map(([a,t],i)=>(
              <figure key={i} className="slow-reveal rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white font-semibold">{a[0]}</div>
                  <figcaption className="font-medium">{a}</figcaption>
                </div>
                <blockquote className="mt-3 text-neutral-700">{t}</blockquote>
                <div className="mt-3 text-[12px] text-yellow-500">★★★★★</div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 8) Why works short */}
      <section className={"bg-neutral-950 text-white " + SPACING}>
        <div className={CONTAINER}>
          <h2 className="slow-reveal text-3xl sm:text-4xl font-extrabold">Dlaczego to działa</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[["Podświadomość 95%","Tam rodzą się reakcje i schematy."],["Przyspieszenie zmiany","Krótsza droga niż w większości terapii."],["Sprawczość","Odzyskujesz decyzyjność i kierunek."]].map(([t,d],i)=>(
              <div key={i} className="slow-reveal rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-semibold">{t}</h3>
                <p className="mt-2 text-neutral-300">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9) Big CTA */}
      <section className={"bg-white " + SPACING}>
        <div className={CONTAINER + " text-center"}>
          <h2 className="slow-reveal text-3xl sm:text-4xl font-extrabold text-neutral-900">Twoje życie może wyglądać inaczej.</h2>
          <p className="slow-reveal mx-auto mt-3 max-w-2xl text-neutral-600">Zrób pierwszy krok – umów rozmowę wstępną i zobacz, jak szybko możemy wprowadzić trwałą zmianę.</p>
          <div className="slow-reveal mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#contact" className="rounded-xl bg-neutral-900 text-white px-6 py-3 font-semibold hover:bg-neutral-800">Umów konsultację</a>
            <a href="https://wa.me/0000000000" className="rounded-xl border border-neutral-300 px-6 py-3 font-semibold hover:bg-neutral-50">Napisz na WhatsApp</a>
          </div>
        </div>
      </section>

      {/* 10) FAQ */}
      <section id="faq" className={"bg-white " + SPACING}>
        <div className={CONTAINER}>
          <h2 className="slow-reveal text-3xl sm:text-4xl font-extrabold text-neutral-900">FAQ</h2>
          <div className="mt-8 divide-y divide-neutral-200 rounded-2xl border border-neutral-200">
            {[
              ["Na czym polega hipnoterapia i SET?","Pracujemy w lekkim transie nad emocjami/obrazami, wprowadzając trwałe zmiany na poziomie podświadomości."],
              ["Ile trwa sesja / ile potrzeba?","Sesja 60–90 min. Często wystarcza 1–3 spotkania, zależnie od tematu."],
              ["Czy to bezpieczne? Czy będę pamiętać sesję?","Tak. Pełna świadomość, pełna kontrola. Większość osób pamięta przebieg pracy."],
              ["Jak się przygotować?","Spokojna przestrzeń, wygodne słuchawki (online), jasny cel pracy."],
              ["Online czy stacjonarnie? Gwarancje?","Pracuję obie formy. Gwarancja rzetelnej pracy — bez obietnic medycznych."]
            ].map(([q,a],i)=> (
              <details key={i} className="px-5 sm:px-6 py-4 group">
                <summary className="flex cursor-pointer list-none items-center justify-between text-left font-semibold">
                  {q}
                  <span className="ml-4 select-none group-open:hidden">+</span>
                  <span className="ml-4 select-none hidden group-open:inline">–</span>
                </summary>
                <p className="mt-3 pb-1 text-neutral-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11) Contact */}
      <section id="contact" className={"bg-white " + SPACING}>
        <div className={CONTAINER + " grid gap-8 sm:grid-cols-2"}>
          <div>
            <h2 className="slow-reveal text-3xl sm:text-4xl font-extrabold">Skontaktuj się</h2>
            <p className="slow-reveal mt-2 text-neutral-600">Masz pytanie? Napisz, chętnie odpowiem.</p>
            <ul className="slow-reveal mt-6 space-y-2 text-neutral-800">
              <li><a className="underline underline-offset-4 hover:no-underline" href="mailto:hello@magiclife.pl">hello@magiclife.pl</a></li>
              <li><a className="underline underline-offset-4 hover:no-underline" href="https://wa.me/0000000000">WhatsApp</a></li>
              <li><a className="underline underline-offset-4 hover:no-underline" href="#">Kalendarz (wkrótce)</a></li>
            </ul>
          </div>
          <form className="slow-reveal rounded-2xl border border-neutral-200 p-6 bg-white shadow-[0_8px_30px_rgba(0,0,0,.03)]" onSubmit={(e)=>{e.preventDefault(); alert('Dziękuję! Skontaktuję się niebawem.')}}>
            <label className="block text-sm font-medium">Imię</label>
            <input className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-accent" />
            <label className="mt-4 block text-sm font-medium">E-mail</label>
            <input className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-accent" />
            <label className="mt-4 block text-sm font-medium">Wiadomość</label>
            <textarea className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-accent" rows="4"></textarea>
            <button className="mt-6 w-full rounded-xl bg-neutral-900 px-5 py-3 font-semibold text-white hover:bg-neutral-800">Wyślij</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-300">
        <div className={CONTAINER + " py-12"}>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="font-extrabold text-white">Magic<span className="text-accent">Life</span></div>
            <nav className="text-sm space-y-2">
              <a href="#why" className="block hover:text-white">Dlaczego</a>
              <a href="#for" className="block hover:text-white">Dla kogo</a>
              <a href="#process" className="block hover:text-white">Proces</a>
              <a href="#reviews" className="block hover:text-white">Opinie</a>
              <a href="#faq" className="block hover:text-white">FAQ</a>
              <a href="#contact" className="block hover:text-white">Kontakt</a>
            </nav>
            <div className="text-sm">
              <a className="block hover:text-white" href="#">Polityka prywatności</a>
              <a className="block hover:text-white" href="#">Regulamin</a>
            </div>
          </div>
          <div className="mt-8 h-px w-full bg-white/10" />
          <p className="mt-6 text-xs text-neutral-500">© <span id="year"></span> Magic Life. Wszelkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </>
  );
}
