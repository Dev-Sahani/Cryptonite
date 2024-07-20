import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuerySetClientSide } from "@/hooks/useQuerySetClientSide";
import { defaultCoin, CoinsToShowAtMarketCapSection } from "@/utils/constants";

export function SelectCoins() {
  const [coin, setCoin] = useQuerySetClientSide("coin", defaultCoin);

  return (
    <Select defaultValue={coin} onValueChange={(value) => setCoin(value)}>
      <SelectTrigger className="w-72 bg-primary text-secondary text-lg text-center capitalize rounded-none">
        <SelectValue placeholder="Select a Coin" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {CoinsToShowAtMarketCapSection.map((option) => (
            <SelectItem
              value={option}
              key={option}
              className="text-xl capitalize"
            >
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
