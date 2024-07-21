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

export type SearchParamsExplorePage = {
  page: string | null;
  ids: string | null;
  category: string | null;
  order: "market_cap_asc" | "market_cap_desc" | "ids_asc" | "ids_desc" | null;
};
export async function getAllCoinsData({
  ids,
  page = "1",
  category,
  order = "market_cap_desc",
}: SearchParamsExplorePage): Promise<AllCoinsData> {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&per_page=20&page=${
    page || 1
  }`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": process.env.COIN_GECKO_KEY || "",
    },
  };

  const result = await fetch(url, options)
    .then((res) => {
      if (res.status != 200) {
        throw new Error(res.statusText || "Something went wong");
      }
      return res;
    })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.message);
      return [];
    });

  return result;
}
