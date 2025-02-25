import { Check } from "lucide-react";
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

const PriceCard = ({ type, oldPrice = "", currentPrice }) => {
  return (
    <div
      className={`text-sm md:text-base flex flex-col flex-1 relative p-4  shadow-lg rounded-md overflow-hidden ${
        type === "Free"
          ? "shadow-sm bg-gray-100"
          : "shadow-2xl border-2 border-yellow-50 bg-white"
      }`}
    >
      {type === "Monthly" && (
        <span className="absolute -right-[34px] top-[24px] rotate-45 bg-yellow-400 px-8 py-1 text-sm">
          <b className="font-extrabold">${oldPrice - currentPrice}</b> Discount
        </span>
      )}
      <h3 className="mb-2 text-sm text-gray-600">{type} Plan</h3>
      <div>
        <p className="text-2xl md:text-4xl font-semibold">
          {oldPrice && (
            <span className="text-base md:text-lg line-through mr-1 font-normal">
              ${oldPrice}
            </span>
          )}
          ${currentPrice}
          <span className="text-sm"> /month</span>
        </p>
        <ul
          className={`mt-10 flex flex-col gap-6 mb-14 ${
            type === "Free" ? "text-gray-600" : "text-black"
          }`}
        >
          {plans[type]?.map((item) => (
            <li key={item.info} className="relative flex items-center gap-2">
              <Check />

              <p className={`${!item.active && "text-gray-400"}`}>
                {item.info}
                {!item.active && (
                  <span className="absolute text-white px-1 text-[10px] md:text-xs bg-black rounded-md  -top-3 md:-top-2 tracking-widest font-semibold">
                    soon!
                  </span>
                )}
              </p>
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
