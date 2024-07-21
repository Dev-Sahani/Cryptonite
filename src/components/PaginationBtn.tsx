"use client";
import React, { ComponentProps, ReactNode } from "react";
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
    "w-fit bg-primary text-background flex justify-center items-center transition transform",
    className,
    "hover:scale-105 active:scale-95",
    other?.disabled && "hover:cursor-not-allowed"
  );

  return (
    <button className={classes} {...other}>
      <Link
        className={cn(
          "py-1.5 md:py-2 text-sm sm:text-base w-full flex justify-center items-center gap-2 text-center leading-4",
          arrow && "px-2.5 md:px-3",
          !arrow && "px-3 md:px-4"
        )}
        href={other?.disabled ? "" : href}
      >
        {arrow && arrowFirst && <GoArrowLeft />}
        {children}
        {arrow && !arrowFirst && <GoArrowRight />}
      </Link>
    </button>
  );
}
