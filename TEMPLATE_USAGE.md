# 📖 Guía de Uso del Template

> ⚠️ **DEPLOY EN GITHUB PAGES — SOLO SITIOS ESTÁTICOS**
> Este template está configurado para `output: 'static'`. GitHub Actions **no soporta** adaptadores SSR (node, cloudflare, vercel, etc.). Si necesitas SSR, deberás usar otro proveedor de hosting.

---

## ¿Qué es este template?

Un punto de partida profesional para proyectos Astro con:

- ✅ Astro 6 + React + Tailwind CSS v4 + MDX
- ✅ Content Collections para gestión de contenido tipado
- ✅ SEO automático (sitemap, Open Graph, Twitter Card)
- ✅ Deploy automatizado a GitHub Pages via Actions
- ✅ Código formateado con Prettier + ESLint configurado
- ✅ Commits con Conventional Commits (Husky + commitlint)
- ✅ Script de renombrado para proyectos nuevos

---

## 🚀 Cómo usar el template para un nuevo proyecto

### Paso 1 — Clonar o usar como template en GitHub

**Opción A — Desde GitHub (recomendado):**

1. Ve al repositorio en GitHub
2. Haz clic en **"Use this template"** → **"Create a new repository"**
3. Clona tu nuevo repositorio:
   ```bash
   git clone https://github.com/TU_USUARIO/TU_REPO.git
   cd TU_REPO
   ```

**Opción B — Clonar directamente:**

```bash
git clone https://github.com/GENERIC_USERNAME/GENERIC_REPO_NAME.git mi-nuevo-proyecto
cd mi-nuevo-proyecto
# Opcional: desconectar del origen del template
git remote remove origin
git remote add origin https://github.com/TU_USUARIO/TU_NUEVO_REPO.git
```

### Paso 2 — Instalar dependencias

```bash
pnpm install
```

### Paso 3 — Renombrar el template (IMPORTANTE)

Ejecuta el script interactivo de renombrado. Cambiará **todos** los nombres genéricos en el proyecto (contenido de archivos, package.json, astro.config.mjs, etc.):

```bash
pnpm rename
```

El script te pedirá:

- 📦 **Nombre del proyecto** (ej: `mi-blog`, `portfolio-2024`)
- 👤 **Usuario de GitHub** (ej: `johndoe`)
- 📁 **Nombre del repositorio** (ej: `mi-blog`)
- 📝 **Descripción del proyecto**
- ✍️ **Nombre del autor**

> **Placeholders que se reemplazan:**
>
> | Placeholder            | Descripción                    |
> | ---------------------- | ------------------------------ |
> | `GENERIC_PROJECT_NAME` | Nombre del proyecto            |
> | `GENERIC_USERNAME`     | Usuario de GitHub              |
> | `GENERIC_REPO_NAME`    | Nombre del repositorio         |
> | `GENERIC_DESCRIPTION`  | Descripción del proyecto       |
> | `GENERIC_AUTHOR`       | Nombre del autor               |
> | `GENERIC_URL`          | URL construida automáticamente |

### Paso 4 — Configurar astro.config.mjs

Después de correr `pnpm rename`, verifica `astro.config.mjs`:

```js
export default defineConfig({
  // ✅ Debe quedar con tu URL real:
  site: 'https://TU_USUARIO.github.io',

  // ✅ Descomenta si tu repo NO es "username.github.io":
  // base: '/TU_REPO',

  output: 'static', // ⚠️ No cambiar para GitHub Pages
});
```

**Regla del campo `base`:**
| Tipo de repositorio | `site` | `base` |
|---|---|---|
| `username.github.io` | `https://username.github.io` | No se necesita |
| Cualquier otro repo | `https://username.github.io` | `/nombre-del-repo` |

### Paso 5 — Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. **Settings** → **Pages**
3. En **Source** selecciona: **"GitHub Actions"**
4. ¡Listo! El workflow se ejecutará automáticamente en cada push a `main`

### Paso 6 — Primer commit y deploy

