# Formularz Kontaktowy - Instrukcja Konfiguracji

## Co zostało zaimplementowane

✅ **API Route** (`/app/api/contact/route.js`)
- Endpoint POST do obsługi formularza
- Walidacja danych wejściowych
- Wysyłanie emaili przez nodemailer
- Obsługa błędów

✅ **Komponent ContactForm** (w `app/page.jsx`)
- Formularz z walidacją po stronie klienta
- Stan ładowania podczas wysyłania
- Komunikaty o sukcesie/błędzie
- Reset formularza po wysłaniu

## Konfiguracja Email

### 1. Instalacja nodemailer
```bash
npm install nodemailer
```

### 2. Utworzenie pliku .env.local
Stwórz plik `.env.local` w głównym katalogu projektu:

```env
# Dla Gmail (zalecane)
EMAIL_USER=twoj-email@gmail.com
EMAIL_PASS=twoje-haslo-aplikacji

# Dla Outlook/Hotmail
# EMAIL_USER=twoj-email@outlook.com
# EMAIL_PASS=twoje-haslo

# Dla Yahoo
# EMAIL_USER=twoj-email@yahoo.com
# EMAIL_PASS=twoje-haslo
```

### 3. Konfiguracja Gmail (zalecane)

#### Krok 1: Włącz 2FA na koncie Gmail
1. Idź do [myaccount.google.com](https://myaccount.google.com)
2. Bezpieczeństwo → Weryfikacja dwuetapowa
3. Włącz weryfikację dwuetapową

#### Krok 2: Wygeneruj hasło aplikacji
1. Bezpieczeństwo → Hasła aplikacji
2. Wybierz "Poczta" i "Inne urządzenie"
3. Skopiuj wygenerowane hasło (16 znaków)
4. Użyj tego hasła w `EMAIL_PASS`

### 4. Konfiguracja innych providerów

#### Outlook/Hotmail
```env
EMAIL_USER=twoj-email@outlook.com
EMAIL_PASS=twoje-haslo
```

#### Yahoo
```env
EMAIL_USER=twoj-email@yahoo.com
EMAIL_PASS=twoje-haslo
```

#### Własny SMTP
Jeśli chcesz użyć własnego serwera SMTP, zmodyfikuj `app/api/contact/route.js`:

```javascript
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

I dodaj do `.env.local`:
```env
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=twoj-email@example.com
EMAIL_PASS=twoje-haslo
```

## Testowanie

1. Uruchom aplikację: `npm run dev`
2. Idź do sekcji "Skontaktuj się"
3. Wypełnij formularz
4. Sprawdź czy email dotarł do `kontakt@magiclife.pl`

## Bezpieczeństwo

- ✅ Walidacja po stronie serwera
- ✅ Sanityzacja danych wejściowych
- ✅ Obsługa błędów
- ✅ Rate limiting (można dodać)
- ✅ CORS (domyślnie w Next.js)

## Rozszerzenia (opcjonalne)

### Rate Limiting
Można dodać ograniczenie liczby wysłanych wiadomości:

```bash
npm install @upstash/ratelimit @upstash/redis
```

### ReCAPTCHA
Można dodać Google reCAPTCHA:

```bash
npm install react-google-recaptcha
```

### Baza danych
Można zapisywać wiadomości do bazy danych przed wysłaniem emaila.

## Troubleshooting

### Błąd: "Invalid login"
- Sprawdź czy EMAIL_USER i EMAIL_PASS są poprawne
- Dla Gmail: użyj hasła aplikacji, nie zwykłego hasła
- Sprawdź czy 2FA jest włączone

### Błąd: "Connection timeout"
- Sprawdź połączenie internetowe
- Sprawdź czy port 587/465 nie jest zablokowany
- Spróbuj innego providera email

### Email nie dociera
- Sprawdź folder spam
- Sprawdź czy adres `kontakt@magiclife.pl` jest poprawny
- Sprawdź logi serwera w konsoli

## Wsparcie

Jeśli masz problemy z konfiguracją, sprawdź:
1. Logi w konsoli przeglądarki (F12)
2. Logi serwera w terminalu
3. Czy wszystkie zmienne środowiskowe są ustawione
4. Czy nodemailer jest zainstalowany

