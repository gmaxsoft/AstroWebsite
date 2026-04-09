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

export const collections = { blog, portfolio };
