import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const patterns = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/patterns" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.enum(["accessibility", "motion"]),
  }),
});

export const collections = { patterns };
