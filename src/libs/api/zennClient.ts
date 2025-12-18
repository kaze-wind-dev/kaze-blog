import type { ZennQueries, ZennArticleResponse } from "@/types/zenn";
function zennAPIClient(username: string) {
  async function get(queries?: ZennQueries): Promise<ZennArticleResponse> {
    try {
      const queryString: string = queries
        ? `&${Object.entries(queries)
            .map(([key, value]) => `${key}=${value}`)
            .join("&")}`
        : "";
      const response = await fetch(
        `https://zenn.dev/api/articles?username=${username}${queryString}`,
      );
      if (!response.ok) {
        console.error("接続エラーが発生しました:", response.status);
        throw new Error("接続エラーが発生しました");
      }

      const data: unknown = await response.json();

      if (!isZennArticleResponse(data)) {
        throw new Error("APIレスポンスの型が不正です");
      }

      return data;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? `APIリクエスト中にエラーが発生しました: ${error.message}`
          : "APIリクエスト中にエラーが発生しました。";
      console.error(message);
      throw new Error(message);
    }
  }
  return {
    get,
  };
}

function isZennArticleResponse(data: unknown): data is ZennArticleResponse {
  if (typeof data !== "object" || data === null) return false;
  const obj = data as Record<string, unknown>;

  return (
    Array.isArray(obj.articles) &&
    (obj.next_page === null || typeof obj.next_page === "number") &&
    (obj.total_count === null || typeof obj.total_count === "number")
  );
}

export default zennAPIClient;
