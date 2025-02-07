import { Users } from "lucide-react";
import { CircleUser } from "lucide-react";
const DashboardSidebarConfiguration = () => {
  return (
    <div className="mt-2 md:mt-6">
      <p className="font-semibold">Configuration</p>
      <ul className="px-1 mt-2 md:mt-3 flex flex-col gap-2 md:lgap-4">
        <li className="text-gray-600 text-sm flex items-center gap-1  cursor-pointer">
          <CircleUser className="size-5" />
          <p>Profile</p>
        </li>
        <li className="text-gray-600 text-sm flex items-center gap-1 cursor-pointer ">
          <Users className="size-5" />
          <p>Connected Accounts</p>
        </li>
      </ul>
    </div>
  );
};

export default DashboardSidebarConfiguration;
