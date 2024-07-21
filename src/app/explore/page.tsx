import { getAllCoinsData, type SearchParamsExplorePage } from "@/api/explore";
import { TableComponent } from "./_TableComponent";
import WatchList from "@/components/WatchList";

type Props = { searchParams: SearchParamsExplorePage };

export default async function ExplorePage({ searchParams }: Props) {
  const coinsData = await getAllCoinsData(searchParams);
  return (
    <div className="min-h-dvh w-full flex flex-col">
      <TableComponent coinsData={coinsData} />
      <div className="basis-[20%]">
        <WatchList />
      </div>
    </div>
  );
}
