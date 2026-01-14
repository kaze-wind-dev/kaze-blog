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
  site_url: string;
  github_url?: string;
  design_url?: string;
  period: string;
  background: string;
  technical: string;
  learned: string;
  time: string;
  time_detail?: string;
  thumbnail?: MicroCMSImage;
  images?: MicroCMSImage[];
  category: Category;
  technology_stack?: string[];
} & MicroCMSListContent;

export type WorksList = Works[];
