/** Fragment URL (`tag-...`) i atrybut `id` dla tagów bloga. */
export function blogTagToId(tag: string): string {
  const slug = tag
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "tag";
}
