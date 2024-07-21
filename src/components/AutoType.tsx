"use client";
import { ReactTyped } from "react-typed";

export default function AutoType({ text }: { text: string[] }) {
  return (
    <ReactTyped
      className="text-primary text-4xl md:text-5xl lg:text-6xl font-bold"
      strings={text}
      typeSpeed={100}
      loop
      backDelay={800}
      showCursor={true}
    />
  );
}
