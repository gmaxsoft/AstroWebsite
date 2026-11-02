import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { AppLang } from "./apps";

export function parseAppPrivacyHtml(html: string): {
  title: string;
  description: string;
  body: string;
} {
  const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = titleMatch
    ? titleMatch[1].replace(/<[^>]+>/g, "").trim()
    : "";
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = (bodyMatch?.[1] ?? "")
    .replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, "")
    .trim();
  const paragraphs = [...body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((match) =>
    match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  );
  const raw = paragraphs[1] || paragraphs[0] || title;
  const description = raw.length > 160 ? `${raw.slice(0, 157).trimEnd()}…` : raw;
  return { title, description, body };
}

export function readAppPrivacyHtml(slug: string, lang: AppLang): string | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const file = join(
    process.cwd(),
    "src",
    "content",
    "app-privacy",
    `${slug}.${lang}.html`,
  );
  try {
    return readFileSync(file, "utf8");
  } catch {
    return null;
  }
}
