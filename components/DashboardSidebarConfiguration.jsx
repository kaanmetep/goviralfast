import { Users } from "lucide-react";
import { CircleUser } from "lucide-react";
import { SquarePlay } from "lucide-react";
import Link from "next/link";
const DashboardSidebarConfiguration = () => {
  return (
    <div>
      <p className="font-semibold">Control Panel</p>
      <ul className="px-1 mt-2 md:mt-3 flex flex-col gap-4">
        <li className="text-gray-600 text-sm  cursor-pointer ">
          <Link href={"/dashboard/profile"} className="flex items-center gap-1">
            <CircleUser className="size-5" />
            <p>Profile</p>
          </Link>
        </li>
        <li className="text-gray-600 text-sm  cursor-pointer ">
          <Link
            href={"/dashboard/accounts"}
            className="flex items-center gap-1"
          >
            <Users className="size-5" />
            <p>Connected Accounts</p>
          </Link>
        </li>
        <li className="text-gray-600 text-sm  cursor-pointer ">
          <Link href={"/dashboard/videos"} className="flex items-center gap-1">
            <SquarePlay className="size-5" />
            <p>Shared Videos</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardSidebarConfiguration;
