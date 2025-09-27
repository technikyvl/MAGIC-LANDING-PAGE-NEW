"use client";

import { useEffect } from "react";

const CONTAINER = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const SPACING = "py-32 sm:py-40 lg:py-48";

export default function TrainingPage() {
  useEffect(() => {
    // Set current year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // Intersection Observer for reveal animations
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    // Observe all reveal elements
    const revealElements = document.querySelectorAll(".reveal, .hero-reveal, .slow-reveal, .central-dot, .line-draw");
    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });

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

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* Header */}
      <div className="sticky top-4 z-50">
        <nav id="islandNav" aria-label="Główna nawigacja"
          className={"mx-auto flex items-center justify-center gap-8 rounded-3xl backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/85 border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,.06)] transition-all duration-300 max-w-6xl px-8 py-5"}>
          <a href="/" className="font-extrabold tracking-tight text-neutral-900">
            Magic<span className="text-accent">Life</span>
          </a>
          <ul className="hidden md:flex items-center gap-6 text-sm">
            <li><a href="/#why" className="navlink relative px-3 py-2 whitespace-nowrap">Dlaczego</a></li>
            <li><a href="/#audience" className="navlink relative px-3 py-2 whitespace-nowrap">Dla kogo</a></li>
            <li><a href="/#process" className="navlink relative px-3 py-2 whitespace-nowrap">Proces</a></li>
            <li><a href="/#reviews" className="navlink relative px-3 py-2 whitespace-nowrap">Opinie</a></li>
            <li><a href="/#pricing" className="navlink relative px-3 py-2 whitespace-nowrap">Cennik</a></li>
            <li><a href="/szkolenia" className="navlink relative px-3 py-2 whitespace-nowrap text-accent font-semibold">Szkolenia</a></li>
            <li><a href="/#faq" className="navlink relative px-3 py-2 whitespace-nowrap">FAQ</a></li>
            <li><a href="/#contact" className="navlink relative px-3 py-2 whitespace-nowrap">Kontakt</a></li>
          </ul>
          <a href="/#contact" className="inline-flex items-center rounded-xl bg-neutral-900 text-white text-sm font-semibold px-4 py-3 hover:bg-neutral-800 whitespace-nowrap">
            Umów konsultację
          </a>
        </nav>
      </div>

      {/* Hero Section */}
      <section className={"relative bg-white text-neutral-900 " + SPACING}>
        <div className={CONTAINER + " text-center flex flex-col items-center justify-center min-h-[60vh]"}>
          <span className="hero-reveal inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 text-xs">
            <span className="inline-block h-2 w-2 rounded-full bg-accent"></span>
            Szkolenia z hipnozy
          </span>
          <h1 className="hero-reveal mt-8 font-extrabold leading-[1.04] tracking-[-0.02em] text-[clamp(40px,8vw,76px)] max-w-5xl">
            ✨ PRAKTYK Techniki HIPNOZY MARZEŃ
          </h1>
          <p className="hero-reveal mx-auto mt-6 max-w-4xl text-xl text-neutral-600 leading-relaxed">
            24–25 października 2025 | Kurs stacjonarny
          </p>
          <div className="hero-reveal mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="rounded-xl bg-neutral-900 text-white px-8 py-4 font-semibold hover:bg-neutral-800 text-lg">Zapisz się teraz</a>
            <a href="https://wa.me/48602200511" className="rounded-xl border border-neutral-300 px-8 py-4 font-semibold text-neutral-900 hover:bg-neutral-50 text-lg">Napisz na WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Course Description */}
      <section className={"relative bg-neutral-950 text-white pt-20 pb-8"}>
        <div className={CONTAINER}>
          <div className="slow-reveal text-center">
            <div className="inline-block h-[2px] w-16 bg-accent mb-6"></div>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-neutral-300 mb-6 leading-relaxed">
                Jeżeli czujesz…<br/>
                …że praca z ludźmi sprawia Ci przyjemność,<br/>
                ale brakuje Ci narzędzia, które naprawdę działa i daje szybkie efekty.
              </p>
              <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
                Jeżeli chcesz korzystać z jednej z najskuteczniejszych metod pracy z umysłem, która otwiera ludzi na zmianę szybciej niż cokolwiek innego –<br/>
                <span className="text-accent font-semibold">to szkolenie jest właśnie dla Ciebie.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Course */}
      <section className={"bg-white text-neutral-900 " + SPACING}>
        <div className={CONTAINER}>
          <div className="text-center mb-16">
            <div className="inline-block h-[2px] w-20 bg-accent mb-8"></div>
            <h2 className="slow-reveal text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Dlaczego warto?
            </h2>
            <p className="slow-reveal mt-6 max-w-2xl mx-auto text-lg text-neutral-600 leading-relaxed">
              Podczas dwudniowego kursu otrzymasz wszystko, czego potrzebujesz, by rozpocząć swoją drogę w hipnozie.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-[0_8px_30px_rgba(0,0,0,.06)]">
            <p className="text-lg text-neutral-700 mb-6 leading-relaxed text-center">
              To połączenie teorii i praktyki, dzięki któremu:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Zrozumiesz jak działa hipnoza i co odróżnia ją od mitów i wyobrażeń.",
                "Doświadczysz stanu transu na sobie już w pierwszych godzinach szkolenia.",
                "Nauczysz się prostych, skutecznych indukcji i technik pogłębiania transu.",
                "Opanujesz zasady rozmowy wstępnej, bezpieczeństwa i pracy z klientem.",
                "Poprowadzisz swoją pierwszą sesję hipnotyczną w parach.",
                "Wyjdziesz z pewnością, że masz narzędzie, które realnie wspiera zmianę u innych."
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-neutral-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Program */}
      <section className={"bg-neutral-950 text-white " + SPACING}>
        <div className={CONTAINER}>
          <h2 className="slow-reveal text-3xl sm:text-4xl font-extrabold text-center mb-16">Program kursu</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Day 1 */}
            <div className="slow-reveal bg-white/5 rounded-2xl border border-white/10 p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 text-accent">Dzień 1 – Fundamenty i pierwsze doświadczenie transu</h3>
              <ul className="space-y-4">
                {[
                  "Czym naprawdę jest hipnoza – fakty i obalenie mitów.",
                  "Świadomość i podświadomość – zasady działania umysłu.",
                  "Sesja wprowadzająca: doświadczenie przyjemnego transu prowadzonego przez trenera.",
                  "Rozmowa wstępna, budowanie relacji i zasady bezpieczeństwa.",
                  "Testy sugestywności – jak sprawdzić podatność na sugestie.",
                  "Proste indukcje: progresywna relaksacja i fiksacja wzroku.",
                  "Pogłębianie transu i techniki bezpiecznego wyprowadzania.",
                  "Ćwiczenia w parach: mini-sesja krok po kroku."
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Day 2 */}
            <div className="slow-reveal bg-white/5 rounded-2xl border border-white/10 p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 text-accent">Dzień 2 – Praktyka i pełna sesja</h3>
              <ul className="space-y-4">
                {[
                  "Lingwistyka hipnotyczna – jak formułować sugestie.",
                  "Ćwiczenia w parach: dawanie i odbieranie sugestii.",
                  "Powtórka indukcji i techniki pogłębiania.",
                  "Praca z symboliką – wprowadzenie do wyobraźni w hipnozie.",
                  "Ćwiczenia: pełna sesja hipnotyczna w parach (rozmowa → test → indukcja → pogłębienie → sugestia → wyprowadzenie).",
                  "Podsumowanie i certyfikacja: PRAKTYK Techniki Hipnozy Marzeń."
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Gain */}
      <section className={"bg-white text-neutral-900 " + SPACING}>
        <div className={CONTAINER}>
          <h2 className="slow-reveal text-3xl sm:text-4xl font-extrabold text-center mb-16">Co zyskasz?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Fundamenty hipnozy",
                description: "Teoria, praktyka i osobiste doświadczenie transu."
              },
              {
                title: "Pewność działania",
                description: "Poprowadzisz swoją pierwszą sesję już podczas kursu."
              },
              {
                title: "Bezpieczeństwo",
                description: "Nauczysz się ram i zasad pracy z klientem."
              },
              {
                title: "Certyfikat ukończenia",
                description: "PRAKTYK Techniki Hipnozy Marzeń."
              }
            ].map((item, index) => (
              <div key={index} className="slow-reveal bg-white rounded-2xl border border-neutral-200 p-6 shadow-[0_8px_30px_rgba(0,0,0,.06)] text-center">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-neutral-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className={"bg-neutral-950 text-white " + SPACING}>
        <div className={CONTAINER}>
          <h2 className="slow-reveal text-3xl sm:text-4xl font-extrabold text-center mb-16">Dla kogo jest ten kurs?</h2>
          <div className="bg-white/5 rounded-2xl border border-white/10 p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Dla osób, które chcą rozpocząć swoją drogę w hipnozie.",
                "Dla tych, którzy pracują z ludźmi (np. coachowie, terapeuci, doradcy) i chcą wzbogacić swój warsztat.",
                "Dla trenerów personalnych i wszystkich trenerów, którzy chcą pomóc swoim podopiecznym osiągać lepsze efekty i szybciej przełamywać blokady.",
                "Dla każdego, kto czuje, że hipnoza może stać się narzędziem realnej zmiany – dla siebie i innych."
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-neutral-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className={"bg-white text-neutral-900 " + SPACING}>
        <div className={CONTAINER}>
          <h2 className="slow-reveal text-3xl sm:text-4xl font-extrabold text-center mb-16">Kto prowadzi kurs?</h2>
          <div className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl border border-neutral-200 p-8 shadow-[0_8px_30px_rgba(0,0,0,.06)]">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Rafał Eliasik</h3>
              <p className="text-accent font-semibold">Certyfikowany Master Hipnozy i Hipnoterapii, trener mentalny oraz strateg biznesowy</p>
            </div>
            <div className="max-w-4xl mx-auto text-neutral-700 leading-relaxed space-y-4">
              <p>
                Od lat prowadzi ludzi w procesach zmiany – w życiu prywatnym i zawodowym. Pracuje z przedsiębiorcami, sportowcami oraz osobami, które chcą sięgnąć po swój pełny potencjał.
              </p>
              <p>
                Łączy doświadczenie w pracy z podświadomością, transformacją osobistą i rozwojem biznesu. Dzięki temu podczas kursu otrzymasz nie tylko techniki hipnotyczne, ale też praktyczne spojrzenie na to, jak stosować je w realnej pracy z ludźmi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Organizational Details */}
      <section className={"bg-neutral-950 text-white " + SPACING}>
        <div className={CONTAINER}>
          <h2 className="slow-reveal text-3xl sm:text-4xl font-extrabold text-center mb-16">Szczegóły organizacyjne</h2>
          <div className="bg-white/5 rounded-2xl border border-white/10 p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <span className="text-neutral-300"><strong>Forma:</strong> kurs stacjonarny</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📅</span>
                  <span className="text-neutral-300"><strong>Termin:</strong> 24–25 października 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🕙</span>
                  <span className="text-neutral-300"><strong>Godziny:</strong> 10:00 – 16:00 (z przerwą obiadową i kawowymi)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📜</span>
                  <span className="text-neutral-300"><strong>Certyfikat:</strong> PRAKTYK Techniki Hipnozy Marzeń</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💰</span>
                  <span className="text-neutral-300"><strong>Cena:</strong> <span className="text-accent font-bold text-xl">2490 zł</span></span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-sm text-neutral-400 mb-2"><strong>Organizator zapewnia:</strong></p>
                  <p className="text-sm text-neutral-300">kawę, napoje i przekąski</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-sm text-neutral-400 mb-2"><strong>Organizator nie zapewnia:</strong></p>
                  <p className="text-sm text-neutral-300">noclegu ani obiadu – w czasie przerwy obiadowej wspólnie składamy zamówienie w sprawdzonej restauracji. Każdy wybiera posiłek dla siebie zgodnie ze swoimi preferencjami (np. wege, tradycyjne, fit).</p>
                </div>
                <div className="bg-accent/20 rounded-xl p-4 border border-accent/30">
                  <p className="text-sm text-accent font-semibold">⚠️ Ilość miejsc ograniczona – pracujemy w bardzo kameralnej grupie.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-neutral-50 to-white py-16 sm:py-20">
        <div className={CONTAINER + " text-center"}>
          <div className="slow-reveal mx-auto max-w-4xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight mb-8">
              🌙 Gotowy na pierwszy krok?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-neutral-600 leading-relaxed">
              Zarezerwuj swoje miejsce i odkryj, jak ogromną moc ma Twój umysł.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/#contact" 
                className="group relative overflow-hidden rounded-2xl bg-neutral-900 text-white px-8 py-4 font-semibold transition-all duration-300 hover:bg-accent hover:scale-105 hover:shadow-xl"
              >
                <span className="relative z-10">👉 Zapisz się teraz</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                href="https://wa.me/48602200511" 
                className="group rounded-2xl border-2 border-neutral-300 px-8 py-4 font-semibold text-neutral-700 transition-all duration-300 hover:border-accent hover:text-accent hover:bg-accent/5 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Napisz na WhatsApp
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-neutral-950 to-black text-neutral-300">
        <div className={CONTAINER + " py-16 sm:py-20"}>
          <div className="grid gap-12 lg:grid-cols-3 md:grid-cols-2">
            {/* Logo */}
            <div className="lg:col-span-1">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Magic<span className="text-accent">Life</span>
              </div>
              <p className="mt-4 text-lg text-neutral-400 leading-relaxed">
                Transformacja życia przez hipnoterapię i SET
              </p>
            </div>
            
            {/* Navigation */}
            <nav className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-6">Nawigacja</h3>
              <div className="grid grid-cols-2 gap-4">
                <a href="/#why" className="text-base hover:text-accent transition-colors duration-300">Dlaczego</a>
                <a href="/#audience" className="text-base hover:text-accent transition-colors duration-300">Dla kogo</a>
                <a href="/#process" className="text-base hover:text-accent transition-colors duration-300">Proces</a>
                <a href="/#reviews" className="text-base hover:text-accent transition-colors duration-300">Opinie</a>
                <a href="/#pricing" className="text-base hover:text-accent transition-colors duration-300">Cennik</a>
                <a href="/szkolenia" className="text-base hover:text-accent transition-colors duration-300 text-accent font-semibold">Szkolenia</a>
                <a href="/#faq" className="text-base hover:text-accent transition-colors duration-300">FAQ</a>
                <a href="/#contact" className="text-base hover:text-accent transition-colors duration-300">Kontakt</a>
              </div>
            </nav>
            
            {/* Legal */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-6">Informacje prawne</h3>
              <div className="space-y-3">
                <a className="block text-base hover:text-accent transition-colors duration-300" href="/polityka-prywatnosci">Polityka prywatności</a>
                <a className="block text-base hover:text-accent transition-colors duration-300" href="#">Regulamin</a>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
          
          {/* Copyright */}
          <div className="mt-8 text-center">
            <p className="text-base text-neutral-500">
              © <span id="year"></span> Magic Life. Wszelkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
