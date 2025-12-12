import type {
  GetListRequest,
  GetListDetailRequest,
  GetAllContentRequest,
  MicroCMSQueries,
  CustomRequestInit,
} from "microcms-js-sdk";
import type { Notes } from "@/types/microcms";
import { createClient } from "microcms-js-sdk";

const apiKey = import.meta.env.MICROCMS_API_KEY;
const serviceDomain = import.meta.env.MICROCMS_SEARVICE_DOMAIN;

if (!apiKey || !serviceDomain) {
  throw new Error("MICROCMS_SERVICE_DOMAIN or MICROCMS_API_KEY is not set");
}

const client = createClient({
  serviceDomain,
  apiKey,
});

// 記事の一覧取得用の共通関数
export const getPosts = async <T>({
  endpoint,
  queries,
  customRequestInit,
}: GetListRequest) => {
  try {
    const data = await client.getList<T>({
      endpoint,
      queries,
      customRequestInit,
    });
    return data;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "unknownエラーです";
    console.error(message, error);
    throw new Error(message);
  }
};

// 記事の全件取得用の共通関数
export const getAllPosts = async <T>({
  endpoint,
  queries,
  customRequestInit,
}: GetAllContentRequest) => {
  try {
    const data = await client.getAllContents<T>({
      endpoint,
      queries,
      customRequestInit,
    });
    return data;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "unknownエラーです";
    console.error(message, error);
    throw new Error(message);
  }
};

// 詳細取得の共通関数
export const getDetail = async <T>({
  endpoint,
  contentId,
  queries,
  customRequestInit,
}: GetListDetailRequest) => {
  try {
    const data = await client.getListDetail<T>({
      endpoint,
      contentId,
      queries,
      customRequestInit,
    });
    return data;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "unknownエラーです";
    console.error(message, error);
    throw new Error(message);
  }
};

export const getNotesList = async (
  queries?: MicroCMSQueries,
  customRequestInit?: CustomRequestInit,
) => {
  return getPosts<Notes>({ endpoint: "notes", queries, customRequestInit });
};

export const getAllNotesList = async (
  queries?: MicroCMSQueries,
  customRequestInit?: CustomRequestInit,
) => {
  return getAllPosts<Notes>({ endpoint: "notes", queries, customRequestInit });
};
