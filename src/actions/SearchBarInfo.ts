"use server";

export type Category = {
  id: string;
  name: string;
  market_cap: number;
  market_cap_change_24h: number;
  content: string;
  top_3_coins: string[];
  volume_24h: number;
  updated_at: string;
};

export async function getAllCategories(): Promise<Category[]> {
  const url =
    "https://api.coingecko.com/api/v3/coins/categories?order=market_cap_desc";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": process.env.COIN_GECKO_KEY || "",
    },
  };

  return await fetch(url, options).then((res) => {
    if (res.status !== 200) {
      console.log(res.statusText);
      return [];
    }
    return res.json();
  });
}
