// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://siteisabella.vercel.app',

  // Despliegue en Vercel
  output: 'static',

  integrations: [react(), mdx(), sitemap()],
  compressHTML: true,
  prefetch: true,

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
});