```bash
git add .
git commit -m "feat: inicializar proyecto desde template"
git push origin main
```

El deploy se ejecuta automáticamente. Puedes ver el progreso en la pestaña **Actions** de GitHub.

---

## 📁 Estructura del Proyecto

```
template-astro/
├── .github/workflows/deploy.yml   # CI/CD → GitHub Pages (solo estático)
├── .husky/
│   ├── pre-commit                 # Ejecuta lint-staged antes de commit
│   └── commit-msg                 # Valida formato Conventional Commits
├── scripts/
│   └── rename.mjs                 # Script interactivo de renombrado
├── src/
│   ├── content/
│   │   ├── config.ts              # Schemas de Content Collections (Zod)
│   │   └── blog/ejemplo.mdx       # Post de ejemplo
│   ├── layouts/
│   │   └── Layout.astro           # Layout base con SEO completo
│   ├── pages/
│   │   ├── index.astro            # Homepage
│   │   ├── 404.astro              # Página de error
│   │   └── blog/
│   │       ├── index.astro        # Listado del blog
│   │       └── [...slug].astro    # Post individual
│   └── styles/
│       └── global.css             # Estilos globales + Tailwind
├── .eslintrc.mjs / eslint.config.mjs
├── .prettierrc.mjs
├── .commitlintrc.mjs
├── .lintstagedrc.mjs
├── astro.config.mjs               # Configuración de Astro
└── package.json
```

---

## 📝 Añadir Contenido

### Nuevo post de blog

Crea un archivo `.mdx` en `src/content/blog/`:

```mdx
---
title: 'Mi Nuevo Post'
description: 'Descripción del post'
pubDate: 2024-06-01
author: 'Tu Nombre'
tags: ['tag1', 'tag2']
draft: false
---

# Mi Nuevo Post

Contenido del post en **Markdown** con soporte para _componentes React_.
```

### Nueva página estática

Crea un archivo `.astro` en `src/pages/`:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Mi Página" description="Descripción">
  <main>
    <h1>Mi Nueva Página</h1>
  </main>
</Layout>
```

---

## 🔧 Reglas de Commits

Este template usa **Conventional Commits**. El formato requerido es:

```
tipo(scope opcional): descripción en minúsculas
```

**Tipos permitidos:**

| Tipo       | Cuándo usarlo                         |
| ---------- | ------------------------------------- |
| `feat`     | Nueva funcionalidad                   |
| `fix`      | Corrección de bug                     |
| `docs`     | Solo documentación                    |
| `style`    | Formato, espacios (sin cambio lógico) |
| `refactor` | Refactorización                       |
| `perf`     | Mejoras de rendimiento                |
| `test`     | Tests                                 |
| `build`    | Build system, dependencias            |
| `ci`       | Cambios en CI/CD                      |
| `chore`    | Mantenimiento                         |
| `revert`   | Revertir commit                       |

**Ejemplos:**

```bash
git commit -m "feat: agregar sección de testimonios"
git commit -m "fix: corregir error en formulario de contacto"
git commit -m "docs: actualizar guía de instalación"
git commit -m "style: formatear archivos con prettier"
```

---

## ⚠️ Limitaciones Importantes

### GitHub Pages — Solo Estático

> GitHub Actions con GitHub Pages **solo soporta sitios estáticos** (`output: 'static'`).
>
> **No uses:**
>
> - `output: 'server'` o `output: 'hybrid'`
> - Adaptadores SSR: `@astrojs/node`, `@astrojs/cloudflare`, `@astrojs/vercel`
> - APIs de servidor (`Astro.request`, endpoints POST, etc.)
>
> **Si necesitas SSR**, considera otros hosts: Vercel, Netlify, Cloudflare Pages, Railway.

---

## 📚 Recursos Útiles

- [Documentación de Astro](https://docs.astro.build)
- [Content Collections](https://docs.astro.build/en/reference/modules/astro-content/)
- [Deploy en GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Conventional Commits](https://www.conventionalcommits.org)
