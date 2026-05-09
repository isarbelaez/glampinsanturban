/**
 * Utilidad robusta para gestionar rutas de assets en Astro.
 * Maneja automáticamente el BASE_URL configurado en astro.config.mjs
 * y corrige rutas que incluyan erróneamente el prefijo '/public'.
 *
 * @param path La ruta del recurso (ej: '/images/logo.png' o '/public/images/logo.png')
 * @returns La ruta final procesada lista para usar en src o href
 */
export function asset(path: string | undefined | null): string {
  if (!path) return '';

  // 1. Limpiar la ruta: eliminar el prefijo '/public' si existe
  // En Astro, los archivos en public/ se sirven desde la raíz '/'
  let cleanPath = path;
  if (cleanPath.startsWith('/public/')) {
    cleanPath = cleanPath.substring(7);
  } else if (cleanPath.startsWith('public/')) {
    cleanPath = '/' + cleanPath.substring(7);
  }

  // 2. Asegurar que la ruta comience con '/'
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }

  // 3. Obtener el BASE_URL de Astro (definido en astro.config.mjs)
  // Astro ya incluye las barras necesarias en import.meta.env.BASE_URL
  const baseUrl = import.meta.env.BASE_URL || '/';

  // 4. Si el BASE_URL es solo '/', retornamos la ruta limpia
  if (baseUrl === '/') {
    return cleanPath;
  }

  // 5. Combinar BASE_URL (que termina en /) con cleanPath (que empieza con /)
  // Eliminamos la barra duplicada resultante
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  return `${normalizedBase}${cleanPath}`;
}
