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
      threshold: 0.05,
      rootMargin: "0px 0px 50px 0px"
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

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
        const isOpen = !mobileMenu.classList.contains("hidden");
        
        // Update button icon
        const icon = mobileMenuToggle.querySelector("svg");
        if (icon) {
          if (isOpen) {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
          } else {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
          }
        }
      });
      
      // Close menu when clicking on links
      const mobileLinks = mobileMenu.querySelectorAll("a");
      mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
          const icon = mobileMenuToggle.querySelector("svg");
          if (icon) {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
          }
        });
      });
    }

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
          className={"mx-auto flex items-center justify-between gap-4 rounded-3xl backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/85 border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,.06)] transition-all duration-300 max-w-6xl px-4 sm:px-8 py-4 sm:py-5"}>
          <a href="/" className="font-extrabold tracking-tight text-neutral-900 text-lg sm:text-xl">
            Magic<span className="text-accent">Life</span>
          </a>
          
          {/* Desktop Navigation */}
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
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <a href="/#contact" className="inline-flex items-center rounded-xl bg-neutral-900 text-white text-xs sm:text-sm font-semibold px-3 py-2 sm:px-4 sm:py-3 hover:bg-neutral-800 whitespace-nowrap">
              Kontakt
            </a>
            <button 
              id="mobileMenuToggle"
              className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label="Otwórz menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Desktop CTA Button */}
          <a href="/#contact" className="hidden md:inline-flex items-center rounded-xl bg-neutral-900 text-white text-sm font-semibold px-4 py-3 hover:bg-neutral-800 whitespace-nowrap">
            Umów konsultację
          </a>
        </nav>
        
        {/* Mobile Navigation Menu */}
        <div id="mobileMenu" className="md:hidden mt-4 mx-auto max-w-6xl px-4 sm:px-8 hidden">
          <div className="bg-white/95 backdrop-blur-sm border border-white/60 rounded-2xl shadow-lg p-6">
            <ul className="space-y-4">
              <li><a href="/#why" className="block px-4 py-3 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-900 font-medium">Dlaczego</a></li>
              <li><a href="/#audience" className="block px-4 py-3 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-900 font-medium">Dla kogo</a></li>
              <li><a href="/#process" className="block px-4 py-3 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-900 font-medium">Proces</a></li>
              <li><a href="/#reviews" className="block px-4 py-3 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-900 font-medium">Opinie</a></li>
              <li><a href="/#pricing" className="block px-4 py-3 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-900 font-medium">Cennik</a></li>
              <li><a href="/szkolenia" className="block px-4 py-3 rounded-lg hover:bg-neutral-100 transition-colors text-accent font-semibold">Szkolenia</a></li>
              <li><a href="/#faq" className="block px-4 py-3 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-900 font-medium">FAQ</a></li>
              <li><a href="/#contact" className="block px-4 py-3 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-900 font-medium">Kontakt</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hero Section - Creative Layout */}
      <section className={"relative bg-gradient-to-br from-neutral-50 via-white to-neutral-100 text-neutral-900 " + SPACING}>
        <div className={CONTAINER + " text-center flex flex-col items-center justify-center min-h-[80vh] relative"}>
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/8 rounded-full blur-lg animate-pulse delay-500"></div>
          </div>
          
          <div className="relative z-10">
            <span className="hero-reveal inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm font-medium text-accent backdrop-blur-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse"></span>
              Szkolenia z hipnozy
            </span>
            
            <h1 className="hero-reveal mt-8 font-extrabold leading-[0.9] tracking-[-0.02em] text-[clamp(32px,8vw,96px)] sm:text-[clamp(40px,9vw,96px)] lg:text-[clamp(48px,10vw,96px)] max-w-6xl">
              <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent">
                PRAKTYK
              </span>
              <br />
              <span className="text-accent text-[clamp(24px,6vw,64px)] sm:text-[clamp(28px,7vw,64px)] lg:text-[clamp(32px,8vw,64px)]">Techniki HIPNOZY MARZEŃ</span>
            </h1>
            
            <div className="hero-reveal mt-8 inline-flex items-center gap-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-neutral-200/50 px-6 py-4 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                <span className="text-lg font-semibold text-neutral-900">24–25 października 2025</span>
              </div>
              <div className="w-px h-6 bg-neutral-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse delay-300"></div>
                <span className="text-lg font-semibold text-neutral-900">Kurs stacjonarny</span>
              </div>
            </div>
            
            <div className="hero-reveal mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="#contact" className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-800 text-white px-10 py-5 font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <span className="relative z-10 flex items-center gap-3">
                  <span>Zapisz się teraz</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a href="https://wa.me/48602200511" className="group rounded-2xl border-2 border-neutral-300 px-10 py-5 font-semibold text-neutral-900 hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300 hover:scale-105">
                <span className="flex items-center gap-3">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Napisz na WhatsApp
                </span>
              </a>
            </div>
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

      {/* Why This Course - Interactive Hexagon Layout */}
      <section className={"bg-gradient-to-br from-white via-neutral-50 to-white text-neutral-900 " + SPACING}>
        <div className={CONTAINER}>
          <div className="text-center mb-20">
            <div className="slow-reveal inline-flex items-center gap-3 rounded-full bg-accent/10 px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-accent font-semibold">Dlaczego warto?</span>
            </div>
            <h2 className="slow-reveal text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-8">
              <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent">
                Transformacja
              </span>
              <br />
              <span className="text-accent">w 48 godzin</span>
            </h2>
            <p className="slow-reveal max-w-3xl mx-auto text-xl text-neutral-600 leading-relaxed">
              Podczas dwudniowego kursu otrzymasz wszystko, czego potrzebujesz, by rozpocząć swoją drogę w hipnozie.
            </p>
          </div>

          {/* Interactive Benefits Grid */}
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🧠",
                  title: "Zrozumiesz hipnozę",
                  description: "Jak działa i co odróżnia ją od mitów i wyobrażeń.",
                  color: "from-accent to-orange-600"
                },
                {
                  icon: "✨",
                  title: "Doświadczysz transu",
                  description: "Na sobie już w pierwszych godzinach szkolenia.",
                  color: "from-accent to-orange-600"
                },
                {
                  icon: "🎯",
                  title: "Nauczysz się indukcji",
                  description: "Prostych, skutecznych technik pogłębiania transu.",
                  color: "from-accent to-orange-600"
                },
                {
                  icon: "🛡️",
                  title: "Opanujesz bezpieczeństwo",
                  description: "Zasady rozmowy wstępnej i pracy z klientem.",
                  color: "from-accent to-orange-600"
                },
                {
                  icon: "🤝",
                  title: "Poprowadzisz sesję",
                  description: "Swoją pierwszą sesję hipnotyczną w parach.",
                  color: "from-accent to-orange-600"
                },
                {
                  icon: "💪",
                  title: "Zyskasz pewność",
                  description: "Że masz narzędzie, które realnie wspiera zmianę.",
                  color: "from-accent to-orange-600"
                }
              ].map((item, index) => (
                <div key={index} className="group slow-reveal">
                  <div className="relative h-full bg-white rounded-3xl border border-neutral-200/50 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm">
                    {/* Hover Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-accent transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Decorative Element */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Program - Interactive Timeline */}
      <section className={"bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white " + SPACING}>
        <div className={CONTAINER}>
          <div className="text-center mb-20">
            <div className="slow-reveal inline-flex items-center gap-3 rounded-full bg-accent/20 px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-accent font-semibold">Program kursu</span>
            </div>
            <h2 className="slow-reveal text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-8">
              <span className="bg-gradient-to-r from-white via-neutral-200 to-white bg-clip-text text-transparent">
                48 godzin
              </span>
              <br />
              <span className="text-accent">intensywnej nauki</span>
            </h2>
          </div>

          {/* Interactive Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent via-accent/50 to-accent rounded-full"></div>
            
            {/* Day 1 */}
            <div className="slow-reveal relative mb-16">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Content */}
                <div className="lg:w-1/2 lg:pr-12">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 p-8 backdrop-blur-sm hover:bg-white/15 transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                        1
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Dzień 1</h3>
                        <p className="text-accent font-semibold">Fundamenty i pierwsze doświadczenie transu</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
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
                        <div key={index} className="flex items-start gap-3 group">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-neutral-300 group-hover:text-white transition-colors duration-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Visual Element */}
                <div className="lg:w-1/2 lg:pl-12">
                  <div className="relative">
                    <div className="w-64 h-64 mx-auto bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-accent/30">
                      <div className="text-6xl">🧠</div>
                    </div>
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/50 rounded-full animate-pulse delay-500"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div className="slow-reveal relative">
              <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                {/* Content */}
                <div className="lg:w-1/2 lg:pl-12">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 p-8 backdrop-blur-sm hover:bg-white/15 transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                        2
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Dzień 2</h3>
                        <p className="text-accent font-semibold">Praktyka i pełna sesja</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        "Lingwistyka hipnotyczna – jak formułować sugestie.",
                        "Ćwiczenia w parach: dawanie i odbieranie sugestii.",
                        "Powtórka indukcji i techniki pogłębiania.",
                        "Praca z symboliką – wprowadzenie do wyobraźni w hipnozie.",
                        "Ćwiczenia: pełna sesja hipnotyczna w parach (rozmowa → test → indukcja → pogłębienie → sugestia → wyprowadzenie).",
                        "Podsumowanie i certyfikacja: PRAKTYK Techniki Hipnozy Marzeń."
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3 group">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-neutral-300 group-hover:text-white transition-colors duration-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Visual Element */}
                <div className="lg:w-1/2 lg:pr-12">
                  <div className="relative">
                    <div className="w-64 h-64 mx-auto bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-accent/30">
                      <div className="text-6xl">✨</div>
                    </div>
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-accent/50 rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Gain - Interactive Cards */}
      <section className={"bg-gradient-to-br from-neutral-50 via-white to-neutral-100 text-neutral-900 " + SPACING}>
        <div className={CONTAINER}>
          <div className="text-center mb-20">
            <div className="slow-reveal inline-flex items-center gap-3 rounded-full bg-accent/10 px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-accent font-semibold">Co zyskasz?</span>
            </div>
            <h2 className="slow-reveal text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-8">
              <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent">
                Twoja transformacja
              </span>
              <br />
              <span className="text-accent">w 4 krokach</span>
            </h2>
          </div>

          {/* Interactive Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: "🎓",
                title: "Fundamenty hipnozy",
                description: "Teoria, praktyka i osobiste doświadczenie transu.",
                gradient: "from-accent to-orange-600",
                bgGradient: "from-white to-white"
              },
              {
                icon: "💪",
                title: "Pewność działania",
                description: "Poprowadzisz swoją pierwszą sesję już podczas kursu.",
                gradient: "from-accent to-orange-600",
                bgGradient: "from-white to-white"
              },
              {
                icon: "🛡️",
                title: "Bezpieczeństwo",
                description: "Nauczysz się ram i zasad pracy z klientem.",
                gradient: "from-accent to-orange-600",
                bgGradient: "from-white to-white"
              },
              {
                icon: "🏆",
                title: "Certyfikat ukończenia",
                description: "PRAKTYK Techniki Hipnozy Marzeń.",
                gradient: "from-accent to-orange-600",
                bgGradient: "from-white to-white"
              }
            ].map((item, index) => (
              <div key={index} className="group slow-reveal">
                <div className={`relative h-full bg-gradient-to-br ${item.bgGradient} rounded-3xl border border-neutral-200/50 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden`}>
                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-neutral-900 group-hover:text-accent transition-colors duration-300">
                          {item.title}
                        </h3>
                        <div className="w-12 h-1 bg-accent rounded-full mt-2 group-hover:w-16 transition-all duration-300"></div>
                      </div>
                    </div>
                    
                    <p className="text-neutral-700 leading-relaxed group-hover:text-neutral-900 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 bg-accent/5 rounded-full group-hover:bg-accent/10 transition-colors duration-300"></div>
                </div>
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
      <section className={"bg-gradient-to-br from-neutral-50 via-white to-neutral-100 text-neutral-900 " + SPACING}>
        <div className={CONTAINER}>
          <div className="text-center mb-16">
            <div className="slow-reveal inline-flex items-center gap-3 rounded-full bg-accent/10 px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-accent font-semibold">Kto prowadzi kurs?</span>
            </div>
            <h2 className="slow-reveal text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-8">
              <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent">
                Twój przewodnik
              </span>
              <br />
              <span className="text-accent">w transformacji</span>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl border border-neutral-200/50 p-8 sm:p-12 shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Photo */}
                <div className="slow-reveal order-2 lg:order-1">
                  <div className="relative group">
                    <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src="/testimonials/rav.magic.webp"
                        alt="Rafał Eliasik - Certyfikowany Master Hipnozy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent"></div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/50 rounded-full animate-pulse delay-500"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="slow-reveal order-1 lg:order-2">
                  <div className="mb-8">
                    <h3 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">Rafał Eliasik</h3>
                    <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 mb-6">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-accent font-semibold text-sm">Certyfikowany Master Hipnozy i Hipnoterapii</span>
                    </div>
                    <p className="text-lg text-neutral-600 mb-6">
                      Trener mentalny oraz strateg biznesowy
                    </p>
                  </div>
                  
                  <div className="space-y-6 text-neutral-700 leading-relaxed">
                    <p className="text-lg">
                      Od lat prowadzi ludzi w procesach zmiany – w życiu prywatnym i zawodowym. Pracuje z przedsiębiorcami, sportowcami oraz osobami, które chcą sięgnąć po swój pełny potencjał.
                    </p>
                    
                    <p>
                      Łączy doświadczenie w pracy z podświadomością, transformacją osobistą i rozwojem biznesu. Dzięki temu podczas kursu otrzymasz nie tylko techniki hipnotyczne, ale też praktyczne spojrzenie na to, jak stosować je w realnej pracy z ludźmi.
                    </p>
                    
                    <div className="pt-6 border-t border-neutral-200">
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          <span>Master Hipnozy</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          <span>Trener mentalny</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          <span>Strateg biznesowy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

      {/* CTA Section - Interactive & Creative */}
      <section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black py-20 sm:py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/8 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className={CONTAINER + " text-center relative z-10"}>
          <div className="slow-reveal mx-auto max-w-5xl">
            {/* Main CTA Card */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 p-12 sm:p-16 backdrop-blur-sm shadow-2xl">
              <div className="mb-8">
                <div className="inline-flex items-center gap-3 rounded-full bg-accent/20 px-6 py-3 mb-8">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-accent font-semibold">Gotowy na transformację?</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-8">
                  <span className="bg-gradient-to-r from-white via-neutral-200 to-white bg-clip-text text-transparent">
                    Gotowy na pierwszy krok?
                  </span>
                </h2>
                
                <p className="mx-auto mb-12 max-w-3xl text-xl text-neutral-300 leading-relaxed">
                  Zarezerwuj swoje miejsce i odkryj, jak ogromną moc ma Twój umysł.
                </p>
              </div>
              
              {/* Interactive Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a 
                  href="/#contact" 
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent to-orange-500 text-white px-12 py-6 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/25"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <span>👉 Zapisz się teraz</span>
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <a 
                  href="https://wa.me/48602200511" 
                  className="group rounded-2xl border-2 border-white/30 px-12 py-6 font-bold text-white transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:scale-105 backdrop-blur-sm"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Napisz na WhatsApp
                  </span>
                </a>
              </div>
              
              {/* Additional Info */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-neutral-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-sm">Kameralna grupa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-300"></div>
                    <span className="text-sm">Certyfikat ukończenia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-500"></div>
                    <span className="text-sm">Materiały szkoleniowe</span>
                  </div>
                </div>
              </div>
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
