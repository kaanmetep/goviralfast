import DashboardSidebarProfile from "./DashboardSidebarProfile";
import DashboardSidebarHideable from "./DashboardSidebarHideable";
import { Rocket } from "lucide-react";
import { Home } from "lucide-react";
import Link from "next/link";

const DashboardSidebar = async () => {
  return (
    <div className="relative top-0 left-0 md:w-[330px] md:fixed flex flex-col bg-white p-4 shadow-xl border-r-2 border-gray-200 md:h-screen shrink-0">
      <div className="flex  justify-between items-center md:block">
        <Link href={"/dashboard"}>
          <div className="flex items-center gap-1 ">
            <Rocket className="fill-yellow-200 size-6 sm:size-7 md:size-9" />
            <h1 className="text-xl font-semibold">GoViralFast</h1>
          </div>
        </Link>
        <Link href="/dashboard" className="button md:mt-6 flex items-center">
          <Home size={18} />
          <p>See All Viral Videos</p>
        </Link>
      </div>
      <hr className="w-full h-[2px] bg-gray-300 mt-2 md:mt-6" />
      <div className="relative h-full md:justify-between md:flex md:flex-col">
        <div className="flex flex-col gap-2 md:gap-3 mt-2 md:mt-3 ">
          <DashboardSidebarHideable />
          <DashboardSidebarProfile />
        </div>

        <div className=" mt-4 md:mt-auto flex flex-col items-end md:items-center absolute md:relative top-0 right-0">
          <a
            href="mailto:kaan@kmpcodes.com"
            className="text-xs md:text-sm underline text-blue-700 "
          >
            Contact via e-mail
          </a>
          <p className="text-gray-500 text-[9px] md:text-xs">
            I'll get back to you within 24 hours!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
