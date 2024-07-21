import React, { ComponentProps, ReactNode, useState } from "react";
import Link from "next/link";
import { cn } from "@/utils/classNames";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

type Props = {
  primary?: boolean;
  secondary?: boolean;
  arrow?: boolean;
  arrowFirst?: boolean;
  href?: string;
  children: ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function Button({
  primary = false,
  secondary = false,
  arrowFirst = false,
  arrow = true,
  href = "#",
  children,
  className,
  ...other
}: Props) {
  const classes = cn(
    "w-fit py-2 md:py-2.5 bg-primary text-background flex justify-center items-center transition transform",
    className,
    arrow && "px-3 md:px-4",
    !arrow && "px-4 md:px-5",
    "hover:scale-105 active:scale-95"
  );

  return (
    <button className={classes} {...other}>
      <Link
        className="text-sm sm:text-base w-full flex justify-center items-center gap-2 text-center leading-4"
        href={href}
      >
        {arrow && arrowFirst && <GoArrowLeft />}
        {children}
        {arrow && !arrowFirst && <GoArrowRight />}
      </Link>
    </button>
  );
}
