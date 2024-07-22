import { getMarketCap, getMarketData } from "@/api/home";
import ChartsWrapper from "@/components/ChartsWrapper";
import CompaniesHolding from "@/components/CompaniesHolding";
import News from "@/components/News";
import {
  ChartsTimeRange,
  ChartsTimeRanges,
  defaultCoin,
  CoinsToShowAtMarketCapSection,
} from "@/utils/constants";
import { roundOffString } from "@/utils/typeConversion";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  searchParams: {
    interval?: ChartsTimeRange;
    coin?: (typeof CoinsToShowAtMarketCapSection)[number];
  };
};

export default async function HomePage({
  searchParams: { interval, coin },
}: Props) {
  return (
    <div className="py-4 md:py-8 lg:py-10 flex flex-col gap-6 md:gap-12 xl:!grid xl:grid-cols-4">
      <Suspense fallback={<Skeleton className="w-full h-16 md:h-32" />}>
        <TopBox />
      </Suspense>
      {/* <div className="flex-grow xl:grid xl:"> */}
      <Suspense
        fallback={
          <Skeleton className="w-full h-32 sm:h-48 md:h-56 lg:h-64 xl:h-72" />
        }
      >
        <Graph interval={interval} coin={coin} />
      </Suspense>
      <CompaniesHolding
        coin={coin || defaultCoin}
        className="col-start-4 row-start-1 row-end-5 overflow-auto max-h-[900px]"
        minimalist={false}
      />
      <News className="row-start-4 col-span-3" />
      {/* </div> */}
    </div>
  );
}

async function TopBox() {
  const marketData = await getMarketData();
  return (
    <div className="bg-primary text-background flex justify-between items-center px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12 font-medium xl:col-span-3">
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
        CryptoCurrenies
      </h1>
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-12">
        <div className="block sm:flex gap-12 justify-between md:block">
          <p className="text-xs">Total Market Cap</p>
          <p className="text-sm sm:text-base">
            {roundOffString(marketData.data.defi_market_cap, 2)}$
          </p>
        </div>
        <div className="block sm:flex gap-12 justify-between md:block">
          <p className="text-xs">Dominant coin</p>
          <p className="text-sm sm:text-base">
            {marketData.data.top_coin_name}
          </p>
        </div>
        <div className="block sm:flex gap-12 justify-between md:block">
          <p className="text-xs">Dominantce Percentage</p>
          <p className="text-sm sm:text-base">
            {marketData.data.top_coin_defi_dominance.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}

async function Graph({ interval, coin }: Props[keyof Props]) {
  const res = await getMarketCap(
    interval || ChartsTimeRanges[0],
    coin || defaultCoin
  );
  return (
    <ChartsWrapper
      className="row-start-2 row-end-4 col-span-3"
      heading="Market Cap"
      data={res}
      lineKeys={["1"]}
    />
  );
}
