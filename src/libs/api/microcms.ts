import { MICROCMS_API_KEY, MICROCMS_SERVICE_DOMAIN } from "astro:env/server";

import type {
  GetListRequest,
  GetListDetailRequest,
  GetAllContentRequest,
  MicroCMSQueries,
  CustomRequestInit,
} from "microcms-js-sdk";
import type { Notes, Works, Category } from "@/types/microcms";

import { createClient } from "microcms-js-sdk";

if (!MICROCMS_API_KEY || !MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN or MICROCMS_API_KEY is not set");
}

const client = createClient({
  serviceDomain: MICROCMS_SERVICE_DOMAIN,
  apiKey: MICROCMS_API_KEY,
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

export const getNoteDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
  customRequestInit?: CustomRequestInit,
) => {
  return getDetail<Notes>({ endpoint: "notes", contentId, queries, customRequestInit });
};

export const getWorksList = async (
  queries?: MicroCMSQueries,
  customRequestInit?: CustomRequestInit,
) => {
  return getPosts<Works>({ endpoint: "works", queries, customRequestInit });
};

export const getAllWorksList = async (
  queries?: MicroCMSQueries,
  customRequestInit?: CustomRequestInit,
) => {
  return getAllPosts<Works>({ endpoint: "works", queries, customRequestInit });
};

export const getCategoryList = async (
  queries?: MicroCMSQueries,
  customRequestInit?: CustomRequestInit,
) => {
  return getPosts<Category>({ endpoint: "category", queries, customRequestInit });
};

export const getAllCategoryList = async (
  queries?: MicroCMSQueries,
  customRequestInit?: CustomRequestInit,
) => {
  return getAllPosts<Category>({ endpoint: "category", queries, customRequestInit });
};

