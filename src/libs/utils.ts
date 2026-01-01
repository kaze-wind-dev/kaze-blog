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
    console.log(e.matches);
    if (e.matches) {
      isMobile = true;
    } else {
      isMobile = false;
    }
    cb(isMobile);
  });
  return isMobile;
};
