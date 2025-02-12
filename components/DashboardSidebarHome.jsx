import { Home } from "lucide-react";
import DashboardLink from "./DashboardLink";

const DashboardSidebarConfiguration = () => {
  return (
    <div>
      <p className="font-semibold">Home</p>
      <ul className="md:px-1 mt-2 md:mt-3 flex flex-col gap-4 w-fit md:w-full">
        <li className="text-gray-600 text-sm  cursor-pointer  ">
          <DashboardLink href={"/dashboard"}>
            <Home className="size-5" />
            <p>Home</p>
          </DashboardLink>
        </li>
      </ul>
    </div>
  );
};

export default DashboardSidebarConfiguration;
