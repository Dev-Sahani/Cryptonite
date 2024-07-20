import { ChartsTimeRange } from "./constants";

export function DateToString(date: Date, interval: ChartsTimeRange) {
  switch (interval) {
    case "day":
      return date.toUTCString().slice(5, 11) + date.toUTCString().slice(17, 22);
    case "month":
      return date.toUTCString().slice(5, 11);
    default:
      return date.toUTCString().slice(5, 16);
  }
}
