import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cms.maxsoft.pl',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
