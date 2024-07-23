"use client";
// import { useRef, useEffect } from "react";
import { ChangeEvent, isValidElement, ReactNode, useState } from "react";

type Props<T> = {
  data: T[];
  formatResult: (value: T) => ReactNode;
  debounce?: number;
  key?: keyof T;
  inputClassName?: string;
  optionsContainerClassName?: string;
  autoFocus?: boolean;
  maxOptions?: number;
};

export default function AutoComplete<T>({
  data,
  formatResult,
  debounce,
  key,
  inputClassName,
  optionsContainerClassName,
  autoFocus = false,
  maxOptions = 10,
}: Props<T>) {
  const [options, setOptions] = useState(data);
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(autoFocus);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setOptions(() => {
      const re = new RegExp(val, "gi");
      const res = data.filter((val) => {
        const currString = key ? val[key] : val;
        if (typeof currString !== "string") return false;
        return currString.match(re) != null;
      });
      return res;
    });
    setValue(val);
  };

  return (
    <div className="flex flex-col gap-2 relative overflow-visible">
      <input
        value={value}
        onChange={handleChange}
        className={cn("p-1 outline-none text-black", inputClassName)}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
      />
      {options.length > 0 && isFocus && (
        <div
          className={cn(
            optionsContainerClassName,
            "w-full flex flex-col divide-y hover:cursor-pointer",
            "absolute bottom-0 translate-y-full left-0 z-10"
          )}
        >
          {options
            .map((option: T, index) => (
              <span key={index} className="p-2 text-black bg-white">
                {formatResult(option)}
              </span>
            ))
            .slice(0, maxOptions)}
        </div>
      )}
    </div>
  );
}

function cn(...classes: Array<string | null | undefined | boolean>) {
  return classes.map((c) => (c ? c : "")).join(" ");
}
