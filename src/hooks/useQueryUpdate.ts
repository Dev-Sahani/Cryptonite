"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useQueryUpdate(query: string, defaultValue: string) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [queryVal, setQueryVal] = useState<string>(() => {
    return searchParams.get(query) || defaultValue || "";
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set(query, queryVal);
    router.push(`${pathname}?${params.toString()}`);
  }, [query, queryVal]);

  return [queryVal, setQueryVal] as [string, typeof setQueryVal];
}
