"use client";
import Masonry from "react-masonry-css";
import ViralVideo from "./ViralVideo";
import { useState } from "react";
const DashboardMain = () => {
  const [sortOption, setSortOption] = useState("recentlyadded");
  const videoList = [
    {
      id: 1,
      src: "https://res.cloudinary.com/dq7xjrnjd/video/upload/v1738965714/0.0-7.0_vx5atj.mp4",
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/dq7xjrnjd/video/upload/v1738965699/chineese_fco2uy.mp4",
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/dq7xjrnjd/video/upload/v1739062054/lockedinalien_yy38yl.mp4",
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/dq7xjrnjd/video/upload/v1738965714/0.0-7.0_vx5atj.mp4",
    },
    {
      id: 5,
      src: "https://res.cloudinary.com/dq7xjrnjd/video/upload/v1739062054/lockedinalien_yy38yl.mp4",
    },
    {
      id: 6,
      src: "https://res.cloudinary.com/dq7xjrnjd/video/upload/v1738965699/chineese_fco2uy.mp4",
    },
  ];

  // Responsive sütun ayarları
  const breakpointColumns = {
    default: 5, // Başlangıçta 4 sütun
    1400: 4,
    1100: 3, // 1100px altında 3 sütun
    840: 2, // 768px altında 2 sütun
    480: 1, // 480px altında 1 sütun
  };

  return (
    <div className="w-full bg-white shadow-lg pt-2 mr-2  px-2 rounded-md ">
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
      <div className="w-fit">
        {/* Masonry bileşeni */}
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex gap-6"
          columnClassName="masonry-column"
        >
          {videoList.map((video) => (
            <div key={video.id} className="mb-4  rounded-lg overflow-hidden">
              <ViralVideo video={video} />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default DashboardMain;
