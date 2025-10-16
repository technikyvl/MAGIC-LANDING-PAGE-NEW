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

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener('click', clickHandler);
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
          <ul className="hidden md:flex items-center gap-6 text-sm">
            <li><a href="/\#reviews" className="navlink relative px-3 py-2 whitespace-nowrap">Opinie</a></li>
            <li><a href="/\#pricing" className="navlink relative px-3 py-2 whitespace-nowrap">Cennik</a></li>
            <li><a href="/wspolpraca" className="navlink relative px-3 py-2 whitespace-nowrap">Współpraca</a></li>
            <li><a href="/szkolenia" className="navlink relative px-3 py-2 whitespace-nowrap">Szkolenia</a></li>
          </ul>
          <a href="/#contact" className="hidden md:inline-flex items-center rounded-xl bg-neutral-900 text-white text-sm font-semibold px-4 py-3 hover:bg-neutral-800 whitespace-nowrap">
            Umów rozmowę
          </a>
        </nav>
      </div>

      {/* Hero / Intro */}
      <section className={"relative bg-gradient-to-br from-neutral-50 via-white to-neutral-100 text-neutral-900 " + SPACING}>
        <div className={CONTAINER + " text-center flex flex-col items-center justify-center min-h-[70vh]"}>
          <span className="hero-reveal inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm font-medium text-accent backdrop-blur-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-accent"></span>
            WSPÓŁPRACA — Managerska, partnerska i biznesowa
          </span>
          <h1 className="hero-reveal mt-8 font-extrabold leading-[1.04] tracking-[-0.02em] text-[clamp(36px,7vw,72px)] max-w-5xl">
            Rozwój firmy zaczyna się od człowieka.
          </h1>
          <p className="hero-reveal mx-auto mt-6 max-w-4xl text-xl text-neutral-600 leading-relaxed">
            Łączę blisko 20 lat prowadzenia firm z ponad 8-letnim doświadczeniem w pracy z podświadomością ludzi i przedsiębiorców. Wspieram liderów, zespoły i inwestorów w tworzeniu biznesów, które działają — sprawnie, stabilnie i z jakością, która naprawdę ma znaczenie.
          </p>
          <div className="hero-reveal mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/#contact" className="rounded-xl bg-neutral-900 text-white px-8 py-4 font-semibold hover:bg-neutral-800 text-lg">Umów rozmowę</a>
            <a href="#czym-sie-zajmuje" className="rounded-xl border border-neutral-300 px-8 py-4 font-semibold text-neutral-900 hover:bg-neutral-50 text-lg">Dowiedz się więcej</a>
          </div>
        </div>
      </section>

      {/* Kim jestem */}
      <section id="kim-jestem" className={"relative bg-neutral-950 text-white pt-28 sm:pt-36 pb-20 sm:pb-24"}>
        <div className={CONTAINER}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Photo */}
            <div className="slow-reveal order-2 lg:order-1">
              <div className="relative h-80 lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/testimonials/rav.magic.webp"
                  alt="Ekspert od hipnozy — Magic Life"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/30 to-transparent"></div>
              </div>
            </div>

            {/* Content */}
            <div className="slow-reveal order-1 lg:order-2">
              <div className="inline-block h-[2px] w-16 bg-accent mb-8"></div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-8">Kim jestem</h2>
              <div className="space-y-6 text-base sm:text-lg leading-relaxed text-neutral-300 max-w-2xl">
                <p className="text-xl font-semibold text-white">Jestem managerem, przedsiębiorcą i trenerem mentalnym.</p>
                <p>Przez dwie dekady budowałem i prowadziłem firmy w różnych branżach — od transportu międzynarodowego, przez produkcję i sprzedaż maszyn, sprzętu i odzieży sportowej, po branżę beauty, suplementy diety, kancelarię prawną i nieruchomości.</p>
                <p>Znam każdy etap biznesu — od pomysłu, przez chaos wzrostu, po moment, w którym firma potrzebuje nowego poziomu organizacji, przywództwa i jakości.</p>
                <p>Od ośmiu lat pracuję z ludźmi głęboko — z ich przekonaniami, emocjami i mechanizmami, które wpływają na decyzje i sposób prowadzenia biznesu. Dzięki temu łączę twarde kompetencje operacyjne z miękkim, psychologicznym rozumieniem człowieka.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Czym się zajmuję */}
      <section id="czym-sie-zajmuje" className={"bg-white text-neutral-900 " + SPACING}>
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="inline-block h-[2px] w-20 bg-accent mb-8"></div>
            <h2 className="slow-reveal text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">Czym się zajmuję</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="slow-reveal text-lg text-neutral-700 leading-relaxed space-y-4">
              <p>Zajmuję się rozwojem biznesu i pośrednictwem gospodarczym – pomagam firmom znaleźć finansowanie, partnerów i klientów, a przedsiębiorcom uporządkować pomysły tak, by naprawdę działały.</p>
              <p>W pracy łączę perspektywę managera, partnera i stratega biznesowego. Wchodzę do firmy i widzę więcej — to, co ukryte pod codziennością: niewykorzystane możliwości, błędne założenia, słabe punkty komunikacji.</p>
              <p>Z tych elementów tworzę strukturę, która pozwala rosnąć szybciej, klarowniej i z większym spokojem w decyzjach.</p>
            </div>
            <div className="slow-reveal rounded-2xl border border-neutral-200 p-8 shadow-[0_8px_30px_rgba(0,0,0,.06)] bg-white">
              <ul className="space-y-3 text-neutral-700">
                {["diagnoza sytuacji i priorytetów","mapowanie możliwości i ryzyk","porządkowanie komunikacji i procesów","wdrożenie struktur i odpowiedzialności"].map((t,i)=> (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Doświadczenie */}
      <section id="doswiadczenie" className={"relative bg-neutral-950 text-white " + SPACING}>
        <div className={CONTAINER}>
          <div className="text-center mb-16">
            <h2 className="slow-reveal text-3xl sm:text-4xl font-extrabold">Doświadczenie</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="slow-reveal rounded-2xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold mb-4">Branże</h3>
              <ul className="space-y-2 text-neutral-300">
                {["transport międzynarodowy","produkcja i sprzedaż maszyn","sprzęt i odzież sportowa","suplementy diety","branża beauty","kancelaria prawna","nieruchomości (poszukiwanie i remonty dla inwestorów)"].map((b,i)=> (
                  <li key={i} className="pl-5 before:content-['•'] before:text-accent before:mr-3">{b}</li>
                ))}
              </ul>
            </div>
            <div className="slow-reveal rounded-2xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold mb-4">Obszary kompetencji</h3>
              <ul className="space-y-2 text-neutral-300">
                {["zarządzanie operacyjne i strategiczne","budowa i optymalizacja procesów","rozwój i strukturyzacja firm","mentoring i rozwój liderów","pośrednictwo gospodarcze","tworzenie synergii między ludźmi, projektami i kapitałem","budowanie kultury jakości i odpowiedzialności"].map((b,i)=> (
                  <li key={i} className="pl-5 before:content-['•'] before:text-accent before:mr-3">{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Formy współpracy */}
      <section id="formy" className={"bg-white text-neutral-900 " + SPACING}>
        <div className={CONTAINER}>
          <div className="text-center mb-12">
            <div className="inline-block h-[2px] w-16 bg-accent mb-6"></div>
            <h2 className="slow-reveal text-3xl sm:text-4xl font-extrabold">Formy współpracy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              ["Manager operacyjny / strategiczny","Wchodzę do firmy, by zobaczyć to, czego inni nie widzą — i poukładać wszystko tak, żeby zaczęło działać płynnie i z jakością."],
              ["Partner biznesowy do wzrostu","Pokazuję kierunki, które potrafią całkowicie odmienić tempo, jakość i sens rozwoju firmy."],
              ["Rozwój mentalny lidera i zespołu","Pomagam odzyskać spokój, koncentrację i zaangażowanie — tworząc kulturę jakości, odpowiedzialności i zaufania."]
            ].map(([t,d],i)=> (
              <article key={i} className="slow-reveal rounded-2xl border border-neutral-200 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,.1)] transition-all duration-300">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent"></div>
                  <span className="text-sm text-neutral-500">{String(i+1).padStart(2,'0')}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t}</h3>
                <p className="text-neutral-600">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Dla kogo */}
      <section id="dla-kogo" className={"relative bg-neutral-950 text-white " + SPACING}>
        <div className={CONTAINER}>
          <div className="text-center mb-12">
            <h2 className="slow-reveal text-3xl sm:text-4xl font-extrabold">Dla kogo</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Dla przedsiębiorców, którzy cenią jakość — w sobie, w ludziach i w firmie.",
              "Dla liderów, którzy chcą budować stabilny, świadomy biznes.",
              "Dla firm w fazie wzrostu, zmiany lub przebudowy organizacyjnej.",
              "Dla inwestorów i właścicieli, którzy chcą rozwijać swoje projekty poprzez mądre partnerstwa i połączenia kapitału.",
              "Dla zespołów, które potrzebują spójności, jasności i nowej energii."
            ].map((item, index) => (
              <div key={index} className="slow-reveal flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-neutral-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Efekty współpracy */}
      <section id="efekty" className={"bg-white text-neutral-900 " + SPACING}>
        <div className={CONTAINER}>
          <div className="text-center mb-12">
            <div className="inline-block h-[2px] w-16 bg-accent mb-6"></div>
            <h2 className="slow-reveal text-3xl sm:text-4xl font-extrabold">Efekty współpracy</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Więcej klarowności w decyzjach i kierunku.",
              "Więcej jakości w procesach, komunikacji i relacjach.",
              "Stabilny wzrost i realna odpowiedzialność w zespole.",
              "Biznes, który działa lekko, ale precyzyjnie.",
              "Zwiększone zyski jako naturalny efekt spójności i świadomego zarządzania."
            ].map((e,i)=> (
              <div key={i} className="slow-reveal rounded-2xl border border-neutral-200 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,.06)]">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-neutral-700">{e}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Kontakt */}
      <section className="bg-gradient-to-br from-neutral-50 to-white py-16 sm:py-20">
        <div className={CONTAINER + " text-center"}>
          <div className="slow-reveal mx-auto max-w-3xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight">Porozmawiajmy</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 leading-relaxed">
              Jeśli czujesz, że Twój biznes może działać z większą jakością, klarownością i spokojem, zrób pierwszy krok. Umów się na bezpłatną rozmowę wstępną (30 minut online). Zobaczmy, czy możemy stworzyć coś wyjątkowego razem.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/#contact" className="group relative overflow-hidden rounded-2xl bg-neutral-900 text-white px-8 py-4 font-semibold transition-all duration-300 hover:bg-accent hover:scale-105 hover:shadow-xl">
                <span className="relative z-10">Umów rozmowę</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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


