import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://crm.maxsoft.pl',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
