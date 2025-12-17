import type { MicroCMSListContent } from "microcms-js-sdk";

export type Category = {
  name: string;
  category_id: string;
  connection: string;
} & MicroCMSListContent;

export type CategoryList = Category[];

export type Notes = {
  title: string;
  description: string;
  content: string;
  category: Category;
} & MicroCMSListContent;

export type NotesList = Notes[];
