'use client';

import { useEffect } from "react";
import Image from "next/image";

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

    // Smooth scroll for anchor links
    const handleSmoothScroll = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Add smooth scroll to all anchor links
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        handleSmoothScroll(e);
      }
    });

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
          className={"mx-auto flex items-center justify-center gap-6 rounded-3xl backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/85 border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,.06)] transition-all duration-300 max-w-4xl px-6 py-4"}>
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
          <a href="#contact" className="inline-flex items-center rounded-xl bg-neutral-900 text-white text-sm font-semibold px-3 py-2 hover:bg-neutral-800">
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
      <section className={"relative bg-neutral-950 text-white py-16"}>
        <div className={CONTAINER}>
          <div className="slow-reveal text-center">
            <div className="inline-block h-[2px] w-16 bg-accent mb-6"></div>
            <blockquote className="text-2xl sm:text-3xl leading-tight font-light text-white max-w-3xl mx-auto">
              „Nasze życie jest owocem naszych myśli."
            </blockquote>
            <div className="mt-6 text-base text-neutral-300 font-medium">
              — Marek Aureliusz
            </div>
          </div>
        </div>
      </section>

      {/* 3) For whom (dark) */}
      <section id="audience" className={"relative bg-neutral-950 text-white " + SPACING}>
        <div className={CONTAINER}>
          <div className="text-center mb-16">
            <h1 className="slow-reveal text-5xl sm:text-6xl lg:text-7xl font-extrabold">Dla kogo jest ta praca</h1>
            <p className="slow-reveal mt-6 max-w-3xl mx-auto text-xl text-neutral-300">Pracuję z ludźmi, którzy są gotowi na głęboką transformację…</p>
          </div>

          <div className="relative min-h-[300px]">
            {/* Cards wrapper - horizontal line layout */}
            <div className="audience-cards audience-ring relative mt-20 h-[300px] flex items-center justify-center">
              {/* Box 1 - Przedsiębiorcy (left-top) */}
              <div className="orbit" style={{'--i': '1'}}>
                <div className="slow-reveal audience-card w-48 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm" data-audience-card="1">
                  <h3 className="text-lg font-semibold text-white">Przedsiębiorcy</h3>
                  <p className="mt-2 text-sm text-neutral-300">Decyzje, lekkość w rozwoju firmy.</p>
                </div>
              </div>
              
              {/* Box 2 - Przełamywanie schematów (right-top) */}
              <div className="orbit" style={{'--i': '2'}}>
                <div className="slow-reveal audience-card w-48 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm" data-audience-card="2">
                  <h3 className="text-lg font-semibold text-white">Przełamywanie schematów</h3>
                  <p className="mt-2 text-sm text-neutral-300">Nowa energia i jasność.</p>
                </div>
              </div>
              
              {/* Box 3 - Związki (left-bottom) */}
              <div className="orbit" style={{'--i': '3'}}>
                <div className="slow-reveal audience-card w-48 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm" data-audience-card="3">
                  <h3 className="text-lg font-semibold text-white">Związki</h3>
                  <p className="mt-2 text-sm text-neutral-300">Komunikacja, zaufanie, bliskość.</p>
                </div>
              </div>

              {/* Box 4 - Odpowiedzialność (center-bottom) */}
              <div className="orbit" style={{'--i': '4'}}>
                <div className="slow-reveal audience-card w-48 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm" data-audience-card="4">
                  <h3 className="text-lg font-semibold text-white">Odpowiedzialność</h3>
                  <p className="mt-2 text-sm text-neutral-300">Wybierasz rozwój, nie ucieczkę.</p>
                </div>
          </div>

              {/* Box 5 - Sportowcy (right-bottom) */}
              <div className="orbit" style={{'--i': '5'}}>
                <div className="slow-reveal audience-card w-48 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm" data-audience-card="5">
                  <h3 className="text-lg font-semibold text-white">Sportowcy</h3>
                  <p className="mt-2 text-sm text-neutral-300">Pewność siebie, koncentracja, rekordy.</p>
                </div>
            </div>
          </div>
        </div>

          <p className="slow-reveal mt-8 text-center text-sm text-neutral-300">Jeśli czujesz, że to czas na prawdziwą zmianę — ta praca jest dla Ciebie.</p>
        </div>
      </section>

      {/* 4) Why (white) - Moodboard Style */}
      <section id="why" className={"bg-white text-neutral-900 " + SPACING}>
        <div className={CONTAINER}>
          {/* Header with accent line */}
          <div className="mb-16">
            <div className="inline-block h-[2px] w-20 bg-accent mb-8"></div>
            <h2 className="slow-reveal text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Dlaczego hipnoterapia?
            </h2>
            <p className="slow-reveal mt-6 max-w-2xl text-lg text-neutral-600 leading-relaxed">
            Hipnoterapia to jedna z najszybszych i najskuteczniejszych metod trwałej zmiany — pracuje na poziomie
            podświadomości (ok. 95% umysłu).
          </p>
          </div>

          {/* Clean grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Effectiveness comparison cards */}
            <div className="slow-reveal">
              <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,.1)] transition-all duration-300">
                <div className="text-4xl font-extrabold text-accent mb-2">38%</div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Psychoanaliza</h3>
                <p className="text-sm text-neutral-600">600 sesji</p>
              </div>
            </div>

            <div className="slow-reveal">
              <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,.1)] transition-all duration-300">
                <div className="text-4xl font-extrabold text-accent mb-2">72%</div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Klasyczna terapia</h3>
                <p className="text-sm text-neutral-600">22 sesje</p>
              </div>
          </div>

            <div className="slow-reveal">
              <div className="bg-accent text-white rounded-2xl p-8 shadow-[0_8px_30px_rgba(164,0,0,.2)] hover:shadow-[0_12px_40px_rgba(164,0,0,.3)] transition-all duration-300">
                <div className="text-4xl font-extrabold mb-2">93%</div>
                <h3 className="text-lg font-semibold mb-2">Hipnoterapia</h3>
                <p className="text-sm text-white/80">6 sesji</p>
              </div>
            </div>

            {/* Science card */}
            <div className="slow-reveal md:col-span-2">
              <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,.1)] transition-all duration-300 h-full">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">To nie magia</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Naukowo potwierdzona praca z mózgiem. Bezpieczna, konkretna, oparta o mechanizmy uczenia się i neuroplastyczność.
                </p>
          </div>
        </div>

            {/* Process card */}
            <div className="slow-reveal">
              <a href="#process" className="block bg-white border border-neutral-200 rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,.1)] hover:border-accent transition-all duration-300 h-full group">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-accent transition-colors">Jak to działa?</h3>
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
                </div>
                <p className="text-neutral-600">Poznaj proces SET</p>
              </a>
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

      {/* 6) Support - Editorial Style */}
      <section className="bg-white text-neutral-900 py-24 lg:py-24 md:py-16 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Two-column header */}
          <div className="mb-18 lg:mb-18 md:mb-14 sm:mb-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              {/* Left column - Title with accent line */}
              <div className="flex flex-col justify-center">
                <div className="mb-6 inline-block h-[1px] w-12 bg-accent"></div>
                <h2 className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl xl:text-6xl">
                  Zakres wsparcia
                </h2>
              </div>
              
              {/* Right column - Description */}
              <div className="flex items-center justify-center lg:justify-start">
                <p className="text-lg leading-relaxed text-neutral-600 lg:text-xl text-center lg:text-left" style={{maxWidth: '60ch'}}>
                  Kompleksowe wsparcie w różnych obszarach życia — od rozwoju osobistego po przełamywanie ograniczeń i budowanie zdrowych relacji.
                </p>
              </div>
            </div>
          </div>

          {/* Numbered cards grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
            {[
              {
                title: "Odblokowanie potencjału",
                description: "Rozwój biznesowy i osobisty, odkrywanie ukrytych możliwości i budowanie pewności siebie.",
                featured: false
              },
              {
                title: "Wyniki w sporcie i karierze",
                description: "Poprawa koncentracji, motywacji i osiąganie lepszych rezultatów w zawodach i pracy.",
                featured: true
              },
              {
                title: "Przełamywanie przekonań",
                description: "Uwalnianie się od ograniczających myśli i schematów, które blokują rozwój.",
                featured: false
              },
              {
                title: "Relacje i komunikacja",
                description: "Budowanie zdrowych związków, poprawa komunikacji i rozwiązywanie konfliktów.",
                featured: false
              }
            ].map((item, index) => (
              <article 
                key={index} 
                className={`slow-reveal group rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-center ${
                  item.featured 
                    ? 'border-neutral-800 bg-neutral-900 text-white' 
                    : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300'
                }`}
              >
                {/* Number with accent dot */}
                <div className="mb-4 flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${item.featured ? 'bg-accent' : 'bg-accent'}`}></div>
                  <span className={`text-sm font-medium ${item.featured ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className={`mb-3 text-xl font-semibold leading-tight ${
                  item.featured ? 'text-white' : 'text-neutral-900'
                }`}>
                  {item.title}
                </h3>
                
                {/* Description */}
                <p className={`text-base leading-relaxed ${
                  item.featured ? 'text-neutral-300' : 'text-neutral-600'
                }`}>
                  {item.description}
                </p>
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
          
          {/* Featured client review */}
          <div className="slow-reveal mt-12 rounded-3xl bg-neutral-950 text-white overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Client photo */}
              <div className="relative aspect-[16/9] md:aspect-[16/10] overflow-hidden rounded-3xl">
                <Image
                  src="/testimonials/ada-jedrzejczyk.webp"
                  alt="Adrianna Jędrzejczyk — wejście na galę Babilon Boxing"
                  fill
                  sizes="(min-width:1280px) 720px, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 to-transparent"></div>
              </div>
              
              {/* Client review */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xl">
                    A
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Adrianna J.</h3>
                    <p className="text-neutral-400 text-sm">Sportowiec</p>
                  </div>
                </div>
                
                <blockquote className="text-lg leading-relaxed text-neutral-200 mb-6">
                  „Z Rafałem współpracuje od stosunkowo niedawna. Spotykamy się regularnie na sesję cotygodniowe gdzie mam szansę wyciszyć się, porozmawiać o moich wątpliwościach, celach oraz o tym jak nie zbaczać z wytyczonej ścieżki. Dostaje również plany technik nad którymi muszę się skupić. Jestem bardzo zadowolona z przebiegu tego „treningu mentalnego" ponieważ już zaczęłam zauważać diametralne różnice. Skupienie, uwaga, koncentracja to jest to czego nie brakuje na moich treningach. Jestem wdzięczna i wiem że wspólnymi siłami współpracując z takim profesjonalistą wniosę się na najwyższy poziom moich możliwości."
                </blockquote>
                
                <div className="flex items-center gap-2">
                  <div className="text-yellow-400 text-lg">★★★★★</div>
                  <span className="text-neutral-400 text-sm">5.0/5</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Other reviews */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              ['Andrzej W.', '„…jak nowonarodzony…"'],
              ['Sysia S.', '„…po trzech sesjach realna zmiana…"'],
              ['Sebastian B.', '„…rozwiązałem problem od lat…"'],
            ].map(([name, text], i) => (
              <figure key={i} className="slow-reveal rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white font-semibold">
                    {name[0]}
                  </div>
                  <figcaption className="font-medium">{name}</figcaption>
                </div>
                <blockquote className="mt-4 text-neutral-600">{text}</blockquote>
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
