// navigation
export interface NavigationItem {
  href: string;
  name: string;
};
export interface Navigation {
  items: NavigationItem[];
  className: {
    nav?: string;
    list?: string;
    item?: string;
    link?: string;
  };
  ariaLabel?: string;
};