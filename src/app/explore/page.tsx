import {
  AllCoinsData,
  getAllCoinsData,
  type SearchParamsExplorePage,
} from "@/api/explore";
import { TableComponent } from "./_TableComponent";
import WatchList from "@/components/WatchList";
import PaginationBtn from "@/components/PaginationBtn";
import SearchCrypto from "@/components/SearchCryptos";

type Props = { searchParams: SearchParamsExplorePage };

export default async function ExplorePage({ searchParams }: Props) {
  const coinsData = await getAllCoinsData(searchParams);
  return (
    <div className="min-h-dvh w-full flex flex-col">
      <SearchCrypto />
      <TableComponent coinsData={coinsData} />
      <Pagination searchParams={searchParams} coinsData={coinsData} />
      <div className="basis-[20%]">
        <WatchList />
      </div>
    </div>
  );
}

async function Header({ searchParams }: Props) {
  return (
    <div className="py-10 flex flex-col gap-12">
      <div className="bg-primary text-background flex justify-between items-center px-8 py-12 font-medium"></div>
    </div>
  );
}

async function Pagination({
  searchParams,
  coinsData,
}: Props & { coinsData: AllCoinsData }) {
  return (
    <div className="w-full py-2 flex gap-4 items-center justify-end">
      <PaginationBtn
        arrowFirst
        disabled={!searchParams.page || Number(searchParams.page) <= 1}
        href={`/explore/?page=${Number(searchParams.page || "1") - 1}`}
      >
        Previous
      </PaginationBtn>
      <PaginationBtn
        disabled={coinsData.length < 20}
        href={`/explore/?page=${Number(searchParams.page || "1") + 1}`}
      >
        Next
      </PaginationBtn>
    </div>
  );
}
