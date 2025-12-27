import type { NavigationItem } from "@/types/navigation";

export const MAIN_NAVIGATION_LIST: NavigationItem[] = [
  { href: "/notes", name: "Notes" },
  { href: "/tech", name: "Tech Articles" },
  { href: "/works", name: "Works" },
];

export const SUB_NAVIGATION_LIST: NavigationItem[] = [
  { href: "/contact", name: "Contact" },
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
export const WORKS_LIMIT = 10;
export const TECH_LIMIT = 10;