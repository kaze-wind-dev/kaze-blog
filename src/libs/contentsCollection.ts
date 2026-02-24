import type { CollectionArticleList } from "@/types/collections";

export const orderedContentsCollection = (
  posts: CollectionArticleList,
  order: "desc" | "asc" = "desc",
) => {
  return posts.sort((a, b) => {
    if (order === "desc") {
      return (
        new Date(b.data.publishedAt).getTime() -
        new Date(a.data.publishedAt).getTime()
      );
    } else {
      return (
        new Date(a.data.publishedAt).getTime() -
        new Date(b.data.publishedAt).getTime()
      );
    }
  });
};
