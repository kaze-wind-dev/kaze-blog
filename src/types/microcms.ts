import type { MicroCMSListContent , MicroCMSImage} from "microcms-js-sdk";

export type MicroCMSEndPoint = "notes" | "works";

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

export type Works = {
  title: string;
  description: string;
  content: string;
  category: Category;
  thumbnail: MicroCMSImage;
} & MicroCMSListContent;

export type WorksList = Works[];
