import { getCoinDetail } from "@/api/product";
import { formatNumber } from "@/utils/typeConversion";
import Image from "next/image";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const coinData = await getCoinDetail(params.id);
  return (
    <div>
      <div className="py-10 flex flex-col gap-12">
        <div className="bg-primary text-background flex justify-between items-center px-8 py-12 font-medium">
          <div className="flex items-center gap-4">
            <Image
              src={coinData?.image?.large || "/next.svg"}
              alt={coinData?.id || "coin"}
              width="80"
              height="80"
              className="mix-blend-difference"
            />
            <h1 className="text-4xl font-bold">{coinData.name}</h1>
          </div>
          <div>
            <p className="text-xs">Price</p>
            <p>{formatNumber(coinData.market_data.current_price?.usd || 0)}$</p>
          </div>
          <div>
            <p className="text-xs">Market Cap</p>
            <p>{formatNumber(coinData.market_data.market_cap?.usd || 0)}$</p>
          </div>
          <div>
            <p className="text-xs">Volume</p>
            <p>{coinData.market_data.total_volume?.usd || 0}$</p>
          </div>
        </div>
      </div>
    </div>
  );
}
