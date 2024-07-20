"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/classNames";
import { useLayoutEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import { ImHome } from "react-icons/im";
import { MdExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { screens } = resolveConfig(tailwindConfig).theme;
  const [isOpen, setIsOpen] = useState(true);

  useLayoutEffect(() => {
    setIsOpen(window.innerWidth >= Number(screens.lg.split("px")[0]));
  }, []);

  return (
    <div
      className={cn(
        "h-dvh px-4 bg-primary text-white relative sticky top-0",
        isOpen && "min-w-40",
        !isOpen && "min-w-16",
        className
      )}
    >
      <header className="mb-12">
        <div className="bg-white w-16 h-16 rounded-full mb-2" />
        <p className="text-xs ml-1">Cryptonite</p>
      </header>

      <main className="w-full">
        <ul className="h-full w-full flex flex-col gap-6">
          {sidebarList.map((item) => (
            <li
              key={item.to}
              className={cn(
                "w-full p-2 rounded text-lg",
                pathname == item.to && "bg-highlight text-primary"
              )}
            >
              <Link className="w-full" href={item.to}>
                {item.icon ? item.icon : item.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <footer className="absolute bottom-10 left-4">
        <Link href="/home" className="flex items-center">
          {/* <div className="w-12 h-12 rounded-full bg-white" /> */}
          <p className="text-3xl pr-1">@</p>
          <p>User</p>
        </Link>
      </footer>
    </div>
  );
}

const sidebarList = [
  {
    title: "Home",
    icon: <ImHome className="w-6 h-6" />,
    to: "/home",
  },
  {
    title: "Explore",
    icon: <MdExplore className="w-8 h-8 ml-[-1px]" />,
    to: "/explore",
  },
  {
    title: "Profile",
    icon: <CgProfile className="w-6 h-6" />,
    to: "/profile",
  },
];
