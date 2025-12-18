import { ZENN_USERNAME } from "astro:env/client";
import zennAPIClient from "./zennClient";
import type { ZennQueries, ZennArticleResponse } from "@/types/zenn";

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
