export function generateTocList(
  articleContentClass: string,
  tocListClass: string,
  headingSelector: string = "h2, h3",
  tocItemClass: string = "toc__item",
  tocLinkClass: string = "toc__link",
):
  | {
      tocLinks: HTMLAnchorElement[];
      tocList: HTMLUListElement;
      headings: NodeListOf<HTMLHeadingElement>;
      articleContent: HTMLElement;
    }
  | undefined {
  const articleContent =
    document.querySelector<HTMLElement>(articleContentClass);
  const tocList = document.querySelector<HTMLUListElement>(tocListClass);
  if (!articleContent || !tocList) return;

  const headings =
    articleContent.querySelectorAll<HTMLHeadingElement>(headingSelector);
  const tocLinks: HTMLAnchorElement[] = [];

  headings.forEach((heading) => {
    const headingText: string = heading.textContent || "";
    const headingId: string = heading.id;
    const tocItem: HTMLLIElement = document.createElement("li");
    const headingLevel: string = heading.tagName.toLowerCase();

    tocItem.classList.add(tocItemClass, `${tocItemClass}--${headingLevel}`);
    const anchor: HTMLAnchorElement = document.createElement("a");
    anchor.classList.add(tocLinkClass);
    anchor.href = `#${headingId}`;
    anchor.textContent = headingText;
    tocItem.appendChild<HTMLAnchorElement>(anchor);
    tocList.appendChild<HTMLLIElement>(tocItem);
    tocLinks.push(anchor);
  });
  return { tocLinks, tocList, headings, articleContent };
}

export function handleIntersection(
  entries: IntersectionObserverEntry[],
  tocList: HTMLElement,
  tocLinks: HTMLAnchorElement[],
): void {
  entries.forEach((entry) => {
    const id: string = entry.target.id;
    const tocLink = tocList?.querySelector<HTMLAnchorElement>(
      `a[href="#${id}"]`,
    );
    if (entry.isIntersecting) {
      tocLinks.forEach((link) => removeActiveClass(link));
      addActiveClass(tocLink as HTMLElement);
    }
  });
}
export function addActiveClass(el: HTMLElement): void {
  el.classList.add("is-active");
}
export function removeActiveClass(el: HTMLElement): void {
  el.classList.remove("is-active");
}
export function initTocObserver(
  headings: NodeListOf<HTMLHeadingElement>,
  tocList: HTMLElement,
  tocLinks: HTMLAnchorElement[],
  io: IntersectionObserver,
): void {
  headings.forEach((heading) => {
    io.observe(heading);
  });
}
