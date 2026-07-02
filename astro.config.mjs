import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ihsanuladab.or.id',
  integrations: [sitemap()],
});
