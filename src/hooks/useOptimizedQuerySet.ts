"use client";
import { useEffect, useState, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useOptimizedQuerySet(query: string, defaultValue: string) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [queryVal, setQueryVal] = useState<string>(() => {
    return searchParams.get(query) || defaultValue || "";
  });

  useEffect(() => {
    console.log("inside useEffect");
    const params = new URLSearchParams(searchParams);
    params.set(query, queryVal);
    router.push(`${pathname}?${params.toString()}`);
  }, [[queryVal, searchParams, pathname, router]]);

  const [localVal, setLocalValue] = useState<string>(queryVal);

  const debounce = () => {
    let timeOutId: NodeJS.Timeout | undefined;
    return (newValue: string) => {
      console.log(newValue);
      console.log(newValue);
      setLocalValue(newValue);
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        console.log("inside setTimeOut");
        setQueryVal(newValue);
      }, 900);
    };
  };

  const optimizedDebounce = useMemo(() => debounce(), []);
  console.log(optimizedDebounce);
  return [localVal, optimizedDebounce] as [string, (newValue: string) => void];
}
