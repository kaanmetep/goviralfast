import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { auth } from "@/auth";
import { X } from "lucide-react";
const SOCIAL_ACCOUNTS = [
  {
    id: 1,
    name: "Instagram",
    icon: FaInstagram,
    iconColor: "text-pink-600",
    buttonText: "Connect Instagram",
  },
  {
    id: 2,
    name: "TikTok",
    icon: FaTiktok,
    iconColor: "",
    buttonText: "Connect TikTok",
  },
  {
    id: 3,
    name: "Youtube",
    icon: FaYoutube,
    iconColor: "text-red-600",
    buttonText: "Connect Youtube",
  },
];

const Page = async () => {
  const session = await auth();
  return (
    <div className="py-6 px-4 mr-2 bg-white shadow-lg w-full rounded-md min-h-screen">
      {/* Header Section */}
      <h2 className="text-2xl font-semibold">Connected Accounts</h2>
      <p className="text-gray-600 mt-2">
        Manage your social media connections and permissions
      </p>

      {/* Accounts List */}
      <ul className="flex flex-col gap-8 w-full my-12">
        {SOCIAL_ACCOUNTS.map((account) => {
          const Icon = account.icon;
          return (
            <li
              key={account.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 w-full"
            >
              <div className="flex gap-4 w-full sm:w-auto">
                <Icon size={38} className={account.iconColor} />
                <div className="flex-1">
                  <button className="bg-zinc-600 hover:bg-zinc-700 transition-colors text-white px-8 py-2 rounded-md font-medium w-[240px]">
                    {account.buttonText}
                  </button>
                  {session?.user?.userData[
                    account?.name?.toLowerCase() + "_connected_accounts"
                  ].length === 0 && (
                    <p className="text-sm text-gray-500 mt-1">Not connected</p>
                  )}
                </div>
              </div>
              <ul className="flex gap-2">
                {session?.user?.userData?.[
                  account?.name?.toLowerCase() + "_connected_accounts"
                ].map((account, i) => (
                  <li
                    key={i}
                    className="bg-gray-100 px-2 py-1 rounded-md flex gap-1 items-center relative"
                  >
                    <Icon size={16} className={account.iconColor} />
                    <span> {account}</span>
                    <X
                      size={12}
                      className="absolute -top-1 -right-1 bg-gray-300 rounded-full  flex items-center justify-center cursor-pointer w-3 h-3 p-0.5"
                    />
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>

      {/* Summary Section */}
      <div className="mt-8 pt-6 border-t">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h3 className="text-lg font-medium">Account Summary</h3>
            <p className="text-gray-600 text-sm">0 of 15 accounts connected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
