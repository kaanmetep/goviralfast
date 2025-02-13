import { Users } from "lucide-react";
import { CircleUser } from "lucide-react";

import DashboardLink from "./DashboardLink";
const DashboardSidebarConfiguration = () => {
  return (
    <div>
      <p className="font-semibold">Control Panel</p>
      <ul className=" mt-2 md:mt-3 flex flex-col gap-4 w-fit md:w-full">
        <li className="text-gray-600 text-sm  cursor-pointer ">
          <DashboardLink
            href={"/dashboard/profile"}
            className="flex items-center gap-1"
          >
            <CircleUser className="size-5" />
            <p>Profile</p>
          </DashboardLink>
        </li>
        <li className="text-gray-600 text-sm  cursor-pointer ">
          <DashboardLink
            href={"/dashboard/accounts"}
            className="flex items-center gap-1"
          >
            <Users className="size-5" />
            <p>Connected Accounts</p>
          </DashboardLink>
        </li>
      </ul>
    </div>
  );
};

export default DashboardSidebarConfiguration;
