"use client";
import { useState, useEffect } from "react";

export default function useClientDataFetching<T>(
  initialValue: T,
  dataFetchFunction: () => Promise<T>
) {
  const [state, setState] = useState<T>(initialValue);
  const [pending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    console.log("inside useEffect");
    dataFetchFunction()
      .then((res) => {
        console.log(res);
        setState(res);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsPending(false));
  }, []);

  return [state, pending, error] as [T, boolean, string | null];
}
