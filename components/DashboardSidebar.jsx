import DashboardSidebarConfiguration from "./DashboardSidebarConfiguration";
import { Rocket } from "lucide-react";
import { CircleUser } from "lucide-react";
const DashboardSidebar = () => {
  return (
    <div className="flex flex-col bg-white p-4 shadow-xl border-r-2 border-gray-200 md:h-screen shrink-0">
      <div className="flex  justify-between items-center md:block">
        <div className="flex items-center gap-1 ">
          <Rocket className="fill-yellow-200 size-5 sm:size-7 md:size-9" />
          <h1 className="sm:text-lg md:text-xl font-semibold">GoViralFast</h1>
        </div>
        <p className="flex justify-center items-center gap-2 bg-yellow-400 text-black px-4 md:px-12 font-bold rounded-md py-3 hover:bg-yellow-400/80 transition-all delay-[50ms] text-sm md:text-base cursor-pointer md:mt-6 w-fit">
          See All Viral Videos
        </p>
      </div>
      <hr className="w-full h-[2px] bg-gray-300 mt-2 md:mt-6" />
      <div className="flex flex-col md:block gap-4 md:gap-0">
        <DashboardSidebarConfiguration />
        <hr className="hidden md:block w-full h-[2px] bg-gray-300 mt-2 md:mt-6" />

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-end">
          <div className="mt-2 md:mt-6 flex items-center gap-2 cursor-pointer ">
            <CircleUser className="size-8" />
            {/* this will be user's profil photo later */}
            <div>
              <p>Kaan Peksen</p>
              <p className="text-xs text-gray-600">Monthly Plan</p>
            </div>
          </div>
          <button className="md:mt-3 mr-auto  text-gray-600 px-3 md:px-4  text-xs md:text-base bg-gray-100 rounded-md py-1">
            Logout
          </button>
        </div>
      </div>
      <div className=" mt-4 md:mt-auto flex flex-col items-end md:items-center">
        <a
          href="mailto:kaanpmete@gmail.com"
          className="text-xs md:text-sm underline text-blue-700 "
        >
          Contact via e-mail
        </a>
        <p className="text-gray-500 text-[9px] md:text-xs">
          I'll get back to you within 24 hours!
        </p>
      </div>
    </div>
  );
};

export default DashboardSidebar;
