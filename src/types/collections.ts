import type { CollectionEntry } from "astro:content";

export type CollectionArticle = CollectionEntry<"patterns" | "notes">;

export type CollectionArticleList = CollectionArticle[];
