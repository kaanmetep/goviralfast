import { Home } from "lucide-react";

import Link from "next/link";
const DashboardSidebarConfiguration = () => {
  return (
    <div>
      <p className="font-semibold">Home</p>
      <ul className="px-1 mt-2 md:mt-3 flex flex-col gap-4">
        <li className="text-gray-600 text-sm  cursor-pointer ">
          <Link href={"/dashboard"} className="flex items-center gap-1">
            <Home className="size-5" />
            <p>Home</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardSidebarConfiguration;
