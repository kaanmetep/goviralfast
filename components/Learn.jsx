import { Video, Type, Hash, Share2 } from "lucide-react";

const Learn = () => {
  return (
    <div
      className="mt-20 relative w-[90%] lg:w-[75%] mx-auto text-sm lg:text-base"
      id="learn"
    >
      <div className="flex justify-center">
        <h2 className="relative text-center mb-12 text-3xl  md:text-4xl w-fit z-10 font-semibold">
          How does it work?
          <span className="absolute h-[14px] w-full bg-yellow-300/80 bottom-1 left-0 z-[-1] rounded-md"></span>
        </h2>
      </div>

      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs md:text-base">
        {/* 1.*/}
        <li className="learn-item">
          <p className="learn-number ">1</p>
          <div className="flex items-center gap-3">
            <Video className="text-yellow-500 w-8 h-8" />
            <p className="learn-text">Pick a trending video</p>
          </div>
          <p className="text-gray-600 mt-2">
            Find a video that's already getting attention. The trendier, the
            better!
          </p>
        </li>

        {/* 2. */}
        <li className="learn-item ">
          <p className="learn-number">2</p>
          <div className="flex items-center gap-3">
            <Type className="text-blue-500 w-8 h-8" />
            <p className="learn-text">Add your own caption</p>
          </div>
          <p className="text-gray-600 mt-2">
            Make it catchy, make it yours! A good caption makes all the
            difference.
          </p>
        </li>

        {/* 3.*/}
        <li className="learn-item ">
          <p className="learn-number text-green-500 font-bold text-xl">3</p>
          <div className="flex items-center gap-3">
            <Hash className="text-green-500 w-8 h-8" />
            <p className="learn-text">Choose the best hashtags</p>
          </div>
          <p className="text-gray-600 mt-2">
            Hashtags help people find your content. Pick the right ones and
            boost your reach!
          </p>
        </li>

        {/* 4. */}
        <li className="learn-item">
          <p className="learn-number text-red-500 ">4</p>
          <div className="flex items-center gap-3">
            <Share2 className="text-red-500 w-8 h-8" />
            <p className="learn-text">Share it with one click</p>
          </div>
          <p className="text-gray-600 mt-2">
            You're ready! Post it on your favorite platforms and let the magic
            happen.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Learn;
