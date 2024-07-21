import { CompaniesHoldingData, getCompaniesHolding } from "@/api/home";
import { CoinsToShowAtMarketCapSection, defaultCoin } from "@/utils/constants";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils/classNames";

type Props = {
  coin?: (typeof CoinsToShowAtMarketCapSection)[number];
};

export default async function CompaniesHolding({ coin }: Props) {
  const res = (await getCompaniesHolding(
    coin || defaultCoin
  )) as CompaniesHoldingData;
  return (
    <div>
      <header></header>
      <TableComponent companiesData={res} coin={coin} />
    </div>
  );
}

type TableProps = {
  companiesData: CompaniesHoldingData;
} & Props;

async function TableComponent({ companiesData, coin }: TableProps) {
  return (
    <Table className="text-lg text-center ">
      <TableCaption>A list of your companies holding {coin}</TableCaption>
      <TableHeader className="bg-secondary font-semibold">
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="text-primary text-left hidden lg:table-cell">
            Symbol
          </TableHead>
          <TableHead className="text-primary text-left lg:text-center">
            Name
          </TableHead>
          <TableHead className="pl-8 text-primary text-center">
            Total Holdings
          </TableHead>
          <TableHead className="text-primary text-center">
            Entry Value
          </TableHead>
          <TableHead className="text-primary text-center">
            Current Value
          </TableHead>
          <TableHead className="text-primary text-center hidden lg:table-cell">
            Percentage Of Supply
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companiesData.companies.map((company, index) => (
          <TableRow key={company.symbol} className="relative">
            <TableCell className="max-w-8 p-0 pl-2">
              <div
                className={cn(
                  "h-5 w-5 rounded-full",
                  index % 2 ? "bg-secondary" : "bg-highlight"
                )}
              ></div>
            </TableCell>
            <TableCell className="text-base text-left hidden lg:table-cell">
              {company.symbol.split(":")[1]}
            </TableCell>
            <TableCell className="text-left lg:text-center">
              {company.name}
            </TableCell>
            <TableCell>{company.total_holdings}$</TableCell>
            <TableCell>{company.total_entry_value_usd}$</TableCell>
            <TableCell>{company.total_current_value_usd}$</TableCell>
            <TableCell className="hidden lg:table-cell">
              {(company.percentage_of_total_supply * 100).toFixed(2)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
