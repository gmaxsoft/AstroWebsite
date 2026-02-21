# Maxsoft.pl

Nowoczesna strona internetowa firmy Maxsoft - kompleksowe usługi programistyczne, projektowanie stron WWW, sklepy internetowe, integracje API, systemy CRM/ERP. Zbudowana na frameworku Astro z pełnym wsparciem wielojęzyczności, optymalizacją obrazów i SEO.

## ✨ Funkcje

- **Wielojęzyczność (i18n)**: Polski (`pl`) jako domyślny + Angielski (`en`)
- **Optymalizacja obrazów**: WebP z `astro:assets` + Sharp
- **SEO**: Open Graph, Twitter Cards (`astro-seo`) z poprawnymi canonical tags
- **Wyjście serwerowe**: Node.js adapter dla dynamicznych aplikacji
- **TypeScript**: Pełne wsparcie typów
- **SCSS**: Modularne style z Sass
- **Animacje**: Swiper + Bootstrap 5
- **Ikony**: Font Awesome
- **Responsywność**: Mobile First
- **Formularze kontaktowe**: Nodemailer (serwerowe endpointy)

## 🚀 Demo i Kontakt

| Typ | Link/Informacja |
| :--- | :--- |
| **Live Demo** | [👉 www.maxsoft.pl](https://www.maxsoft.pl/) |
| **Lokalizacja** | Zielona Góra \| Lubrza |
| **Repozytorium** | GitHub Repository |

***

## ✨ Kluczowe Funkcje

* **Wielojęzyczność (i18n)**: Pełne wsparcie, z Polskim (`pl`) jako domyślnym oraz Angielskim (`en`).
* **Optymalizacja Obrazów**: Wykorzystanie formatu **WebP** oraz komponentu `astro:assets` w połączeniu z biblioteką **Sharp** dla najlepszej wydajności.
* **SEO & Social Media**: Zaawansowana konfiguracja **Open Graph** i **Twitter Cards** za pomocą modułu `astro-seo`.
* **Wysoka Jakość Kodu**: Pełne wsparcie dla **TypeScript** gwarantujące bezpieczeństwo typów.
* **Modularne Style**: Użycie **SCSS** (Sass) do zarządzania stylami.
* **Animacje**: Karuzele i slidery obsługiwane przez **Swiper**.
* **UI/UX**: Komponenty, grid i responsywność z **Bootstrap 5**, ikony z **Font Awesome**, galerka/lightbox **FancyApps UI**.
* **Responsywność**: Architektura **Mobile First** zapewniająca idealne wyświetlanie na każdym urządzeniu.
* **Formularze Kontaktowe**: Bezpieczne endpointy serwerowe (API Routes) do obsługi wysyłki maili za pomocą **Nodemailer**.

***

## 🛠️ Stos Technologiczny

| Kategoria | Technologie |
| :--- | :--- |
| **Frontend** | Astro 5, SCSS, Bootstrap 5, Swiper, FancyApps UI, jQuery |
| **Backend** | Node.js, Nodemailer, SMTP (dla formularzy kontaktowych) |
| **Narzędzia** | TypeScript, Sharp, Astro SEO, Font Awesome |

***

## 📂 Struktura Projektu

Główne katalogi projektu:

| Ścieżka | Opis |
| :--- | :--- |
| `/public/` | Zawiera statyczne zasoby. |
| `├── favicon.svg` | Ikona strony. |
| `└── images/` | Statyczne obrazy (nieoptymalizowane). |
| `/src/` | Katalog z kodem źródłowym. |
| `├── assets/` | Style SCSS. |
| `├── components/` | Komponenty Astro (.astro). |
| `├── i18n/` | Pliki tłumaczeń (`pl.json`, `en.json`). |
| `├── layouts/` | Główne layouty (np. `Layout.astro`). |
| `├── pages/` | Strony z routingiem i i18n. |
| `├── scripts/` | Pliki JavaScript. |
| `└── env.d.ts` | Definicje typów TypeScript. |
| `/` (Root) | Główne pliki konfiguracyjne. |
| `├── astro.config.mjs` | Główna konfiguracja Astro i i18n. |
| `├── package.json` | Lista zależności i skrypty. |
| `└── tsconfig.json` | Konfiguracja TypeScript. |

***

## 🏁 Szybki Start

### Wymagania

Upewnij się, że masz zainstalowane:

* Node.js **wersja 18+**
* npm **wersja 9+**

### Instalacja

Sklonuj repozytorium i zainstaluj zależności:

```bash
git clone https://github.com/gmaxsoft/website_maxsoft.git
cd maxsoft.pl
npm install
```

### Uruchomienie

| Komenda | Opis | URL |
| :---: | :---: | :---: |
| `npm run dev` | Uruchamia serwer deweloperski | http://localhost:4321 |
| `npm run build` | Buduje projekt dla środowiska produkcyjnego | - |
| `npm run preview` | Lokalny podgląd zbudowanej wersji produkcyjnej | - |
| `npm run astro check` | Weryfikacja kodu za pomocą TypeScript | - |