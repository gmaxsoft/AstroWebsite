import type { CollectionEntry } from "astro:content";

export type AppEntry = CollectionEntry<"apps">;
export type AppLang = "pl" | "en";

/** Liczba aplikacji na stronie indeksu. */
export const APPS_INDEX_PAGE_SIZE = 9;

export const SITE_ORIGIN = "https://www.maxsoft.pl";

/** Kolejność listy: `sortOrder` malejąco, potem tytuł, potem id. */
export function sortAppEntries(entries: AppEntry[]): AppEntry[] {
  return [...entries].sort((a, b) => {
    const o = b.data.sortOrder - a.data.sortOrder;
    if (o !== 0) return o;
    const t = a.data.pl.title.localeCompare(b.data.pl.title, "pl", {
      sensitivity: "base",
    });
    if (t !== 0) return t;
    return a.id.localeCompare(b.id);
  });
}

export function appBasePath(langPrefix: string): string {
  return `${langPrefix}/aplikacje-mobilne/`;
}

export function appEntryPath(langPrefix: string, slug: string): string {
  return `${langPrefix}/aplikacje-mobilne/${slug}/`;
}

export function appPrivacyPath(langPrefix: string, slug: string): string {
  return `${langPrefix}/aplikacje-mobilne/${slug}/polityka-prywatnosci/`;
}

export function appPrivacyAbsolute(langPrefix: string, slug: string): string {
  return `${SITE_ORIGIN}${appPrivacyPath(langPrefix, slug)}`;
}
