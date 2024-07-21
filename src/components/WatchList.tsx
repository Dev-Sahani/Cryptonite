"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { formatNumber } from "@/utils/typeConversion";

type WatchListType = {
  id: string;
  image: string;
  currentPrice: number;
};

export default function WatchList() {
  const [watchList, setWatchList] = useLocalStorage(
    "watch-list",
    [] as WatchListType[]
  );

  if (watchList.length === 0) {
    return (
      <div className="w-full">
        <h1 className="text-left text-xl font-semibold">Your Watchlist</h1>
        <p className="w-full text-center text-lg">Your Watch list is empty.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-left text-xl font-semibold">Your Watchlist</h1>
      <Table className="text-sm text-center">
        <TableHeader className="font-semibold">
          <TableRow>
            <TableHead className="text-primary text-center">#</TableHead>
            <TableHead className="text-primary text-left">Name</TableHead>
            <TableHead className="text-primary text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchList.map((item) => (
            <TableRow className="hover:cursor-pointer" key={item.id}>
              <TableCell className="w-20 h-20 p-0 xl:p-4 relative">
                <Image src={item.image} alt={item.id} />
              </TableCell>
              <TableCell>{formatNumber(item.currentPrice)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
