export function getDisplayPages(
  currentPage: number,
  totalPages: number,
): number[] {
  const maxDisplay = 7;
  if (totalPages <= maxDisplay) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3,  NaN, totalPages];
  }
  if (currentPage > totalPages - 3) {
    return [
      1,
      NaN,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }
  return [
    1,
    NaN,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    NaN,
    totalPages,
  ];
}

export const paginationUrl = (href: URL, page: number): string => {
  if (page === 0) {
    return href.pathname;
  }
  if (href.pathname.includes("/page/")) {
    return href.pathname.replace(/\page\/\d+/, `page/${page}`);
  } else {
    return `${href.pathname}/page/${page}`;
  }
};

export const isPage = (href: URL): boolean => {
  return href.pathname.includes("/page/");
};

export const calcTotalPages = (totalCount: number, limit: number): number => {
  
  return Math.ceil(totalCount / limit);
};
