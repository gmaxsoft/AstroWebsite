# Maxsoft CRM – Strona subdomeny crm.maxsoft.pl

Prosta, nowoczesna strona onepage prezentująca system CRM Maxsoft. Kolorystyka czarno-pomarańczowa, zgodna z główną stroną maxsoft.pl.

## Technologie

- **Astro 5** – statyczna generacja, SEO-friendly
- **astro-seo** – meta tagi, Open Graph
- **@astrojs/sitemap** – automatyczna mapa strony

## Uruchomienie

```bash
# Instalacja zależności
npm install

# Tryb deweloperski
npm run dev

# Build produkcyjny
npm run build

# Podgląd buildu
npm run preview
```

## Wdrożenie na crm.maxsoft.pl

1. Zbuduj projekt: `npm run build`
2. Skopiuj zawartość folderu `dist/` na serwer subdomeny crm.maxsoft.pl
3. Skonfiguruj virtual host / subdomenę tak, aby wskazywała na katalog z plikami buildu

## SEO

- Meta title, description, canonical
- Open Graph
- Schema.org (SoftwareApplication)
- Sitemap
- robots.txt
- Semantyczny HTML (header, main, section, article, nav, footer)
