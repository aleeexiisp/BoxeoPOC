import es from "./es.json";
import ca from "./ca.json";
import en from "./en.json";

export const LOCALES = ["es", "ca", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

const DICTIONARIES = { es, ca, en } as const;

export type Dictionary = typeof es;

export function getLocaleFromUrl(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split("/");
  if ((LOCALES as readonly string[]).includes(maybeLocale)) {
    return maybeLocale as Locale;
  }
  return DEFAULT_LOCALE;
}

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

/**
 * Prefijo de ruta para un locale dado ("" para el idioma por defecto).
 * Siempre añade `/` final: astro.config.mjs usa `trailingSlash: "always"`.
 */
export function localePath(locale: Locale, path: string = "/"): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const cleanPath = path.endsWith("/") ? path : `${path}/`;
  return `${base}${prefix}${cleanPath}`;
}
