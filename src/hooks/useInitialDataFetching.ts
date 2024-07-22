"use client";
import { useState, useEffect } from "react";

export default function useInitialDataFetching<T>(
  initialValue: T,
  dataFetchFunction: () => Promise<T>
) {
  const [state, setState] = useState<T>(initialValue);
  const [pending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    dataFetchFunction()
      .then((res) => {
        setState(res);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsPending(false));
  }, [dataFetchFunction]);

  return [state, pending, error] as [T, boolean, string | null];
}
