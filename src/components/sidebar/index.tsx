"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

import { menuOptions } from "@/lib/constant";
import clsx from "clsx";
import { Database, GitBranch, LucideMousePointerClick } from "lucide-react";
import { ModeToggle } from "../global/modelToggle";

type Props = {};

const MenuOption = (props: Props) => {
  const pathName = usePathname();
  return (
    <nav className="dark:bg-black h-screen overflow-scroll justify-between flex items-center flex-col gap-10 py-6 px-2">
      <div className="flex items-center justify-center flex-col gap-8">
        <Link className="flex font-bold flex-row" href="/">
          LumiX
        </Link>
        <TooltipProvider>
          {menuOptions.map((option) => (
            <ul key={option.name}>
              <Tooltip delayDuration={0}>
                {/* ✅ TooltipTrigger should wrap the icon/link only */}
                <TooltipTrigger asChild>
                  <li>
                    <Link
                      href={option.href}
                      className={clsx(
                        "group h-8 2-8 flex item-center scale-[1.5] rounded-lg p-[3px] cursor-pointer",
                        {
                          "dark:bg-[#2F006B] bg-[#EEE0FF]":
                            pathName === option.href,
                        }
                      )}
                    >
                      <option.Component selected={pathName === option.href} />
                    </Link>
                  </li>
                </TooltipTrigger>
                {/* ✅ TooltipContent should be separate and outside Trigger */}
                <TooltipContent side="right">
                  <p className=" font-medium border-1 p-1 rounded-md">
                    {option.name}
                  </p>
                </TooltipContent>
              </Tooltip>
            </ul>
          ))}
        </TooltipProvider>
        <Separator className="w-full bg-neutral-900" />
        <div className="flex items-center flex-col gap-9 dark:bg-[#353346]/30 py-4 px-2 rounded-full h-56 overflow-scroll border border-[#353346]">
          <div className="relative dark:bg-[#353346]/70 p-2 rounded-full border border-[#353346] dark:border-t-2 dark:border-t-[#353346]">
            <LucideMousePointerClick className="dark:text-white" size={18} />
            <div className="border-l-2 border-muted-foreground h-6 absolute left-1/2 transform -translate-x-1/2 -bottom-[30px]" />
          </div>
          <div className="relative dark:bg-[#353346]/70 p-2 rounded-full border border-[#353346] dark:border-t-2 dark:border-t-[#353346]">
            <GitBranch className="text-muted-foreground" size={18} />
            <div className="border-l-2 border-muted-foreground h-6 absolute left-1/2 transform -translate-x-1/2 -bottom-[30px]" />
          </div>
          <div className="relative dark:bg-[#353346]/70 p-2 rounded-full border border-[#353346] dark:border-t-2 dark:border-t-[#353346]">
            <Database className="text-muted-foreground" size={18} />
            <div className="border-l-2 border-muted-foreground h-6 absolute left-1/2 transform -translate-x-1/2 -bottom-[30px]" />
          </div>

          <div className="relative dark:bg-[#353346]/70 p-2 rounded-full border border-[#353346] dark:border-t-2 dark:border-t-[#353346]">
            <GitBranch className="text-muted-foreground" size={18} />
          </div>
        </div>
      </div>
      {/* section -  */}
      <div className="flex items-center justify-center flex-col gap-8">
        <div className="flex items-center justify-center flex-col gap-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default MenuOption;
