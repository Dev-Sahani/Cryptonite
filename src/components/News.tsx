import { CompaniesHoldingData, getCompaniesHolding } from "@/api/home";
import { CoinsToShowAtMarketCapSection, defaultCoin } from "@/utils/constants";

type Props = {
  coin?: (typeof CoinsToShowAtMarketCapSection)[number];
  className?:string
};

export default async function News({ coin, className}: Props) {
  const res = (await getCompaniesHolding(
    coin || defaultCoin
  )) as CompaniesHoldingData;
  const data = [1,2,3,4]; 
  const cssClass = "flex justify-evenly my-12 " + className;
  return (
    <div className={cssClass}>
      {
        data.map(el => <NewsCard companiesData={res} coin={coin} key={el}/> )
      }
    </div>
  );
}

type TableProps = {
  companiesData: CompaniesHoldingData;
} & Props;

async function NewsCard({ companiesData, coin }: TableProps) {
  return (
    <div className="h-24 w-24 shadow-sm">
      News
    </div>
  );
}
