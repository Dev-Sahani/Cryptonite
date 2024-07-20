export const ChartsTimeRanges = ["day", "month", "year", "max"] as const;
export type ChartsTimeRange = (typeof ChartsTimeRanges)[number];

export const numberOfDaysCorrespondingtoRange = {
  day: "1",
  month: "30",
  year: "365",
  max: "3650",
};

export const colors = ["#151515", "green", "red", "purple", "yellow"];

export const defaultCoin = "bitcoin" as const;

export const CoinsToShowAtMarketCapSection = [
  "bitcoin",
  "ethereum",
  "tether",
  "solana",
  "binancecoin",
] as const;
