"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { div, ul } from "framer-motion/client";
import { menuOptions } from "@/lib/constant";
import clsx from "clsx";

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
                <TooltipTrigger>
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
              </Tooltip>
            </ul>
          ))}
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default MenuOption;
