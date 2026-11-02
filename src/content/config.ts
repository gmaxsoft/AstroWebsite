import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blogCategorySchema = z.enum([
  "core-business",
  "ecommerce",
  "seo-marketing",
  "technologie-it",
]);

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(160),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      image: image(),
      author: z.string(),
      category: blogCategorySchema,
      tags: z.array(z.string()).default([]),
    }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/portfolio" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(160),
      image: image(),
      author: z.string().default("Zespół Maxsoft"),
      tags: z.array(z.string()).default([]),
      /** Nagłówki H1 (HTML), jak w projekty/ */
      heading: z.string(),
      /** Krótki lead nad CTA (HTML w sekcji miękkiej) */
      ctaIntro: z.string(),
      client: z.string(),
      /** Lista technologii (ważny opis przy „Technologia”) */
      technologies: z.string(),
      /** Nagłówek opisu (np. hasło marketingowe) */
      tagline: z.string(),
      /** Główny opis realizacji (technologie, zakres) */
      bodyLead: z.string(),
      bodyExtra: z.string().optional().default(""),
      /** Katalog `/public/img/works/{numer}/` – jak w starych projektach */
      galleryNumber: z.string(),
      /** Kolejność na liście: większa = wyżej („nowsze”). */
      sortOrder: z.number().int().default(0),
    }),
});

const appLocaleSchema = z.object({
  title: z.string(),
  description: z.string().max(160),
  /** Nagłówek H1 (HTML), jak w portfolio. */
  heading: z.string(),
  tagline: z.string(),
  featuresTitle: z.string(),
  paragraphs: z.array(z.string()).min(1),
  features: z.array(z.string()).default([]),
  category: z.string(),
  screenshotAlts: z.array(z.string()).min(1),
});

const apps = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/apps" }),
  schema: ({ image }) =>
    z.object({
      sortOrder: z.number().int().default(0),
      version: z.string(),
      packageId: z.string(),
      platform: z.string().default("Android"),
      publisher: z.string().default("Maxsoft"),
      containsAds: z.boolean().default(false),
      /** Osobna strona HTML pod `/aplikacje-mobilne/{id}/polityka-prywatnosci/`. */
      privacyPolicy: z.boolean().default(false),
      icon: image(),
      cover: image(),
      screenshots: z.array(image()).min(1),
      pl: appLocaleSchema,
      en: appLocaleSchema,
    }),
});

export const collections = { blog, portfolio, apps };
