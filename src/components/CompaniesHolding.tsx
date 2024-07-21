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
  className?:string;
  minimalist?:boolean;
};

export default async function CompaniesHolding({ coin, className, minimalist=false }: Props) {
  const res = (await getCompaniesHolding(
    coin || defaultCoin
  )) as CompaniesHoldingData;
  return (
    <div className={className}>
      <header></header>
      <TableComponent companiesData={res} coin={coin} minimalist={minimalist}/>
    </div>
  );
}

type TableProps = {
  companiesData: CompaniesHoldingData;
} & Props;

async function TableComponent({ companiesData, coin }: TableProps) {
  const viewMore = false;
  const hide = (classes : string)=>{
    return cn(classes, !viewMore && "xl:hidden");
  }
  return (
    <Table className="text-base sm:text-lg text-center xl:text-sm">
      <TableCaption>A list of your companies holding {coin}</TableCaption>
      <TableHeader className="bg-secondary font-semibold">
        <TableRow>
          <TableHead></TableHead>
          <TableHead className={hide("text-primary text-left hidden lg:table-cell")}>
            Symbol
          </TableHead>
          <TableHead className="text-primary text-left lg:text-center xl:text-left">
            Name
          </TableHead>
          <TableHead className="pl-8 xl:pl-2 text-primary text-center xl:text-right">
            Total Holdings
          </TableHead>
            <TableHead 
              className={hide("text-primary text-center")}
            >
              Entry Value
            </TableHead>
            <TableHead 
              className={hide("text-primary text-center")}
            >
              Current Value
            </TableHead>
            <TableHead 
              className={hide("text-primary text-center hidden lg:table-cell")}
            >
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
                  "h-5 w-5 rounded-full xl:h-4 xl:w-4",
                  index % 2 ? "bg-secondary" : "bg-highlight"
                )}
              ></div>
            </TableCell>
            <TableCell 
              className={hide("text-base xl:text-sm text-left hidden lg:table-cell")}
            >
              {company.symbol.split(":")[1]}
            </TableCell>
            <TableCell 
              className="text-left lg:text-center xl:text-left xl:font-semibold"
            >
              {company.name}
            </TableCell>
            <TableCell 
              className="xl:text-right"
            >
              {company.total_holdings}$
            </TableCell>
            <TableCell className={hide("")}>{company.total_entry_value_usd}$</TableCell>
            <TableCell className={hide("")}>{company.total_current_value_usd}$</TableCell>
            <TableCell 
              className={hide("hidden lg:table-cell")}
            >
              {(company.percentage_of_total_supply * 100).toFixed(2)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
