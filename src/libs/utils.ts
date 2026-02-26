import * as cheerio from "cheerio";
import { decode } from "html-entities";
import { getSingletonHighlighter } from "shiki";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function dateFormat(
  date: string | Date,
  format: string = "YYYY-MM-DD",
): string {
  return dayjs.utc(date).tz("Asia/Tokyo").format(format);
}

export const checkMediaQuery = (cb: (isMobile: boolean) => void): boolean => {
  let isMobile: boolean = false;
  const mediaQuery = window.matchMedia("(min-width: 1024px)");
  mediaQuery.addEventListener("change", (e) => {
    if (e.matches) {
      isMobile = true;
    } else {
      isMobile = false;
    }
    cb(isMobile);
  });
  return isMobile;
};

export const highlightCodeBlocks = async (html: string): Promise<string> => {
  const $ = cheerio.load(html);
  const codeBlocks = $("pre code");

  if (codeBlocks.length === 0) return html;

  const highlighter = await getSingletonHighlighter({
    langs: [
      "html",
      "css",
      "scss",
      "javascript",
      "typescript",
      "php",
      "astro",
      "jsx",
      "tsx",
      "json",
      "markdown",
      "md",
      "text",
      "plaintext",
      "bash",
      "zsh",
      "cmd",
    ],
    themes: ["dark-plus"],
  });
  codeBlocks.each((_, elm) => {
    const $code = $(elm);
    const rawCode = $code.html() || "";
    const code = decode(rawCode);
    const lang = $code.attr("class")?.replace("language-", "") || "plaintext";
    try {
      const highlighted = highlighter.codeToHtml(code, {
        lang: lang,
        theme: "dark-plus",
      });
      const pre = $code.parent("pre");
      pre.replaceWith(highlighted);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.warn(`Language not found: ${lang}, error: ${e.message}`);
      }
    }
  });
  return $.html();
};
