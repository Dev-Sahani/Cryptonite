export type AllCoinsData = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: Date | string;
  atl: 67.81;
  atl_change_percentage: number;
  atl_date: Date | string;
  roi?: any;
  last_updated: Date | string;
}[];

export async function getAllCoinsData(): Promise<AllCoinsData> {
  const url = "https://api.coingecko.com/api/v3/coins/markets";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": process.env.COIN_GECKO_KEY || "",
    },
  };

  return await fetch(url, options).then((res) => res.json());
}
