"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils/classNames";
import Image from "next/image";
import { AllCoinsData } from "@/api/explore";
import { entriesToShowForCoinsTable } from "@/utils/constants";
import { formatNumber } from "@/utils/typeConversion";
import { redirect } from "next/navigation";

export function TableComponent({ coinsData }: { coinsData: AllCoinsData }) {
  return (
    <Table className="text-sm text-center ">
      <TableHeader className="bg-secondary font-semibold">
        <TableRow>
          <TableHead className="text-primary text-center">#</TableHead>
          {entriesToShowForCoinsTable.map((item, index) => (
            <TableHead
              className={cn(
                "text-primary text-center",
                item.className,
                item.hideOnSmallScreen && "hidden lg:table-cell"
              )}
              key={index}
            >
              {item.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {coinsData.map((coin, index) => (
          <TableRow
            key={coin.symbol}
            className={cn(
              "py-0 hover:cursor-pointer",
              index === coinsData.length - 1 && "border-b border-secondary"
            )}
            onClick={() => {
              console.log("redirecting", coin.id);
              redirect(`/product/${coin.id}`);
            }}
          >
            <TableCell className="w-16 h-8 xl:w-20 xl:h-12 p-0 xl:p-4 relative">
              {coin.image && (
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width="20"
                  height="20"
                  className="w-3 h-3 md:w-5 md:h-5 xl:w-10 xl:h-10 mx-auto rounded-full"
                />
              )}
            </TableCell>
            {entriesToShowForCoinsTable.map((item, index) => (
              <TableCell
                key={index}
                className={cn(
                  "p-0 lg:px-2",
                  item.className,
                  item.hideOnSmallScreen && "hidden lg:table-cell"
                )}
              >
                {item.title === "Price" && <span>$</span>}
                {item.percentageValue ? (
                  <Percentage value={coin[item.name]} />
                ) : typeof coin[item.name] === "number" ? (
                  formatNumber(coin[item.name])
                ) : (
                  coin[item.name]
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function Percentage({ value = 0 }: { value: number }) {
  return (
    <mark
      className={cn(
        value < 0 ? "bg-red-300" : "bg-green-300",
        "px-2 py-1 text-xs"
      )}
    >
      {(value * 100).toFixed(2)}%
    </mark>
  );
}
