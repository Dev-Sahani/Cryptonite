import {
  ChartsTimeRange,
  numberOfDaysCorrespondingtoRange,
  CoinsToShowAtMarketCapSection,
} from "@/utils/constants";
import { DateToString } from "@/utils/timeAndDate";

export type MarketDataType = {
  data: {
    defi_market_cap: string;
    eth_market_cap: string;
    defi_to_eth_ratio: string;
    trading_volume_24h: string;
    defi_dominance: string;
    top_coin_name: string;
    top_coin_defi_dominance: number;
  };
};
export async function getMarketData(): Promise<MarketDataType> {
  const url =
    "https://api.coingecko.com/api/v3/global/decentralized_finance_defi";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": process.env.COIN_GECKO_KEY || "",
    },
    next: {
      revalidate: 60 * 5,
    },
  };

  return await fetch(url, options).then((res) => res.json());
}

export async function getMarketCap(timeRange: ChartsTimeRange, coin: string) {
  try {
    const baseUrl = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart/?vs_currency=usd&days=${
      numberOfDaysCorrespondingtoRange[timeRange]
    }${timeRange !== "day" && "&interval=daily"}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": process.env.COIN_GECKO_KEY || "",
      },
    };

    const result = await fetch(baseUrl, options).then((res) => res.json());

    if (!result.market_caps)
      throw new Error(
        result.error?.status?.error_message || "Something went wrong."
      );

    return result?.market_caps?.map(
      ([time, data]: [number, number]) =>
        [DateToString(new Date(time), timeRange), data] as [string, number]
    );
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
}

export async function getCompaniesHolding(
  coin: (typeof CoinsToShowAtMarketCapSection)[number]
) {
  const url = `https://api.coingecko.com/api/v3/companies/public_treasury/${coin}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": process.env.COIN_GECKO_KEY || "",
    },
  };
  return (await fetch(url, options).then((res) =>
    res.json()
  )) as CompaniesHoldingData;
}

export type CompaniesHoldingData = {
  total_holdings: number;
  total_value_usd: number;
  market_cap_dominance: number;
  companies: {
    name: string;
    symbol: string;
    country: string;
    total_holdings: number;
    total_entry_value_usd: number;
    total_current_value_usd: number;
    percentage_of_total_supply: number;
  }[];
};
