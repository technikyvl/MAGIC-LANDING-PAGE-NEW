"use client";

import { useEffect } from "react";

const CONTAINER = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const SPACING = "py-32 sm:py-40 lg:py-48";

export default function WspolpracaPage() {
  useEffect(() => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px 50px 0px" });

    document.querySelectorAll(".reveal, .hero-reveal, .slow-reveal, .central-dot, .line-draw").forEach((el) => revealObserver.observe(el));

    const island = document.getElementById("islandNav");
    const onScroll = () => island?.classList.toggle("island--shrink", window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const handleSmoothScroll = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    const clickHandler = (e) => {
      const t = e.target;
      if (t.tagName === 'A' && t.getAttribute('href')?.startsWith('#')) handleSmoothScroll(e);
    };
    document.addEventListener('click', clickHandler);

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenuToggle && mobileMenu) {
      const onToggle = () => mobileMenu.classList.toggle("hidden");
      mobileMenuToggle.addEventListener("click", onToggle);
    }

    // Prevent iOS/Android rubber-band overscroll at top/bottom
    let startY = 0;
    const onTouchStart = (e) => { startY = e.touches[0]?.clientY || 0; };
    const onTouchMove = (e) => {
      const currentY = e.touches[0]?.clientY || 0;
      const scrollingDownFromTop = window.scrollY <= 0 && currentY > startY;
      const reachedBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight;
      const scrollingUpFromBottom = reachedBottom && currentY < startY;
      if (scrollingDownFromTop || scrollingUpFromBottom) {
        e.preventDefault();
      }
    };
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener('click', clickHandler);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <>
      {/* Header */}
      <div className="sticky top-4 z-50">
        <nav id="islandNav" aria-label="Główna nawigacja"
          className={"mx-auto flex items-center justify-between gap-4 rounded-3xl backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/85 border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,.06)] transition-all duration-300 max-w-5xl px-4 sm:px-8 py-4 sm:py-5"}>
          <a href="/" className="font-extrabold tracking-tight text-neutral-900 text-lg sm:text-xl">
            Magic<span className="text-accent">Life</span>
          </a>
          <ul className="hidden md:flex items-center gap-6 text-sm">
            <li><a href="/\#reviews" className="navlink relative px-3 py-2 whitespace-nowrap">Opinie</a></li>
            <li><a href="/\#pricing" className="navlink relative px-3 py-2 whitespace-nowrap">Cennik</a></li>
            <li><a href="/wspolpraca" className="navlink relative px-3 py-2 whitespace-nowrap">Współpraca</a></li>
            <li><a href="/szkolenia" className="navlink relative px-3 py-2 whitespace-nowrap">Szkolenia</a></li>
          </ul>
          <div className="md:hidden flex items-center gap-3">
            <a href="/#contact" className="inline-flex items-center rounded-xl bg-neutral-900 text-white text-xs sm:text-sm font-semibold px-3 py-2 sm:px-4 sm:py-3 hover:bg-neutral-800 whitespace-nowrap">
              Umów rozmowę
            </a>
            <button id="mobileMenuToggle" className="p-2 rounded-lg hover:bg-neutral-100 transition-colors" aria-label="Otwórz menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <a href="/#contact" className="hidden md:inline-flex items-center rounded-xl bg-neutral-900 text-white text-sm font-semibold px-4 py-3 hover:bg-neutral-800 whitespace-nowrap">
            Umów rozmowę
          </a>
        </nav>
        {/* Mobile Navigation Menu */}
        <div id="mobileMenu" className="md:hidden mt-4 mx-auto max-w-5xl px-4 sm:px-8 hidden">
          <div className="bg-white/95 backdrop-blur-sm border border-white/60 rounded-2xl shadow-lg p-6">
            <ul className="space-y-4">
              <li><a href="/\#reviews" className="block px-4 py-3 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-900 font-medium">Opinie</a></li>
              <li><a href="/\#pricing" className="block px-4 py-3 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-900 font-medium">Cennik</a></li>
              <li><a href="/wspolpraca" className="block px-4 py-3 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-900 font-medium">Współpraca</a></li>
              <li><a href="/szkolenia" className="block px-4 py-3 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-900 font-medium">Szkolenia</a></li>
              <li><a href="/#contact" className="block px-4 py-3 rounded-lg bg-neutral-900 text-white text-center font-semibold">Umów rozmowę</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hero / Intro - enhanced to mirror Szkolenia style (bez emoji) */}
      <section className={"relative bg-white text-neutral-900 pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24 lg:pb-28 overflow-hidden"}>
        {/* Subtle animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent/8 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-24 right-12 w-44 h-44 bg-accent/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>
        <div className={CONTAINER + " text-center flex flex-col items-center justify-center min-h-[70vh] relative"}>
          <div className="relative z-10 max-w-6xl">
            <div className="hero-reveal mb-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5 text-xs sm:text-sm font-medium text-accent backdrop-blur-sm">
                <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse"></span>
                WSPÓŁPRACA — managerska, partnerska i biznesowa
              </div>
            </div>

            <h1 className="hero-reveal font-extrabold leading-[0.98] tracking-[-0.02em] text-[clamp(32px,6.5vw,72px)] max-w-5xl mx-auto">
              <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent">
                Rozwój firmy zaczyna się od człowieka.
              </span>
            </h1>

            <p className="hero-reveal mx-auto mt-4 max-w-4xl text-base sm:text-lg text-neutral-600 leading-relaxed">
              Łączę blisko 20 lat prowadzenia firm z ponad 8-letnim doświadczeniem w pracy z podświadomością ludzi i przedsiębiorców. Wspieram liderów, zespoły i inwestorów w tworzeniu biznesów, które działają — sprawnie, stabilnie i z jakością, która naprawdę ma znaczenie.
            </p>

            {/* Info pill styled similarly to Szkolenia */}
            <div className="hero-reveal mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-neutral-200/50 px-4 py-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm sm:text-base font-semibold text-neutral-900">Partnerstwo operacyjne i strategiczne</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-neutral-300"></div>
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse delay-300"></div>
                <span className="text-sm sm:text-base font-semibold text-neutral-900">Rozwój lidera i zespołu</span>
              </div>
            </div>

            <div className="hero-reveal mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
              <a href="/#contact" className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-800 text-white px-5 py-3 sm:px-8 sm:py-4 font-semibold text-sm sm:text-base hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl w-full sm:w-auto text-center">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span>Umów rozmowę</span>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a href="#czym-sie-zajmuje" className="group rounded-2xl border-2 border-neutral-300 px-5 py-3 sm:px-8 sm:py-4 font-semibold text-neutral-900 hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300 hover:scale-105 w-full sm:w-auto text-center">
                <span className="flex items-center justify-center gap-2">Dowiedz się więcej</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Kim jestem — storyteling timeline */}
      <section id="kim-jestem" className={"relative bg-neutral-950 text-white pt-28 sm:pt-36 pb-20 sm:pb-24 overflow-hidden"}>
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute -top-20 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className={CONTAINER + " relative z-10"}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Photo card */}
            <div className="slow-reveal lg:col-span-5 order-2 lg:order-1">
              <div className="relative h-80 lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl">
                <img src="/testimonials/rav.magic.webp" alt="Ekspert — Magic Life" className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent" />
              </div>
            </div>

            {/* Timeline */}
            <div className="slow-reveal lg:col-span-7 order-1 lg:order-2">
              <div className="mb-8">
                <div className="inline-block h-[2px] w-16 bg-accent mb-6"></div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">Kim jestem</h2>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent/60 via-accent/30 to-transparent" />
                {[
                  { t: "Manager i przedsiębiorca", d: "Ponad 20 lat budowania firm w wielu branżach." },
                  { t: "Strateg i partner", d: "Łączę perspektywę operacyjną ze strategiczną, porządkując chaos wzrostu." },
                  { t: "Trener mentalny", d: "8 lat pracy z podświadomością ludzi i liderów." },
                  { t: "Równowaga twarde/miękkie", d: "Struktury, jakość, odpowiedzialność + psychologia człowieka." },
                ].map((item, i) => (
                  <div key={i} className="relative mb-6 lg:mb-8">
                    <div className="absolute -left-[27px] top-1.5 w-4 h-4 rounded-full bg-accent shadow-[0_0_0_4px_rgba(255,99,71,.15)]" />
                    <h3 className="text-xl font-bold text-white">{item.t}</h3>
                    <p className="text-neutral-300 mt-1">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Czym się zajmuję */}
      <section id="section-what-i-do" className={"bg-white text-neutral-900 " + SPACING}>
        <div className={CONTAINER}>
          {/* Invisible anchor for optional id without changing visible content */}
          <div id="what-i-do" className="hidden" aria-hidden="true"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div id="what-i-do-text" className="slow-reveal lg:col-span-7 self-start mt-0 pt-0 text-lg text-neutral-700 leading-relaxed space-y-4 [&>*:first-child]:mt-0 [&>p]:m-0">
              {/* Przeniesiony nagłówek do lewej kolumny, aby obniżyć go razem z tekstem */}
              <div className="mt-28 sm:mt-40 lg:mt-48 mb-6">
                <div className="inline-block h-[2px] w-16 bg-accent mb-6"></div>
                <h2 className="slow-reveal text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">Czym się zajmuję</h2>
              </div>
              <p>Zajmuję się rozwojem biznesu i pośrednictwem gospodarczym – pomagam firmom znaleźć finansowanie, partnerów i klientów, a przedsiębiorcom uporządkować pomysły tak, by naprawdę działały.</p>
              <p>W pracy łączę perspektywę managera, partnera i stratega biznesowego. Wchodzę do firmy i widzę więcej — to, co ukryte pod codziennością: niewykorzystane możliwości, błędne założenia, słabe punkty komunikacji.</p>
              <p>Z tych elementów tworzę strukturę, która pozwala rosnąć szybciej, klarowniej i z większym spokojem w decyzjach.</p>
            </div>
            <div id="what-i-do-media" className="slow-reveal lg:col-span-5 self-start mt-0 pt-0 lg:-mt-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/testimonials/Praktyk hipnozy 2.webp" 
                  alt="Praktyk hipnozy - Magic Life" 
                  className="block w-full h-[28rem] sm:h-[32rem] lg:h-[36rem] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent"></div>
                {/* Card overlay on large screens; stacked below image on mobile */}
                <div className="relative lg:absolute lg:bottom-6 lg:left-6 lg:right-6 mt-4 lg:mt-0">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">Usługi</h3>
                    <ul className="space-y-2">
                      {["diagnoza sytuacji i priorytetów","mapowanie możliwości i ryzyk","porządkowanie komunikacji i procesów","wdrożenie struktur i odpowiedzialności"].map((t,i)=> (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-neutral-700">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doświadczenie — dynamic clusters */}
      <section id="doswiadczenie" className={"relative bg-neutral-950 text-white " + SPACING}>
        {/* subtle animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-8 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-12 w-56 h-56 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className={CONTAINER + " relative z-10"}>
          <div className="text-center mb-12">
            <div className="inline-block h-[2px] w-16 bg-accent mb-6" />
            <h2 className="slow-reveal text-4xl sm:text-5xl lg:text-6xl font-extrabold">Doświadczenie</h2>
            <p className="mt-3 text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base">Obszary, w których działam na co dzień — połączone w praktyczne kompetencje.</p>
          </div>

          {/* layout: sticky summary left + interactive grid right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* LEFT: Branże (sticky on desktop) */}
            <aside className="slow-reveal lg:col-span-5">
              <div className="lg:sticky lg:top-28 rounded-2xl overflow-hidden bg-gradient-to-b from-white/10 to-white/5 border border-white/10">
                <div className="p-6">
                  <h3 className="text-xl font-semibold">Branże</h3>
                  <p className="mt-1 text-neutral-400 text-sm">Przekrój sektorów, w których współtworzyłem procesy i wzrost.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Transport","Maszyny","Sport","Suplementy","Beauty","Prawo","Nieruchomości"].map((b,i)=> (
                      <span key={i} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-neutral-200 text-sm hover:bg-white/15 transition-colors">{b}</span>
                    ))}
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-neutral-300">
                    {["+20 lat w biznesie","7 branż","operacje i strategia","mentoring liderów"].map((s,idx)=> (
                      <div key={idx} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-center">{s}</div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* RIGHT: Kompetencje jako interaktywne karty */}
            <div className="slow-reveal lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {t:"Operacje i strategia",d:"Porządkowanie operacji, cele, metryki i wykonanie.",i:0},
                  {t:"Procesy i optymalizacja",d:"Mapa procesów, wąskie gardła, ciągłe usprawnienia.",i:1},
                  {t:"Struktury i wzrost",d:"Role, odpowiedzialności, plan skalowania.",i:2},
                  {t:"Mentoring liderów",d:"Decyzyjność, komunikacja i odporność mentalna.",i:3},
                  {t:"Pośrednictwo gospodarcze",d:"Synergie między ludźmi, projektami i kapitałem.",i:4},
                  {t:"Synergie projektów i kapitału",d:"Łączenie partnerstw i finansowania do wzrostu.",i:5},
                  {t:"Kultura jakości",d:"Standardy, odpowiedzialność i feedback, które działają.",i:6},
                ].map(({t,d,i})=> (
                  <article key={t} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,0,0,.25)]">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br from-accent/30 to-orange-500/30" />
                    <div className="relative z-10 flex items-start gap-3">
                      <span className="mt-1 inline-block w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(255,120,96,.15)]" />
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg">{t}</h3>
                        <p className="mt-1 text-sm text-neutral-300 leading-relaxed">{d}</p>
                      </div>
                    </div>
                    <div className="relative z-10 mt-4 flex items-center justify-between text-xs text-neutral-400">
                      <span className="inline-flex items-center gap-2"><span className="h-1 w-6 bg-accent/60 rounded-full"/>case {String(i+1).padStart(2,'0')}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">Rozwiń →</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formy współpracy — creative tiles */}
      <section id="formy" className={"relative bg-white text-neutral-900 " + SPACING}>
        <div className={CONTAINER}>
          <div className="text-center mb-12">
            <div className="inline-block h-[2px] w-16 bg-accent mb-6"></div>
            <h2 className="slow-reveal text-4xl sm:text-5xl lg:text-6xl font-extrabold">Formy współpracy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              ["Manager operacyjny / strategiczny","Wchodzę do firmy, by zobaczyć to, czego inni nie widzą — i poukładać wszystko tak, żeby zaczęło działać płynnie i z jakością."],
              ["Partner biznesowy do wzrostu","Pokazuję kierunki, które potrafią całkowicie odmienić tempo, jakość i sens rozwoju firmy."],
              ["Rozwój mentalny lidera i zespołu","Pomagam odzyskać spokój, koncentrację i zaangażowanie — tworząc kulturę jakości, odpowiedzialności i zaufania."]
            ].map(([t,d],i)=> (
              <article key={i} className="slow-reveal group relative rounded-2xl border border-neutral-200 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,.1)] transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-orange-500/5 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">{String(i+1).padStart(2,'0')}</span>
                  <div className="h-2 w-2 rounded-full bg-accent"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">{t}</h3>
                <p className="text-neutral-600 leading-relaxed">{d}</p>
                {/* CTA removed per request */}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Dla kogo — audience cards */}
      <section id="dla-kogo" className={"relative bg-neutral-950 text-white " + SPACING}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 right-24 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className={CONTAINER + " relative z-10"}>
          <div className="text-center mb-12">
            <div className="inline-block h-[2px] w-16 bg-accent mb-6" />
            <h2 className="slow-reveal text-4xl sm:text-5xl lg:text-6xl font-extrabold">Dla kogo</h2>
            <p className="mt-4 text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base">Profil osób i firm, z którymi osiągamy najlepsze efekty.</p>
          </div>

          {/* network layout with central line and connectors */}
          <div className="relative mt-10 sm:mt-12 lg:mt-16">
            {/* central vertical line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gradient-to-b from-white/30 via-white/15 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* LEFT stack (3) aligned to right with connectors - no boxes */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                {["Dla przedsiębiorców, którzy cenią jakość — w sobie, w ludziach i w firmie.","Dla liderów, którzy chcą budować stabilny, świadomy biznes.","Dla firm w fazie wzrostu, zmiany lub przebudowy organizacyjnej."].map((txt,idx)=> (
                  <div key={idx} className={`slow-reveal relative py-4 ${idx===1?'lg:mt-12':idx===2?'lg:mt-20':''}`}>
                    {/* connector to central line */}
                    <span className="hidden lg:block absolute right-[-24px] top-1/2 -translate-y-1/2 h-px w-6 bg-white/25" />
                    <div className="relative z-10 flex items-center justify-end gap-4 text-right">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 text-accent font-extrabold text-base sm:text-lg border border-accent/30">
                        {String(idx * 2 + 1).padStart(2,'0')}
                      </span>
                      <p className="text-neutral-200 text-lg sm:text-xl leading-relaxed max-w-2xl">{txt}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* middle spacer for vertical line */}
              <div className="hidden lg:block lg:col-span-2" />

              {/* RIGHT stack (2) aligned to left with connectors - no boxes */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                {["Dla inwestorów i właścicieli, którzy chcą rozwijać swoje projekty poprzez mądre partnerstwa i połączenia kapitału.","Dla zespołów, które potrzebują spójności, jasności i nowej energii."].map((txt,idx)=> (
                  <div key={idx} className={`slow-reveal relative py-4 ${idx===0?'lg:mt-16':'lg:mt-28'}` }>
                    {/* connector to central line */}
                    <span className="hidden lg:block absolute left-[-24px] top-1/2 -translate-y-1/2 h-px w-6 bg-white/25" />
                    <div className="relative z-10 flex items-center gap-4">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 text-accent font-extrabold text-base sm:text-lg border border-accent/30">
                        {String(idx * 2 + 2).padStart(2,'0')}
                      </span>
                      <p className="text-neutral-200 text-lg sm:text-xl leading-relaxed max-w-2xl">{txt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* bottom callout spanning the grid */}
            <div className="mt-16 lg:mt-24 rounded-2xl border border-white/10 bg-white/5 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(255,120,96,.15)]" />
                <p className="text-neutral-300 text-sm sm:text-base">Nie wiesz, gdzie najlepiej zacząć? 30-minutowa rozmowa pomoże ustalić kierunek.</p>
              </div>
              <a href="/#contact" className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition-all">
                Umów rozmowę
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Efekty współpracy — creative stats */}
      <section id="efekty" className={"relative bg-white text-neutral-900 " + SPACING}>
        <div className={CONTAINER}>
          <div className="text-center mb-12">
            <div className="inline-block h-[2px] w-16 bg-accent mb-6"></div>
            <h2 className="slow-reveal text-3xl sm:text-4xl font-extrabold">Efekty współpracy</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Klarowność decyzji", p: 90 },
              { t: "Jakość procesów", p: 85 },
              { t: "Stabilny wzrost", p: 80 },
              { t: "Lekkość działania", p: 88 },
              { t: "Zaangażowanie zespołu", p: 92 },
              { t: "Zyskowność", p: 84 },
            ].map((e,i)=> (
              <div key={i} className="slow-reveal rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,.06)]">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">{e.t}</h3>
                <div className="w-full h-2.5 rounded-full bg-neutral-200 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-accent to-orange-500" style={{ width: e.p + '%' }} />
                </div>
                <div className="mt-2 text-sm text-neutral-500">~{e.p}% poprawy</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Kontakt */}
      <section className="bg-gradient-to-br from-neutral-50 to-white py-16 sm:py-20 relative overflow-hidden">
        {/* Subtle background accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
        <div className={CONTAINER + " text-center relative z-10"}>
          <div className="slow-reveal mx-auto max-w-3xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight">Porozmawiajmy</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 leading-relaxed">
              Jeśli czujesz, że Twój biznes może działać z większą jakością, klarownością i spokojem, zrób pierwszy krok. Umów się na bezpłatną rozmowę wstępną (30 minut online). Zobaczmy, czy możemy stworzyć coś wyjątkowego razem.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <a href="/#contact" className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-800 text-white px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <span className="relative z-10">Umów rozmowę</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a href="#formy" className="group rounded-2xl border-2 border-neutral-300 px-8 py-4 font-semibold text-neutral-900 hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300">
                Zobacz formy współpracy
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-neutral-950 to-black text-neutral-300">
        <div className={CONTAINER + " py-16 sm:py-20"}>
          <div className="grid gap-12 lg:grid-cols-3 md:grid-cols-2">
            <div className="lg:col-span-1">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Magic<span className="text-accent">Life</span>
              </div>
              <p className="mt-4 text-lg text-neutral-400 leading-relaxed">
                Managerska, partnerska i biznesowa współpraca dla firm i liderów
              </p>
            </div>
            <nav className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-6">Nawigacja</h3>
              <div className="grid grid-cols-2 gap-4">
                <a href="#kim-jestem" className="text-base hover:text-accent transition-colors duration-300">Kim jestem</a>
                <a href="#czym-sie-zajmuje" className="text-base hover:text-accent transition-colors duration-300">Czym się zajmuję</a>
                <a href="#doswiadczenie" className="text-base hover:text-accent transition-colors duration-300">Doświadczenie</a>
                <a href="#formy" className="text-base hover:text-accent transition-colors duration-300">Formy</a>
                <a href="#dla-kogo" className="text-base hover:text-accent transition-colors duration-300">Dla kogo</a>
                <a href="#efekty" className="text-base hover:text-accent transition-colors duration-300">Efekty</a>
                <a href="/polityka-prywatnosci" className="text-base hover:text-accent transition-colors duration-300">Polityka prywatności</a>
                <a href="/#contact" className="text-base hover:text-accent transition-colors duration-300">Kontakt</a>
              </div>
            </nav>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-6">Kontakt</h3>
              <div className="space-y-3">
                <a className="block text-base hover:text-accent transition-colors duration-300" href="mailto:kontakt@magiclife.pl">kontakt@magiclife.pl</a>
                <a className="block text-base hover:text-accent transition-colors duration-300" href="https://wa.me/48602200511">WhatsApp</a>
              </div>
            </div>
          </div>
          <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
          <div className="mt-8 text-center">
            <p className="text-base text-neutral-500">© <span id="year"></span> Magic Life. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </>
  );
}


