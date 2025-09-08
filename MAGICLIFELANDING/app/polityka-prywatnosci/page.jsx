import Image from 'next/image'
import Link from 'next/link'

export default function PolitykaPrywatnosci() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-br from-neutral-950 to-black text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <Link href="/" className="inline-block mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white hover:text-accent transition-colors">
                MAGICLIFE
              </h1>
            </Link>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Polityka Prywatności
            </h2>
            <p className="text-neutral-300 text-lg max-w-3xl mx-auto">
              Zasady przetwarzania informacji na Twoją temat, w tym danych osobowych oraz ciasteczek
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <p className="text-neutral-600 text-lg leading-relaxed">
                Polityka prywatności opisuje zasady przetwarzania przez nas informacji na Twój temat, 
                w tym danych osobowych oraz ciasteczek, czyli tzw. cookies.
              </p>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">1. Informacje ogólne</h3>
              <div className="space-y-4 text-neutral-700">
                <p>Niniejsza polityka dotyczy Serwisu www, funkcjonującego pod adresem url: <strong>magiclife.pl</strong></p>
                <p>Operatorem serwisu oraz Administratorem danych osobowych jest: <strong>Rafał Rafał 43-300, Bielsko Biała</strong></p>
                <p>Adres kontaktowy poczty elektronicznej operatora: <strong>kontakt@magiclife.pl</strong></p>
                <p>Operator jest Administratorem Twoich danych osobowych w odniesieniu do danych podanych dobrowolnie w Serwisie.</p>
                
                <div className="mt-6">
                  <p className="font-semibold mb-3">Serwis wykorzystuje dane osobowe w następujących celach:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Prowadzenie newslettera</li>
                    <li>Prowadzenie rozmów typu chat online</li>
                    <li>Obsługa zapytań przez formularz</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <p className="font-semibold mb-3">Serwis realizuje funkcje pozyskiwania informacji o użytkownikach i ich zachowaniu w następujący sposób:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Poprzez dobrowolnie wprowadzone w formularzach dane, które zostają wprowadzone do systemów Operatora.</li>
                    <li>Poprzez zapisywanie w urządzeniach końcowych plików cookie (tzw. „ciasteczka").</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">2. Wybrane metody ochrony danych stosowane przez Operatora</h3>
              <div className="space-y-4 text-neutral-700">
                <p>Miejsca logowania i wprowadzania danych osobowych są chronione w warstwie transmisji (certyfikat SSL). Dzięki temu dane osobowe i dane logowania, wprowadzone na stronie, zostają zaszyfrowane w komputerze użytkownika i mogą być odczytane jedynie na docelowym serwerze.</p>
                <p>Operator okresowo zmienia swoje hasła administracyjne.</p>
                <p>Istotnym elementem ochrony danych jest regularna aktualizacja wszelkiego oprogramowania, wykorzystywanego przez Operatora do przetwarzania danych osobowych, co w szczególności oznacza regularne aktualizacje komponentów programistycznych.</p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">3. Hosting</h3>
              <div className="space-y-4 text-neutral-700">
                <p>Serwis jest hostowany (technicznie utrzymywany) na serwerach operatora: <strong>inna firma</strong></p>
                <p>Firma hostingowa w celu zapewnienia niezawodności technicznej prowadzi logi na poziomie serwera. Zapisowi mogą podlegać:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>zasoby określone identyfikatorem URL (adresy żądanych zasobów – stron, plików),</li>
                  <li>czas nadejścia zapytania,</li>
                  <li>czas wysłania odpowiedzi,</li>
                  <li>nazwę stacji klienta – identyfikacja realizowana przez protokół HTTP,</li>
                  <li>informacje o błędach jakie nastąpiły przy realizacji transakcji HTTP,</li>
                  <li>adres URL strony poprzednio odwiedzanej przez użytkownika (referer link) – w przypadku gdy przejście do Serwisu nastąpiło przez odnośnik,</li>
                  <li>informacje o przeglądarce użytkownika,</li>
                  <li>informacje o adresie IP,</li>
                  <li>informacje diagnostyczne związane z procesem samodzielnego zamawiania usług poprzez rejestratory na stronie,</li>
                  <li>informacje związane z obsługą poczty elektronicznej kierowanej do Operatora oraz wysyłanej przez Operatora.</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">4. Twoje prawa i dodatkowe informacje o sposobie wykorzystania danych</h3>
              <div className="space-y-4 text-neutral-700">
                <p>W niektórych sytuacjach Administrator ma prawo przekazywać Twoje dane osobowe innym odbiorcom, jeśli będzie to niezbędne do wykonania zawartej z Tobą umowy lub do zrealizowania obowiązków ciążących na Administratorze. Dotyczy to takich grup odbiorców:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>firma hostingowa na zasadzie powierzenia</li>
                </ul>
                
                <p>Twoje dane osobowe przetwarzane przez Administratora nie dłużej, niż jest to konieczne do wykonania związanych z nimi czynności określonych osobnymi przepisami (np. o prowadzeniu rachunkowości). W odniesieniu do danych marketingowych dane nie będą przetwarzane dłużej niż przez 3 lata.</p>
                
                <div className="mt-6">
                  <p className="font-semibold mb-3">Przysługuje Ci prawo żądania od Administratora:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>dostępu do danych osobowych Ciebie dotyczących,</li>
                    <li>ich sprostowania,</li>
                    <li>usunięcia,</li>
                    <li>ograniczenia przetwarzania,</li>
                    <li>oraz przenoszenia danych.</li>
                  </ul>
                </div>

                <p>Przysługuje Ci prawo do złożenia sprzeciwu w zakresie przetwarzania wskazanego w pkt 3.2 wobec przetwarzania danych osobowych w celu wykonania prawnie uzasadnionych interesów realizowanych przez Administratora, w tym profilowania, przy czym prawo sprzeciwu nie będzie mogło być wykonane w przypadku istnienia ważnych prawnie uzasadnionych podstaw do przetwarzania, nadrzędnych wobec Ciebie interesów, praw i wolności, w szczególności ustalenia, dochodzenia lub obrony roszczeń.</p>
                
                <p>Na działania Administratora przysługuje skarga do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.</p>
                
                <p>Podanie danych osobowych jest dobrowolne, lecz niezbędne do obsługi Serwisu.</p>
                
                <p>W stosunku do Ciebie mogą być podejmowane czynności polegające na zautomatyzowanym podejmowaniu decyzji, w tym profilowaniu w celu świadczenia usług w ramach zawartej umowy oraz w celu prowadzenia przez Administratora marketingu bezpośredniego.</p>
                
                <p>Dane osobowe nie są przekazywane od krajów trzecich w rozumieniu przepisów o ochronie danych osobowych. Oznacza to, że nie przesyłamy ich poza teren Unii Europejskiej.</p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">5. Informacje w formularzach</h3>
              <div className="space-y-4 text-neutral-700">
                <p>Serwis zbiera informacje podane dobrowolnie przez użytkownika, w tym dane osobowe, o ile zostaną one podane.</p>
                <p>Serwis może zapisać informacje o parametrach połączenia (oznaczenie czasu, adres IP).</p>
                <p>Serwis, w niektórych wypadkach, może zapisać informację ułatwiającą powiązanie danych w formularzu z adresem e-mail użytkownika wypełniającego formularz. W takim wypadku adres e-mail użytkownika pojawia się wewnątrz adresu url strony zawierającej formularz.</p>
                <p>Dane podane w formularzu są przetwarzane w celu wynikającym z funkcji konkretnego formularza, np. w celu dokonania procesu obsługi zgłoszenia serwisowego lub kontaktu handlowego, rejestracji usług itp. Każdorazowo kontekst i opis formularza w czytelny sposób informuje, do czego on służy.</p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">6. Logi Administratora</h3>
              <div className="space-y-4 text-neutral-700">
                <p>Informacje zachowaniu użytkowników w serwisie mogą podlegać logowaniu. Dane te są wykorzystywane w celu administrowania serwisem.</p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">7. Istotne techniki marketingowe</h3>
              <div className="space-y-4 text-neutral-700">
                <p>Operator stosuje techniki remarketingowe, pozwalające na dopasowanie przekazów reklamowych do zachowania użytkownika na stronie, co może dawać złudzenie, że dane osobowe użytkownika są wykorzystywane do jego śledzenia, jednak w praktyce nie dochodzi do przekazania żadnych danych osobowych od Operatora do operatorom reklam. Technologicznym warunkiem takich działań jest włączona obsługa plików cookie.</p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">8. Informacja o plikach cookies</h3>
              <div className="space-y-4 text-neutral-700">
                <p>Serwis korzysta z plików cookies.</p>
                <p>Pliki cookies (tzw. „ciasteczka") stanowią dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu i przeznaczone są do korzystania ze stron internetowych Serwisu. Cookies zazwyczaj zawierają nazwę strony internetowej, z której pochodzą, czas przechowywania ich na urządzeniu końcowym oraz unikalny numer.</p>
                <p>Podmiotem zamieszczającym na urządzeniu końcowym Użytkownika Serwisu pliki cookies oraz uzyskującym do nich dostęp jest operator Serwisu.</p>
                
                <div className="mt-6">
                  <p className="font-semibold mb-3">Pliki cookies wykorzystywane są w następujących celach:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>utrzymanie sesji użytkownika Serwisu (po zalogowaniu), dzięki której użytkownik nie musi na każdej podstronie Serwisu ponownie wpisywać loginu i hasła;</li>
                    <li>realizacji celów określonych powyżej w części "Istotne techniki marketingowe";</li>
                  </ul>
                </div>

                <p>W ramach Serwisu stosowane są dwa zasadnicze rodzaje plików cookies: „sesyjne" (session cookies) oraz „stałe" (persistent cookies). Cookies „sesyjne" są plikami tymczasowymi, które przechowywane są w urządzeniu końcowym Użytkownika do czasu wylogowania, opuszczenia strony internetowej lub wyłączenia oprogramowania (przeglądarki internetowej). „Stałe" pliki cookies przechowywane są w urządzeniu końcowym Użytkownika przez czas określony w parametrach plików cookies lub do czasu ich usunięcia przez Użytkownika.</p>
                
                <p>Oprogramowanie do przeglądania stron internetowych (przeglądarka internetowa) zazwyczaj domyślnie dopuszcza przechowywanie plików cookies w urządzeniu końcowym Użytkownika. Użytkownicy Serwisu mogą dokonać zmiany ustawień w tym zakresie. Przeglądarka internetowa umożliwia usunięcie plików cookies. Możliwe jest także automatyczne blokowanie plików cookies Szczegółowe informacje na ten temat zawiera pomoc lub dokumentacja przeglądarki internetowej.</p>
                
                <p>Ograniczenia stosowania plików cookies mogą wpłynąć na niektóre funkcjonalności dostępne na stronach internetowych Serwisu.</p>
                
                <p>Pliki cookies zamieszczane w urządzeniu końcowym Użytkownika Serwisu wykorzystywane mogą być również przez współpracujące z operatorem Serwisu podmioty, w szczególności dotyczy to firm: Google (Google Inc. z siedzibą w USA), Facebook (Facebook Inc. z siedzibą w USA), Twitter (Twitter Inc. z siedzibą w USA).</p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">9. Zarządzanie plikami cookies – jak w praktyce wyrażać i cofać zgodę?</h3>
              <div className="space-y-4 text-neutral-700">
                <p>Jeśli użytkownik nie chce otrzymywać plików cookies, może zmienić ustawienia przeglądarki. Zastrzegamy, że wyłączenie obsługi plików cookies niezbędnych dla procesów uwierzytelniania, bezpieczeństwa, utrzymania preferencji użytkownika może utrudnić, a w skrajnych przypadkach może uniemożliwić korzystanie ze stron www</p>
                
                <p>W celu zarządzania ustawienia cookies wybierz z listy poniżej przeglądarkę internetową, której używasz i postępuj zgodnie z instrukcjami:</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  <div>
                    <h4 className="font-semibold mb-2">Przeglądarki desktop:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Edge</li>
                      <li>Internet Explorer</li>
                      <li>Chrome</li>
                      <li>Safari</li>
                      <li>Firefox</li>
                      <li>Opera</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Urządzenia mobilne:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Android</li>
                      <li>Safari (iOS)</li>
                      <li>Windows Phone</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer note */}
            <div className="mt-16 p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
              <p className="text-sm text-neutral-600 leading-relaxed">
                <strong>Uwaga:</strong> Niniejszy wzór polityki został wygenerowany bezpłatnie, w celach informacyjnych, w oparciu o naszą wiedzę, branżowe praktyki i przepisy prawa obowiązujące na dzień 2018-08-14. Zalecamy sprawdzenie wzoru polityki przed użyciem jej na stronie. Wzór opiera się na najczęściej występujących na stronach internetowych sytuacjach, ale może nie odzwierciedlać pełnej i dokładnej specyfiki Twojej strony www. Przeczytaj uważnie wygenerowany dokument i w razie potrzeb dostosuj go do Twojej sytuacji lub zasięgnij porady prawnej. Nie bierzemy odpowiedzialności za skutki posługiwania się tym dokumentem, ponieważ tylko Ty masz wpływ na to, czy wszystkie informacje w nim zawarte są zgodne z prawdą. Zwróć także uwagę, że Polityka Prywatności, nawet najlepsza, jest tylko jednym z elementów Twojej troski o dane osobowe i prywatność użytkownika na stronie www.
              </p>
            </div>

            {/* Back to home */}
            <div className="mt-12 text-center">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-2xl hover:bg-accent/90 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Powrót do strony głównej
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-neutral-950 to-black text-neutral-300 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">
              MAGICLIFE
            </h3>
            <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
              Transformacja życia przez hipnoterapię. Odzyskaj kontrolę, odkryj swój potencjał.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-base">
              <Link href="/" className="hover:text-white transition-colors">Strona główna</Link>
              <Link href="/polityka-prywatnosci" className="hover:text-white transition-colors">Polityka prywatności</Link>
              <a href="mailto:kontakt@magiclife.pl" className="hover:text-white transition-colors">kontakt@magiclife.pl</a>
            </div>
            <div className="mt-8 pt-8 border-t border-neutral-800">
              <p className="text-sm text-neutral-500">
                © 2024 MAGICLIFE. Wszystkie prawa zastrzeżone.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
