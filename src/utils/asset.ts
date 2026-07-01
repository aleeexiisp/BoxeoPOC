/** Antepone el `base` de Astro (necesario para GitHub Pages) a una ruta de public/. */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
