"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "./useDebounce";

export function useDebounceQueryUpdate(query: string, defaultValue: string) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const changeQuery = (newValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(query, newValue);
    router.push(`${pathname}?${params.toString()}`);
  };

  return useDebounce(defaultValue, 900, changeQuery);
}
