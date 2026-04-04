import type { CollectionEntry } from "astro:content";

/** Wpis kolekcji `blog` (Content Layer + glob). */
export type BlogEntry = CollectionEntry<"blog">;

/** Liczba wpisów na stronie indeksu bloga (lista / siatka). */
export const BLOG_INDEX_PAGE_SIZE = 9;

/** Kolekcja `blog` — dozwolone klucze kategorii (zgodne ze schematem). */
export const BLOG_CATEGORY_KEYS = [
  "core-business",
  "ecommerce",
  "seo-marketing",
  "technologie-it",
] as const;

export type BlogCategoryKey = (typeof BLOG_CATEGORY_KEYS)[number];

export function sortBlogPostsByDateDesc(entries: BlogEntry[]): BlogEntry[] {
  return [...entries].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export function getRelatedPosts(
  all: BlogEntry[],
  current: BlogEntry,
  limit = 3,
): BlogEntry[] {
  const tagSet = new Set(current.data.tags);
  const scored = all
    .filter((p) => p.id !== current.id)
    .map((post) => ({
      post,
      score: post.data.tags.filter((t: string) => tagSet.has(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf(),
    )
    .map((x) => x.post);

  if (scored.length >= limit) {
    return scored.slice(0, limit);
  }

  const filler = all
    .filter((p) => p.id !== current.id && !scored.some((s) => s.id === p.id))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return [...scored, ...filler].slice(0, limit);
}
