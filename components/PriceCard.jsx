import { Check, Star } from "lucide-react";
import Button from "./Button";
const plans = {
  Free: [
    { info: "3 Viral Video Creation", active: true },
    { info: "One-Click Editing", active: true },
    { info: "Download Immediately with one-click", active: true },
    { info: "Share to 3 Platforms with one-click", active: false },
    { info: "Up to 3 Connected Social Accounts", active: false },
  ],
  Monthly: [
    { info: "+15 Viral Videos Creation", active: true },
    { info: "One-Click Editing", active: true },
    { info: "Download Immediately with one-click", active: true },
    { info: "New Videos Delivered Continuously", active: true },
    { info: "Share to 3 Platforms with one-click", active: false },
    { info: "Up to 10 Connected Social Accounts", active: false },
    { info: "Dedicated Hashtags for Each Video", active: false },
  ],
};

const PriceCard = ({
  type,
  oldPrice = "",
  currentPrice,
  description = "",
  recommended = false,
}) => {
  return (
    <div
      className={`flex relative rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-1 ${
        recommended
          ? "bg-white border-2 border-yellow-400 shadow-xl"
          : "bg-white border border-gray-200 shadow-md"
      }`}
    >
      {recommended && (
        <div className="absolute top-0 right-0 left-0 bg-yellow-400 py-1 text-center text-sm font-bold">
          RECOMMENDED
        </div>
      )}

      <div className="flex flex-col p-8 pt-12 relative">
        <div className=" h-[160px]">
          <div className="flex justify-between items-start mb-4 ">
            <div>
              <h3 className="text-lg font-medium text-gray-500">{type} Plan</h3>
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            </div>
            {recommended && (
              <Star
                className="absolute -right-5 top-9 text-yellow-400 fill-yellow-400"
                size={24}
              />
            )}
          </div>

          <div className="mb-8">
            <div className="flex items-end">
              <span className="text-5xl font-bold">${currentPrice}</span>
              <span className="text-gray-500 ml-2 mb-1">/month</span>
            </div>
            {oldPrice && (
              <p className="text-sm text-gray-500 mt-1">
                <span className="line-through">${oldPrice}/month</span>
                <span className="ml-2 text-green-500 font-medium">
                  {Math.round(((oldPrice - currentPrice) / oldPrice) * 100)}%
                  off
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 pb-8">
          <h4 className="font-medium mb-4">What's included:</h4>
          <ul className="space-y-4">
            {plans[type]?.map((item, index) => (
              <li key={index} className="flex">
                <span
                  className={`mr-3 mt-1 flex-shrink-0 ${
                    item.active ? "text-green-500" : "text-gray-300"
                  }`}
                >
                  <Check
                    size={18}
                    className={item.active ? "text-green-500" : "text-gray-300"}
                  />
                </span>
                <span
                  className={`${
                    item.active ? "text-gray-700" : "text-gray-400"
                  } relative`}
                >
                  {item.info}
                  {!item.active && <span className="pl-1 ">*</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto mx-auto ">
          <Button>Create Viral Videos</Button>
        </div>
        <p className="text-gray-400 text-xs mt-6 text-center">
          * : These features are not active, but will be active very soon!
        </p>
      </div>
    </div>
  );
};

export default PriceCard;
