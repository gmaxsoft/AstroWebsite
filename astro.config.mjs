import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.maxsoft.pl',
  output: 'static',
  trailingSlash: 'always',
  redirects: {
    '/pl/': '/',
    '/pl/oferta/': '/oferta/',
    '/pl/kontakt/': '/kontakt/',
    '/pl/wspolpraca/': '/wspolpraca/',
    '/pl/projekty/': '/projekty/',
    '/pl/e-commerce/': '/e-commerce/',
    '/pl/seo/': '/seo/',
    '/pl/integracje/': '/integracje/',
    '/pl/polityka_prywatnosci/': '/polityka_prywatnosci/',
    '/pl/polityka_cookies/': '/polityka_cookies/',
    '/pl/404/': '/',
    '/pl/projekty/strona-firmowa-wooden/': '/projekty/strona-firmowa-wooden/',
    '/pl/projekty/strona-firmowa-kupsaune/': '/projekty/strona-firmowa-kupsaune/',
    '/pl/projekty/strona-firmowa-westatre/': '/projekty/strona-firmowa-westatre/',
    '/pl/projekty/rolniczy-crm/': '/projekty/rolniczy-crm/',
    '/pl/projekty/api-jbr-rogowiec/': '/projekty/api-jbr-rogowiec/',
    '/pl/projekty/sklep-rolniczy/': '/projekty/sklep-rolniczy/',
    '/pl/projekty/api-olx/': '/projekty/api-olx/',
    '/pl/blog/': '/blog/',
  },
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ['./node_modules'],
          quietDeps: true, // Wycisza ostrzeżenia deprecation z Bootstrap, Swiper itp.
          silenceDeprecations: ['import', 'global-builtin', 'slash-div', 'color-functions', 'abs-percent'],
        },
      },
    },
  }
});