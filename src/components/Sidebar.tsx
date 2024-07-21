"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/classNames";
import { useLayoutEffect, useState } from "react";
// import resolveConfig from "tailwindcss/resolveConfig";
// import tailwindConfig from "../../tailwind.config";
import { ImHome } from "react-icons/im";
import { MdExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
// import useWindowSize from "@/hooks/windowSizeHook";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  // const { screens } = resolveConfig(tailwindConfig).theme;
  const [isOpen, setIsOpen] = useState(false);
  // const windowSize = useWindowSize();
  // useLayoutEffect(() => {
  //   console.log(windowSize.width, Number(screens.lg.split("px")[0]));
  //   setIsOpen(() => windowSize.width >= Number(screens.lg.split("px")[0]));
  // }, [windowSize]);

  return (
    <div
      className={cn(
        "h-dvh px-2 md:px-4 bg-primary text-white relative sticky top-0 overflow-hidden",
        isOpen && "w-40",
        !isOpen && "w-20",
        className
      )}
    >
      <header className="mb-28">
        <button
          className="p-2 bg-background rounded-full text-primary hidden lg:block absolute right-5 top-5 transition duration-300 transform hover:scale-110 hover:shadow-sidebarBtn"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <GoArrowLeft /> : <GoArrowRight />}
        </button>
      </header>

      <main className="w-full">
        <ul className="h-full w-full flex flex-col gap-6">
          {sidebarList.map((item) => (
            <li
              key={item.to}
              className={cn(
                "w-full p-2 rounded text-lg sticky left-0",
                pathname == item.to && "bg-highlight text-primary"
              )}
            >
              <Link
                className="w-full flex items-center gap-2 no-wrap"
                href={item.to}
              >
                {item.icon ? item.icon : item.title}
                <span className={cn(isOpen ? "inline" : "hidden")}>
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <footer className={cn("absolute bottom-10 left-6", isOpen && "!left-4")}>
        <Link href="/home" className="flex items-center">
          {/* <div className="w-12 h-12 rounded-full bg-white" /> */}
          <p className="text-3xl pr-1">@</p>
          <span className={cn(isOpen ? "inline" : "hidden")}>User</span>
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
