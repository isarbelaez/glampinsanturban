#!/usr/bin/env node
/**
 * Script de renombrado del template
 * Uso: pnpm rename
 *
 * Busca y reemplaza todos los nombres genéricos en el proyecto:
 * - GENERIC_PROJECT_NAME → nombre real del proyecto
 * - GENERIC_USERNAME     → usuario de GitHub
 * - GENERIC_REPO_NAME    → nombre del repositorio en GitHub
 * - GENERIC_DESCRIPTION  → descripción del proyecto
 * - GENERIC_AUTHOR       → nombre del autor
 * - GENERIC_URL          → URL del sitio (se construye automáticamente)
 */

import { readFileSync, writeFileSync, readdirSync, statSync, renameSync, existsSync } from 'fs';
import { join, extname, relative } from 'path';
import { createInterface } from 'readline';

// ─── Configuración ──────────────────────────────────────────────────────────

const PLACEHOLDERS = {
  GENERIC_PROJECT_NAME: '',
  GENERIC_USERNAME: '',
  GENERIC_REPO_NAME: '',
  GENERIC_DESCRIPTION: '',
  GENERIC_AUTHOR: '',
  GENERIC_URL: '',
};

// Extensiones de archivos a procesar (contenido de texto)
const TEXT_EXTENSIONS = new Set([
  '.astro',
  '.ts',
  '.tsx',
  '.js',
  '.mjs',
  '.cjs',
  '.json',
  '.md',
  '.mdx',
  '.css',
  '.scss',
  '.yml',
  '.yaml',
  '.html',
  '.txt',
  '.env.example',
]);

// Archivos específicos sin extensión que también se procesan
const TEXT_FILES = new Set([
  '.env.example',
  '.gitignore',
  '.prettierignore',
  'Makefile',
  'Dockerfile',
]);

// Directorios a ignorar completamente
const IGNORE_DIRS = new Set(['node_modules', '.git', 'dist', '.astro', '.husky']);

// ─── Helpers ────────────────────────────────────────────────────────────────

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

function shouldProcessFile(filePath) {
  const name = filePath.split(/[/\\]/).pop();
  const ext = extname(name);
  return TEXT_EXTENSIONS.has(ext) || TEXT_FILES.has(name);
}

function getAllFiles(dir, results = []) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry)) continue;
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      getAllFiles(fullPath, results);
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

function replaceInContent(content, replacements) {
  let result = content;
  for (const [placeholder, value] of Object.entries(replacements)) {
    result = result.replaceAll(placeholder, value);
  }
  return result;
}

function processFiles(rootDir, replacements) {
  const files = getAllFiles(rootDir);
  let changedFiles = 0;

  for (const filePath of files) {
    if (!shouldProcessFile(filePath)) continue;

    const original = readFileSync(filePath, 'utf-8');
    const updated = replaceInContent(original, replacements);

    if (original !== updated) {
      writeFileSync(filePath, updated, 'utf-8');
      const rel = relative(rootDir, filePath);
      console.log(`  ✏️  ${rel}`);
      changedFiles++;
    }
  }
  return changedFiles;
}

// ─── Main ───────────────────────────────────────────────────────────────────

console.log('\n🚀 Template Astro — Script de Renombrado\n');
console.log('Este script reemplazará los nombres genéricos en todo el proyecto.\n');

async function main() {
  const projectName = (await ask('📦 Nombre del proyecto (ej: mi-blog): ')).trim();
  const username = (await ask('👤 Usuario de GitHub (ej: johndoe): ')).trim();
  const repoName =
    (await ask('📁 Nombre del repositorio (ej: mi-blog, vacío = mismo que proyecto): ')).trim() ||
    projectName;
  const description = (await ask('📝 Descripción del proyecto: ')).trim();
  const author = (await ask('✍️  Nombre del autor: ')).trim();

  rl.close();

  // Construir URL automáticamente
  const siteUrl = `https://${username}.github.io/${repoName}`;

  const replacements = {
    GENERIC_PROJECT_NAME: projectName,
    GENERIC_USERNAME: username,
    GENERIC_REPO_NAME: repoName,
    GENERIC_DESCRIPTION: description,
    GENERIC_AUTHOR: author,
    GENERIC_URL: siteUrl,
  };

  console.log('\n📋 Resumen de cambios:');
  console.log('─────────────────────────────────────────');
  for (const [key, val] of Object.entries(replacements)) {
    console.log(`  ${key.padEnd(25)} → ${val}`);
  }
  console.log('─────────────────────────────────────────\n');

  console.log('🔍 Procesando archivos...\n');
  const rootDir = process.cwd();
  const changed = processFiles(rootDir, replacements);

  console.log(`\n✅ Listo! Se actualizaron ${changed} archivo(s).\n`);
  console.log('📌 Próximos pasos:');
  console.log('  1. Revisa astro.config.mjs — descomenta el campo `base` si usas un subdirectorio');
  console.log(`  2. URL del sitio: ${siteUrl}`);
  console.log('  3. Activa GitHub Pages en: Settings → Pages → Source: GitHub Actions');
  console.log('  4. Haz tu primer commit: git add . && git commit -m "feat: inicializar proyecto"');
  console.log('  5. Push a main: git push origin main\n');
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
