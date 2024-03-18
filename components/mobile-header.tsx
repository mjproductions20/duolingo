import React from "react";
import { MobileSidebar } from "./mobile-sidebar";

const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-6 bg-green-500 h-[50px] flex items-center border-b fixed top-0 w-full z-50">
      <MobileSidebar />
    </nav>
  );
};

export default MobileHeader;
