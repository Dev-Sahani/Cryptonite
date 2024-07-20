import { getMarketCap, getMarketData } from "@/api/home";
import ChartsWrapper from "@/components/ChartsWrapper";
import CompaniesHolding from "@/components/CompaniesHolding";
import {
  ChartsTimeRange,
  ChartsTimeRanges,
  defaultCoin,
  CoinsToShowAtMarketCapSection,
} from "@/utils/constants";
import { roundOffString } from "@/utils/typeConversion";

type Props = {
  searchParams: {
    interval?: ChartsTimeRange;
    coin?: (typeof CoinsToShowAtMarketCapSection)[number];
  };
};

export default async function HomePage({
  searchParams: { interval, coin },
}: Props) {
  const res = await getMarketCap(
    interval || ChartsTimeRanges[0],
    coin || defaultCoin
  );
  const marketData = await getMarketData();
  return (
    <div className="py-10 flex flex-col gap-12">
      <div className="bg-primary text-background flex justify-between items-center px-8 py-12 font-medium">
        <h1 className="text-4xl font-bold">CryptoCurrenies</h1>
        <div>
          <p className="text-xs">Total Market Cap</p>
          <p>{roundOffString(marketData.data.defi_market_cap, 2)}$</p>
        </div>
        <div>
          <p className="text-xs">Dominant coin</p>
          <p>{marketData.data.top_coin_name}</p>
        </div>
        <div>
          <p className="text-xs">Dominantce Percentage</p>
          <p>{marketData.data.top_coin_defi_dominance.toFixed(2)}%</p>
        </div>
      </div>
      <ChartsWrapper heading="Market Cap" data={res} lineKeys={["1"]} />
      <CompaniesHolding coin={coin || defaultCoin} />
    </div>
  );
}
