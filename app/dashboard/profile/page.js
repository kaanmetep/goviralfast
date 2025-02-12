import React from "react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { auth } from "@/auth";
const ProfilePage = async () => {
  const session = await auth();

  const userProfile = {
    name: session.user.name,
    planType: "Monthly Plan",
    email: session.user.email,
    profileImage: session.user.image,
    subscriptionDaysLeft: 18,
    stats: {
      totalVideos: 24,
    },
    connectedPlatforms: {
      instagram: true,
      tiktok: false,
      youtube: true,
    },
  };

  return (
    <div className="pt-2 mr-2 bg-white shadow-lg px-6 w-full rounded-md min-h-screen ">
      {/* Profile Header Section */}
      <div className="flex items-center justify-between py-6 border-b">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={userProfile.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-900">
                {userProfile.name}
              </h1>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                {userProfile.planType}
              </span>
            </div>
            <p className="text-gray-500 mt-1">{userProfile.email}</p>
            {userProfile.planType === "Monthly Plan" && (
              <div className="mt-2 flex items-center gap-2">
                <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{
                      width: `${
                        (userProfile.subscriptionDaysLeft / 30) * 100
                      }%`,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600">
                  {userProfile.subscriptionDaysLeft} days left
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Connected Platforms */}
      <div className="py-6 ">
        <h2 className="text-lg font-semibold mb-4">Connected Platforms</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FaInstagram className="w-6 h-6 text-pink-600" />
              <span className="font-medium">Instagram</span>
            </div>
            <span className="text-green-600 text-sm">3 Accounts Connected</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FaYoutube className="w-6 h-6 text-red-600" />
              <span className="font-medium">YouTube</span>
            </div>
            <span className="text-green-600 text-sm">2 Accounts Connected</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FaTiktok className="w-6 h-6 text-gray-600" />
              <span className="font-medium">TikTok</span>
            </div>
            <span className="text-gray-500 text-sm">Not Connected</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Link href={"/dashboard/accounts"}>
          <p className="text-center text-gray-600 text-sm border-b w-fit border-black hover:text-gray-400 transition-colors delay-[50ms] cursor-pointer">
            See which accounts are currently connected
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
