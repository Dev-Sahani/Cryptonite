"use client";

import { ChartsTimeRanges, ChartsTimeRange } from "@/utils/constants";
import { cn } from "@/utils/classNames";
import LineCharts from "./LineCharts";
import { useQuerySetClientSide } from "@/hooks/useQuerySetClientSide";
import { SelectCoins } from "./SelectCoins";

type ChartsWrapperProps<T> = {
  heading?: string;
  data: T;
  lineKeys: Array<string>;
  className?: string;
};

export default function ChartsWrapper<T extends Array<object>>({
  heading = "Analysis",
  data,
  lineKeys,
  className,
}: ChartsWrapperProps<T>) {
  const [interval, setInterval] = useQuerySetClientSide(
    "interval",
    ChartsTimeRanges[0]
  );

  return (
    <div className={className}>
      <Header heading={heading} />
      <main className="pt-4 pb-1 border-2 border-secondary">
        {interval === "max" ? (
          <div className="w-full p-4 min-h-72 flex justify-center items-center text-xl">
            <p>
              Your request exceeds the allowed time range. Public API users are
              limited to querying historical data within the past 365 days.
              Upgrade to a paid plan to enjoy full historical data access:
              https://www.coingecko.com/en/api/pricing.
              <button
                className="px-2 py-1 border"
                onClick={() => setInterval(ChartsTimeRanges[0])}
              >
                Shift to Other interval
              </button>
            </p>
          </div>
        ) : (
          <LineCharts data={data} lineKeys={lineKeys} />
        )}
      </main>
    </div>
  );
}

function Header({ heading }: { heading: string }) {
  const [interval, setInterval] = useQuerySetClientSide(
    "interval",
    ChartsTimeRanges[0]
  );

  return (
    <header className="w-full flex flex-col gap-2 text-lg sm:text-xl">
      <div className="w-full py-2 flex justify-between items-center">
        <h3 className="text-lg sm:text-2xl font-medium">{heading}</h3>
        <SelectCoins />
      </div>
      <div className="px-2 py-1 w-full flex justify-between items-center gap-4 bg-secondary text-base sm:text-lg">
        <div className="flex gap-4 font-medium">
          <p>$149.86</p>
          <p className="text-green-500">0.919%</p>
        </div>
        <div className="flex gap-2 text-white">
          {ChartsTimeRanges.map((key, index) => (
            <div key={index} className="flex gap-2">
              {index !== 0 && <p>|</p>}
              <p
                onClick={() => setInterval(key as ChartsTimeRange)}
                className={cn(
                  "capitalize cursor-pointer",
                  interval === key && "text-primary font-medium"
                )}
              >
                {key}
              </p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
