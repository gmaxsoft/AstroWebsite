import type { CollectionEntry } from "astro:content";

export type PortfolioEntry = CollectionEntry<"portfolio">;

/** Liczba realizacji na stronie indeksu portfolio. */
export const PORTFOLIO_INDEX_PAGE_SIZE = 9;

/** Kolejność listy: `sortOrder` malejąco (wyższa = wyżej), potem tytuł, potem id. */
export function sortPortfolioEntries(
  entries: PortfolioEntry[],
): PortfolioEntry[] {
  return [...entries].sort((a, b) => {
    const o = b.data.sortOrder - a.data.sortOrder;
    if (o !== 0) return o;
    const t = a.data.title.localeCompare(b.data.title, "pl", {
      sensitivity: "base",
    });
    if (t !== 0) return t;
    return a.id.localeCompare(b.id);
  });
}

export function getPortfolioOgImagePath(galleryNumber: string): string {
  return `/img/works/${galleryNumber}/1.webp`;
}

/** Meta description dla realizacji portfolio (max ~160 znaków). */
export function getPortfolioMetaDescription(entry: PortfolioEntry): string {
  const desc = entry.data.description?.trim() || "";
  if (desc.length >= 80) return desc.length > 160 ? `${desc.slice(0, 157)}…` : desc;
  const tech = entry.data.bodyLead?.replace(/\s+/g, " ").trim() || "";
  let text = [entry.data.title, tech].filter(Boolean).join(". ");
  if (text.length > 160) text = `${text.slice(0, 157).trimEnd()}…`;
  return text;
}
