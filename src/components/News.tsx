import { CompaniesHoldingData, getCompaniesHolding } from "@/api/home";
import { CoinsToShowAtMarketCapSection, defaultCoin } from "@/utils/constants";

type Props = {
  coin?: (typeof CoinsToShowAtMarketCapSection)[number];
  className?: string;
};

export default async function News({ coin, className }: Props) {
  const res = (await getCompaniesHolding(
    coin || defaultCoin
  )) as CompaniesHoldingData;
  const data = [1, 2, 3, 4];
  const cssClass = "flex justify-evenly my-12 " + className;
  return (
    <div className={cssClass}>
      {data.map((el) => (
        <NewsCard companiesData={res} coin={coin} key={el} />
      ))}
    </div>
  );
}

type TableProps = {
  companiesData: CompaniesHoldingData;
} & Props;

async function NewsCard({ companiesData, coin }: TableProps) {
  return (
    <div className="p-4 bg-secondary">
      {/* <img src="" alt="news image" className="h-24 w-48 bg-scondary" /> */}
      <h3 className="w-full min-w-20 md:min-w-40 h-24 bg-secondary text-primary font-medium text-xl text-center mt-12">
        News
      </h3>
      <h2 className="text-lg font-semibold">News heading</h2>
      <p className="text-justify w-32 min-h-16">News article....</p>
    </div>
  );
}
