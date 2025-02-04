import { Check } from "lucide-react";
import Button from "./Button";
const plans = {
  Free: [
    "3 Viral Video Creation",
    "One-Click Editing & Sharing",
    "Share to 3 Platforms",
    "Up to 3 Connected Social Accounts",
  ],
  Monthly: [
    "+15 Viral Videos Creation",
    "One-Click Editing & Sharing",
    "Share to 3 Platforms",
    "Up to 10 Connected Social Accounts",
    "Dedicated Hashtags for Each Video",
    "New Videos Delivered Continuously",
  ],
};

const PriceCard = ({ type, oldPrice = "", currentPrice }) => {
  return (
    <div
      className={`flex flex-col flex-1 relative p-4  shadow-lg rounded-md overflow-hidden ${
        type === "Free"
          ? "shadow-sm bg-gray-100"
          : "shadow-2xl border-2 border-yellow-50 bg-white"
      }`}
    >
      {type === "Monthly" && (
        <span className="absolute -right-[34px] top-[24px] rotate-45 bg-yellow-400 px-8 py-1 text-sm">
          <b className="font-extrabold">5$</b> Discount
        </span>
      )}
      <h3 className="mb-2 text-sm text-gray-600">{type} Plan</h3>
      <div>
        <p className="text-4xl font-semibold">
          {oldPrice && (
            <span className="text-lg line-through mr-1 font-normal">
              {oldPrice}$
            </span>
          )}
          {currentPrice}$<span className="text-sm"> /month</span>
        </p>
        <ul
          className={`mt-10 flex flex-col gap-6 mb-14 ${
            type === "Free" ? "text-gray-600" : "text-black"
          }`}
        >
          {plans[type]?.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check />
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto mx-auto">
        <Button>Create Viral Videos</Button>
      </div>
    </div>
  );
};

export default PriceCard;
