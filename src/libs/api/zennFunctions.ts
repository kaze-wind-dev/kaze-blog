import { ZENN_USERNAME } from "astro:env/client";
import zennAPIClient from "./zennClient";
import type {
  ZennQueries,
  ZennArticleResponse,
  UnifiedArticleResponse,
} from "@/types/zenn";

if (!ZENN_USERNAME) {
  throw new Error("usernameが設定されていません");
}

const client = zennAPIClient(ZENN_USERNAME);

export async function getZennArticles(
  queries: ZennQueries = {
    count: 10,
    order: "latest",
  },
): Promise<ZennArticleResponse> {
  try {
    const articleList: ZennArticleResponse = await client.get(queries);
    return articleList;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "不明なエラー";
    console.error("Zenn記事の取得に失敗しました:", errorMessage);
    throw error;
  }
}

export async function getZennArticlesUnified(
  page: number = 1,
  limit: number = 10,
): Promise<UnifiedArticleResponse> {
  const response = await client.get({
    page,
    count: limit,
    order: "latest",
  });
  const totalCount = await getZennTotalCount();
  return {
    articles: response.articles,
    next_page: response.next_page,
    total_count: totalCount,
    offset: (page - 1) * limit,
    limit: limit,
  };
}

export async function getZennTotalCount(): Promise<number> {
  let total = 0;
  let page = 1;

  while (true) {
    let res;
    try {
      res = await client.get({ page, count: 30 });
    } catch (error) {
      console.error(`Error fetching Zenn articles on page ${page}:`, error);
      throw new Error(
        `Zenn APIから記事の取得中にエラーが発生しました (page: ${page})`,
      );
    }
    total += res.articles.length;
    if (res.next_page === null) break;
    page++;
  }

  return total;
}
