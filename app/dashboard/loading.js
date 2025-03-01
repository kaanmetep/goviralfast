import React from "react";
import { Rocket } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center gap-6 p-8 rounded-lg">
        {/* Logo Section */}
        <div className="flex items-center gap-1">
          <Rocket className="fill-yellow-200 size-5 sm:size-7 md:size-9 animate-bounce" />
          <h1 className="sm:text-lg md:text-xl font-semibold text-black">
            GoViralFast
          </h1>
        </div>

        {/* Loading Animation */}
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full bg-yellow-400"
              style={{
                animation: `pulse 1.5s infinite ease-in-out ${i * 0.2}s`,
              }}
            ></div>
          ))}
        </div>

        <p className="text-amber-700 font-medium text-sm md:text-base">
          Hang tight!
        </p>
      </div>
    </div>
  );
};

export default Loading;
