# Instrukcje eksportu statycznego

## ✅ Zmiany zostały wprowadzone:

1. **Konfiguracja Next.js** (`next.config.mjs`):
   - Włączony statyczny export (`output: 'export'`)
   - Dodane końcowe slashe (`trailingSlash: true`)
   - Wyłączona optymalizacja obrazów (`images: { unoptimized: true }`)

2. **Usunięte pliki**:
   - `app/api/contact/route.js` (API routes nie działają w statycznym exporcie)

3. **Zamienione komponenty**:
   - `Image` z Next.js → zwykłe tagi `<img>`
   - Usunięte importy `Image` z Next.js

## 🚀 Jak uruchomić build:

1. **Upewnij się, że masz zainstalowany Node.js i npm**

2. **Zainstaluj zależności** (jeśli jeszcze nie):
   ```bash
   npm install
   ```

3. **Uruchom build**:
   ```bash
   npm run build
   ```

4. **Po zakończeniu**:
   - Statyczne pliki będą w folderze `out/`
   - Skopiuj całą zawartość folderu `out/` na swój hosting

## 📁 Struktura po build:

```
out/
├── index.html (strona główna)
├── polityka-prywatnosci/
│   └── index.html
├── _next/
│   ├── static/
│   │   ├── css/ (style CSS)
│   │   └── js/ (skrypty JavaScript)
├── testimonials/
│   ├── ada-jedrzejczyk.webp
│   └── rav.magic.webp
└── inne pliki statyczne
```

## ⚠️ Uwagi:

- **Formularz kontaktowy**: MailerLite będzie działać normalnie (to zewnętrzny serwis)
- **Obrazy**: Teraz używają zwykłych tagów `<img>` zamiast Next.js `Image`
- **Hosting**: Możesz wrzucić na dowolny hosting (nie potrzebujesz Node.js)

## 🔧 Jeśli nadal nie działa:

1. Sprawdź konsolę przeglądarki (F12) pod kątem błędów
2. Upewnij się, że wszystkie pliki z folderu `out/` zostały skopiowane
3. Sprawdź, czy ścieżki do obrazów są poprawne

## 📞 Kontakt:

Jeśli masz problemy, sprawdź:
- Czy build się zakończył bez błędów
- Czy folder `out/` zawiera wszystkie pliki
- Czy hosting obsługuje pliki `.webp`
