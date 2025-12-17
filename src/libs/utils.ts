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
