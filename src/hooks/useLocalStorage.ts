"use client";
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialvalue: T) {
  const [value, setValue] = useState<T>(() => {
    // Not allowing server to run the code.
    if (typeof window !== "undefined") {
      const jsonValue = localStorage?.getItem(key);
      if (jsonValue == null) return initialvalue;

      return JSON.parse(jsonValue);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
