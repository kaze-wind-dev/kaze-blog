import type { NavigationItem } from "@/types/navigation";

export const SITE_URL = "https://kaze-develop.com";
export const SITE_NAME = "Kaze Notes";
export const SITE_DESCRIPTION =
  "Kaze Notesは技術メモや作品紹介をしているブログです。";
export const SITE_KEYWORDS =
  "Kaze, Notes, Blog, かぜ, フロントエンドエンジニア, Kaze Notes";
export const SITE_IMAGE = `${SITE_URL}/ogp_image.jpg`;

export const MAIN_NAVIGATION_LIST: NavigationItem[] = [
  { href: "/notes", name: "Notes" },
  { href: "/tech", name: "Tech Articles" },
  // { href: "/works", name: "Works" },
  { href: "/patterns", name: "Patterns" },
];

export const SUB_NAVIGATION_LIST: NavigationItem[] = [
  // { href: "/contact", name: "Contact" },
  { href: "/privacy", name: "Privacy Policy" },
];

export const ALL_NAVIGATION_LIST: NavigationItem[] = [
  ...MAIN_NAVIGATION_LIST,
  ...SUB_NAVIGATION_LIST,
];

export const TOP_NOTES_LIMIT = 5;
export const TOP_WORKS_LIMIT = 5;
export const TOP_TECH_LIMIT = 6;
export const NOTES_LIMIT = 10;
export const WORKS_LIMIT = 12;
export const TECH_LIMIT = 10;

export const X_URL = "https://x.com/kaze_wind_dev";
export const ZENN_LINK = "https://zenn.dev/kaze_wind";
export const GITHUB_LINK = "https://github.com/kaze-wind-dev";
