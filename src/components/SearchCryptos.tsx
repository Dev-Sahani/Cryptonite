"use client";
import { Category, getAllCategories } from "@/actions/SearchBarInfo";
import { useState, useMemo, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { IoSearchSharp } from "react-icons/io5";
import { useQuerySetClientSide } from "@/hooks/useQuerySetClientSide";

export default function SearchCryptos() {
  return (
    <div className="py-4 sm:py-6 md:py-10 flex flex-col gap-6 sm:gap-12">
      <div className="px-4 md:px-8 py-6 sm:py-8 md:py-12 bg-primary text-background flex justify-between items-center gap-6 font-medium relative">
        <IoSearchSharp className="w-8 h-8 md:w-12 md:h-12" />
        <SearchInput />
        <SearchSelect />
      </div>
    </div>
  );
}

function SearchInput() {
  const [searchVal, setSearchVal] = useQuerySetClientSide("ids", "");
  const [localSearchVal, setLocalSearchVal] = useState("");

  const debounce = () => {
    let timeOutId: NodeJS.Timeout | undefined;
    return (newValue: string) => {
      setLocalSearchVal(newValue);
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        setSearchVal(newValue);
      }, 1000);
    };
  };

  const optimizedDebounce = useMemo(() => debounce(), []);

  return (
    <Input
      value={localSearchVal}
      onChange={(e) => optimizedDebounce(e.target.value)}
      placeholder="type... (Coin Gecko API only works if you type full name bitcoin or ethereum etc."
      className="py-1.5 px-2 outline-none focus-visible:remove-outline-input rounded-none text-primary text-base md:text-lg"
    />
  );
}

function SearchSelect() {
  const [categories, setCategory] = useState<Category[]>([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryVal, setCategoryVal] = useQuerySetClientSide("category", "");

  useEffect(() => {
    getAllCategories()
      .then((res) => {
        setCategory(res);
      })
      .catch((err) => setError(err.message))
      .finally(() => setloading(false));
  }, []);

  if (error) {
    return <div className="py-2 px-4 bg-rend-400 text-primary">{error}</div>;
  }
  return (
    <Select
      defaultValue={categoryVal}
      onValueChange={(value) => {
        setCategoryVal(value);
      }}
    >
      <SelectTrigger className="w-20 md:w-56 lg:w-64 xl:72 !rounded-none text-primary">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        {!loading && <SelectItem value="none">None</SelectItem>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          categories.slice(0, 10).map((category) => (
            <SelectItem value={category.id} key={category.id}>
              {category.name}
            </SelectItem>
          ))
        )}
        {/* <SelectItem>{"Load More >>"}</SelectItem> */}
      </SelectContent>
    </Select>
  );
}
