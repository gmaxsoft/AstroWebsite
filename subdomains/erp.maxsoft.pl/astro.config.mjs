import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://erp.maxsoft.pl',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
