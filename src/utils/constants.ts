export const ChartsTimeRanges = ["day", "month", "year", "max"] as const;
export type ChartsTimeRange = (typeof ChartsTimeRanges)[number];
import type { AllCoinsData } from "@/api/explore";
import { ReactNode } from "react";

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

export type EntriesToShowForCoinsTable = {
  title: string;
  name: keyof AllCoinsData[number];
  hideOnSmallScreen: boolean;
  percentageValue?: boolean;
  className?: string;
}[];
export const entriesToShowForCoinsTable: EntriesToShowForCoinsTable = [
  // { title: "Symbol", name: "symbol", hideOnSmallScreen: true },
  {
    title: "Name",
    name: "name",
    hideOnSmallScreen: false,
    className: "font-medium text-left",
  },
  { title: "Price", name: "current_price", hideOnSmallScreen: false },
  {
    title: "Percentage(24h)",
    name: "price_change_percentage_24h",
    hideOnSmallScreen: true,
    percentageValue: true,
  },
  { title: "Market Cap", name: "market_cap", hideOnSmallScreen: false },
  {
    title: "Percentage(24h)",
    name: "market_cap_change_percentage_24h",
    hideOnSmallScreen: true,
    percentageValue: true,
  },
  { title: "Total Vol", name: "total_volume", hideOnSmallScreen: false },
];
