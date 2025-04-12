import MenuOption from "@/components/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <MenuOption />
      {props.children}
    </div>
  );
};

export default Layout;
// border-l-[1px] border-t-[1px] pb-20 h-screen rounded-l-3xl border-muted-foreground/20  overflow-y-scroll
