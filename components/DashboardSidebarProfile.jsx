import Link from "next/link";
import { signOutAction } from "@/actions";
import { auth } from "@/auth";
const DashboardSidebarProfile = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-end  justify-between ">
      <Link href={"/dashboard/profile"} className="w-fit">
        <div className=" flex items-center gap-2 cursor-pointer ">
          <img
            src={session.user?.image || "/smileface.jpg"}
            alt="user profil photo"
            referrerPolicy="no-referrer"
            className="size-8"
          />

          <div>
            <p>{session.user.userData.full_name}</p>
            <p className="text-xs text-gray-600">
              {session.user.userData.is_premium ? "Monthly Plan" : "Free plan"}
            </p>
          </div>
        </div>
      </Link>
      <form action={signOutAction}>
        <button className=" text-gray-600 px-3 md:px-3  text-xs md:text-sm bg-gray-100 rounded-md py-[3px]">
          Logout
        </button>
      </form>
    </div>
  );
};

export default DashboardSidebarProfile;
