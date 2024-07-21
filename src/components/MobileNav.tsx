"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/classNames";
import { useState } from "react";
import { ImHome } from "react-icons/im";
import { MdExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export default function MobileNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={cn("w-screen px-2 bg-primary text-white sticky top-0 overflow-hidden z-10", className)}
    >
      <div className="h-24 flex justify-between p-4 items-center">
        {/* Logo */}
        <div className="text-xl text-centerv h-fit">Cryptonite</div>

        {/* className="p-2 bg-background rounded-full text-primary absolute right-5 top-5 transition duration-300 transform hover:scale-110 hover:shadow-sidebarBtn" */}
        <button 
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white md:hidden hover:text-secondary" 
          aria-controls="navbar-dropdown"
          aria-expanded="false"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>
      {
        isOpen &&
        <div 
        className="md:hidden flex flex-col justify-between grow"
        style={{height:"calc(100vh - 7rem)"}}
        >
          <main className="w-full">
            <hr className="border-white border mb-4"/>
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
                    <span className="inline">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </main>
          <footer className="">
            <Link href="/home" className="flex items-center">
              {/* <div className="w-12 h-12 rounded-full bg-white" /> */}
              <p className="text-3xl pr-1">@</p>
              <span className="inline">User</span>
            </Link>
          </footer>
        </div>
      }
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
