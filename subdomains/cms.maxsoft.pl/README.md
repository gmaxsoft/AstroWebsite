## Maxsoft CMS (cms.maxsoft.pl)

Statyczny landing page (one‑page) prezentujący autorski system **Maxsoft CMS**.
Projekt jest zbudowany w **Astro** i generuje gotowe pliki do publikacji (output `dist/`).

## Wymagania

- **Node.js**: zalecane aktualne LTS
- **npm**: zgodnie z Node.js

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Po uruchomieniu dev serwera Astro strona będzie dostępna pod adresem podanym w konsoli (zwykle `http://localhost:4321`).

## Build (produkcja)

```bash
npm run build
```

Wynik generuje się do katalogu `dist/`.

## Podgląd buildu

```bash
npm run preview
```

## Wdrożenie

- **Statyczne hostowanie**: wgraj zawartość katalogu `dist/` na serwer/hosting obsługujący statyczne pliki.
- **Docelowo**: publikacja na subdomenie **cms.maxsoft.pl**.

## Funkcje / elementy UI

- **Sekcja “Kluczowe Funkcje Systemu”**: karty funkcji (m.in. “Modułowość i skalowalność”, “Szybkość i elastyczność wdrożenia”).
- **Karuzela screenów**: nawigacja strzałkami i kropkami.
- **Podgląd i powiększenie (GLightbox)**: kliknięcie w screen otwiera lightbox (galeria).

## Zawartość karuzeli (obrazki)

Pliki znajdują się w `public/img/carousel/` i są podpinane w `src/pages/index.astro`.

Jeśli chcesz podmienić screeny:
- zachowaj ścieżki lub zaktualizuj `src/pages/index.astro`
- format preferowany: `webp`

## Struktura projektu (najważniejsze)

- `src/pages/index.astro` – główna strona
- `src/layouts/Layout.astro` – layout + SEO
- `src/styles/global.css` – globalne style
- Lightbox ładowany z CDN w `src/pages/index.astro` (GLightbox – skrypt klasyczny, bez modułów ESM)

