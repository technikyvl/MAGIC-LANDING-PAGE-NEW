'use client';

import { useEffect } from "react";

const CONTAINER = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const SPACING = "py-20 sm:py-24 lg:py-28";

export default function Page() {
  useEffect(() => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // reveal
    const revealEls = Array.from(document.querySelectorAll(".reveal"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    revealEls.forEach((el) => io.observe(el));

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

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* 0) Header */}
      <div className="sticky top-4 z-50">
        <nav id="islandNav" aria-label="Główna nawigacja"
          className={"mx-auto flex items-center gap-3 rounded-2xl backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/85 border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,.06)] transition-all duration-300 max-w-4xl px-4 py-3"}>
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
        <div className={CONTAINER + " text-center"}>
          <span className="reveal inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 text-xs">
            <span className="inline-block h-2 w-2 rounded-full bg-accent"></span>
            Metoda SET (Simple Effective Therapy)
          </span>
          <h1 className="reveal mt-5 font-extrabold leading-[1.04] tracking-[-0.02em] text-[clamp(40px,8vw,76px)]">
            Hipnoterapia dla ludzi, którzy chcą więcej od życia.
          </h1>
          <p className="reveal mx-auto mt-4 max-w-3xl text-lg text-neutral-600">
            Pomagam osobom świadomym – liderom, sportowcom, przedsiębiorcom – uwolnić się od blokad,
            odkryć pełnię swojego potencjału i świadomie tworzyć życie, które kochają.
          </p>
          <div className="reveal mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#contact" className="rounded-xl bg-neutral-900 text-white px-6 py-3 font-semibold hover:bg-neutral-800">Umów konsultację</a>
            <a href="https://wa.me/0000000000" className="rounded-xl border border-neutral-300 px-6 py-3 font-semibold text-neutral-900 hover:bg-neutral-50">Napisz na WhatsApp</a>
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

      {/* 3) Why (dark) */}
      <section id="why" className={"relative bg-neutral-950 text-white " + SPACING}>
        <div className={CONTAINER}>
          <h2 className="reveal text-3xl sm:text-4xl font-extrabold">Dlaczego hipnoterapia?</h2>
          <p className="reveal mt-4 max-w-2xl text-neutral-300">
            Hipnoterapia to jedna z najszybszych i najskuteczniejszych metod trwałej zmiany — pracuje na poziomie
            podświadomości (ok. 95% umysłu).
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[["38%","Psychoanaliza (600 sesji)"],["72%","Klasyczna terapia (22 sesje)"],["93%","Hipnoterapia (6 sesji)"]].map(([v,l],i)=>(
              <div key={i} className="reveal rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-4xl font-extrabold">{v}</div>
                <div className="mt-2 text-sm text-neutral-300">{l}</div>
              </div>
            ))}
          </div>

          <div className="reveal mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-semibold">To nie magia</h3>
              <p className="mt-2 text-neutral-300">Naukowo potwierdzona praca z mózgiem. Bezpieczna, konkretna, oparta o mechanizmy uczenia.</p>
            </div>
            <a href="#process" className="rounded-2xl border border-white/10 bg-white/0 p-6 hover:bg-white/5 transition">
              Jak to działa? <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(transparent,black_60%)]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grid" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff5a3d33" />
                <stop offset="100%" stopColor="#ff5a3d11" />
              </linearGradient>
            </defs>
            {[...Array(7)].map((_,i)=>(<line key={'v'+i} x1={(i+1)*12.5} y1="0" x2={(i+1)*12.5} y2="100" stroke="url(#grid)" strokeWidth="0.15" />))}
            {[...Array(5)].map((_,i)=>(<line key={'h'+i} x1="0" y1={(i+1)*16.6} x2="100" y2={(i+1)*16.6} stroke="url(#grid)" strokeWidth="0.15" />))}
          </svg>
        </div>
      </section>

      {/* 4) For whom */}
      <section id="for" className={"bg-white text-neutral-900 " + SPACING}>
        <div className={CONTAINER}>
          <h2 className="reveal text-3xl sm:text-4xl font-extrabold">Dla kogo jest ta praca</h2>
          <p className="reveal mt-3 max-w-2xl text-neutral-600">Pracuję z ludźmi, którzy są gotowi na głęboką transformację…</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Przedsiębiorcy","Decyzje, lekkość w rozwoju firmy."],
              ["Sportowcy","Pewność siebie, koncentracja, rekordy."],
              ["Związki","Komunikacja, zaufanie, bliskość."],
              ["Przełamywanie schematów","Nowa energia i jasność."],
              ["Odpowiedzialność","Wybierasz rozwój, nie ucieczkę."],
            ].map(([t,d])=> (
              <article key={t} className="reveal group rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,.06)]">
                <h3 className="text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-neutral-600">{d}</p>
              </article>
            ))}
          </div>
          <p className="reveal mt-8 text-sm text-neutral-600">Jeśli czujesz, że to czas na prawdziwą zmianę — ta praca jest dla Ciebie.</p>
        </div>
      </section>

      {/* 5) Process – timeline */}
      <section id="process" className={"relative bg-neutral-950 text-white " + SPACING}>
        <div className={CONTAINER}>
          <h2 className="reveal text-3xl sm:text-4xl font-extrabold">Jak wygląda proces – metoda SET</h2>
          <ul className="reveal mt-4 grid gap-2 text-neutral-300 sm:grid-cols-2">
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
              <div key={i} className="reveal relative rounded-2xl border border-white/10 bg-white/5 p-6">
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
          <h2 className="reveal text-3xl sm:text-4xl font-extrabold">Zakres wsparcia</h2>
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
              <article key={t} className="reveal group rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,.06)]">
                <h3 className="text-lg font-semibold">{t}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7) Reviews */}
      <section id="reviews" className={"bg-white " + SPACING}>
        <div className={CONTAINER}>
          <h2 className="reveal text-3xl sm:text-4xl font-extrabold text-neutral-900">Opinie klientów</h2>
          <p className="reveal mt-2 text-sm text-neutral-600">Średnia ocen w Google: <strong>5.0/5</strong> (ponad 89 opinii)</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[["Andrzej W.","„…jak nowonarodzony…”"],["Sysia S.","„…po trzech sesjach realna zmiana…”"],["Sebastian B.","„…rozwiązałem problem od lat…”"]].map(([a,t],i)=>(
              <figure key={i} className="reveal rounded-2xl border border-neutral-200 bg-white p-6">
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
          <h2 className="reveal text-3xl sm:text-4xl font-extrabold">Dlaczego to działa</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[["Podświadomość 95%","Tam rodzą się reakcje i schematy."],["Przyspieszenie zmiany","Krótsza droga niż w większości terapii."],["Sprawczość","Odzyskujesz decyzyjność i kierunek."]].map(([t,d],i)=>(
              <div key={i} className="reveal rounded-2xl border border-white/10 bg-white/5 p-6">
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
          <h2 className="reveal text-3xl sm:text-4xl font-extrabold text-neutral-900">Twoje życie może wyglądać inaczej.</h2>
          <p className="reveal mx-auto mt-3 max-w-2xl text-neutral-600">Zrób pierwszy krok – umów rozmowę wstępną i zobacz, jak szybko możemy wprowadzić trwałą zmianę.</p>
          <div className="reveal mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#contact" className="rounded-xl bg-neutral-900 text-white px-6 py-3 font-semibold hover:bg-neutral-800">Umów konsultację</a>
            <a href="https://wa.me/0000000000" className="rounded-xl border border-neutral-300 px-6 py-3 font-semibold hover:bg-neutral-50">Napisz na WhatsApp</a>
          </div>
        </div>
      </section>

      {/* 10) FAQ */}
      <section id="faq" className={"bg-white " + SPACING}>
        <div className={CONTAINER}>
          <h2 className="reveal text-3xl sm:text-4xl font-extrabold text-neutral-900">FAQ</h2>
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
            <h2 className="reveal text-3xl sm:text-4xl font-extrabold">Skontaktuj się</h2>
            <p className="reveal mt-2 text-neutral-600">Masz pytanie? Napisz, chętnie odpowiem.</p>
            <ul className="reveal mt-6 space-y-2 text-neutral-800">
              <li><a className="underline underline-offset-4 hover:no-underline" href="mailto:hello@magiclife.pl">hello@magiclife.pl</a></li>
              <li><a className="underline underline-offset-4 hover:no-underline" href="https://wa.me/0000000000">WhatsApp</a></li>
              <li><a className="underline underline-offset-4 hover:no-underline" href="#">Kalendarz (wkrótce)</a></li>
            </ul>
          </div>
          <form className="reveal rounded-2xl border border-neutral-200 p-6 bg-white shadow-[0_8px_30px_rgba(0,0,0,.03)]" onSubmit={(e)=>{e.preventDefault(); alert('Dziękuję! Skontaktuję się niebawem.')}}>
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
