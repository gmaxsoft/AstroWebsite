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

export const collections = { blog };
