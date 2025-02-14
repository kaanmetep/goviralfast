"use client";
import DashboardSidebarConfiguration from "./DashboardSidebarConfiguration";
import DashboardSidebarHome from "./DashboardSidebarHome";
import { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

// This component is created to group the 'hideable' components in the sidebar.
const DashboardSidebarHideable = () => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <div className="relative">
      {!isHidden && (
        <div>
          <DashboardSidebarHome />
          <hr className=" md:block w-full h-[2px] bg-gray-300 my-2 md:my-3" />
          <DashboardSidebarConfiguration />
          <hr className=" md:block w-full h-[2px] bg-gray-300" />
        </div>
      )}
      <button
        className="md:hidden flex items-center gap-2 px-2 py-1 bg-gray-50 hover:bg-gray-100 rounded-lg absolute right-2 -bottom-[96px] cursor-pointer transition-colors"
        onClick={() => setIsHidden((curr) => !curr)}
      >
        {isHidden ? (
          <ArrowDown className="size-4 md:size-5" />
        ) : (
          <ArrowUp className="size-4 md:size-5" />
        )}
        <span className="text-xs">{isHidden ? "Show Menu" : "Hide Menu"}</span>
      </button>
    </div>
  );
};

export default DashboardSidebarHideable;
