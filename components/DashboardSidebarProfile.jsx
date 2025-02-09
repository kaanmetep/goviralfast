import Link from "next/link";
import { CircleUser } from "lucide-react";

const DashboardSidebarProfile = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-end  ">
      <Link href={"/dashboard/profile"}>
        <div className=" flex items-center gap-2 cursor-pointer ">
          <CircleUser className="size-8" />
          {/* this will be user's profil photo later */}
          <div>
            <p>Kaan Peksen</p>
            <p className="text-xs text-gray-600">Monthly Plan</p>
          </div>
        </div>
      </Link>
      <button className=" mr-auto md:ml-auto  text-gray-600 px-3 md:px-3  text-xs md:text-sm bg-gray-100 rounded-md py-[3px]">
        Logout
      </button>
    </div>
  );
};

export default DashboardSidebarProfile;
