// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// ⚠️ IMPORTANTE: Cambia estos valores usando el script `pnpm rename`
// o manualmente antes de desplegar.
//
// NOTA PARA GITHUB PAGES:
// Este template está configurado para deploy ESTÁTICO.
// GitHub Actions solo soporta `output: 'static'`.
// NO uses adaptadores SSR (node, cloudflare, vercel, etc.) con GitHub Pages.

export default defineConfig({
  // 🔧 Cambiar a la URL real del sitio: https://isarbelaez.github.io/glampinsanturban
  site: 'https://isarbelaez.github.io',

  // 🔧 Cambiar al nombre real del repositorio (dejar vacío si es username.github.io)
  // base: '/glampinsanturban',

  // Output estático (requerido para GitHub Pages)
  output: 'static',

  integrations: [react(), mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
