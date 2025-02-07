import Button from "./Button";
import { Flame } from "lucide-react";
const HeroSection = () => {
  return (
    <div className="mt-32 flex justify-center">
      <div className="max-w-[600px]">
        <div className="mb-2 flex items-center bg-gray-100 w-fit mx-auto px-3 rounded-lg py-[2px] text-gray-700 gap-1">
          <Flame className="size-4 md:size-6" />
          <p className="text-center text-[9px] md:text-xs ">
            Viral videos get up to{" "}
            <span className="font-bold animate-pulse text-xs md:text-sm">
              ~150%
            </span>{" "}
            more engagement than regular content.
          </p>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold leading-[1.2] ">
          Create and Share viral videos in minutes,{" "}
          <span className="bg-gray-200 text-gray-900 font-bold px-2 py-1 inline-block rotate-[-2deg]">
            not hours
          </span>
        </h2>
        <p className="text-center mt-8 leading-[1.7] text-gray-800 text-xs md:text-base ">
          GoViralFast helps you create custom videos that{" "}
          <span className="bg-yellow-200  px-2 font-semibold text-gray-950 rounded-md">
            track the latest trends,
          </span>{" "}
          just like the trending videos you see every day on TikTok and
          Instagram.{" "}
          <span className="bg-yellow-200  px-2 font-semibold text-gray-950 rounded-md">
            With just one click, share your videos directly
          </span>{" "}
          on Instagram, TikTok, and other platforms. Give it a try{" "}
          <span className="text-black font-semibold">for free!</span>
        </p>
        <div className="flex justify-center mt-10">
          <Button>Create Viral Videos</Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
