export default {
  // Archivos Astro: formatear con Prettier
  '*.astro': ['prettier --write'],

  // TypeScript / TSX: lint + formatear
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],

  // JavaScript / MJS: lint + formatear
  '*.{js,mjs,cjs}': ['eslint --fix', 'prettier --write'],

  // CSS / SCSS: formatear
  '*.{css,scss}': ['prettier --write'],

  // JSON / YAML / MD / MDX: formatear
  '*.{json,yml,yaml,md,mdx}': ['prettier --write'],
};
