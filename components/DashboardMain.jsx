"use client";
import Masonry from "react-masonry-css";
import ViralVideo from "./ViralVideo";
import { useState } from "react";

const DashboardMain = ({ videos }) => {
  const [sortOption, setSortOption] = useState("recentlyadded");
  const breakpointColumns = {
    default: 3, // Başlangıçta 3 sütun
    1280: 3,
    1100: 2, // 1100px altında 2 sütun
    // 840: 2,
    480: 1,
  };

  return (
    <div className="w-full bg-white shadow-lg pt-2 mr-2  px-2 rounded-md min-h-screen ">
      <div className="flex gap-6 items-center mb-8 mt-2 ml-1">
        <p className="text-gray-600 text-sm">Filter</p>
        <ul className="flex items-center gap-4">
          {["Most Popular", "Recently Added"].map((option) => (
            <li
              key={option}
              className={`${
                sortOption === option.toLowerCase().replace(/\s/g, "")
                  ? "bg-gray-200 "
                  : "hover:bg-gray-100 transition-all delay-[50ms]  "
              } font-medium text-black cursor-pointer px-4 py-1 rounded-md `}
              onClick={() =>
                setSortOption(option.toLowerCase().replace(/\s/g, ""))
              }
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-fit px-4 sm:px-2">
        {/* Masonry bileşeni */}
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex gap-6"
          columnClassName="masonry-column"
        >
          {videos
            .slice()
            .sort((a, b) =>
              sortOption === "mostpopular"
                ? b.popularity - a.popularity
                : b.id - a.id
            )
            .map((video) => (
              <div key={video.id} className="mb-4 rounded-lg overflow-hidden">
                <ViralVideo video={video} />
              </div>
            ))}
        </Masonry>
      </div>
    </div>
  );
};

export default DashboardMain;
