"use client";
import Masonry from "react-masonry-css";
import ViralVideo from "./ViralVideo";
import { useState } from "react";
import { monthlyPlan } from "@/stripeinfo";

const DashboardMain = ({ videos, isUserPremium, userEmail }) => {
  const [sortOption, setSortOption] = useState("mostpopular");
  const breakpointColumns = {
    default: 5,
    1750: 4,
    1550: 3,
    1150: 2,
    780: 1,
  };

  const handleButtonClick = () => {
    const paymentUrl = new URL(monthlyPlan.link);
    paymentUrl.searchParams.append("prefilled_email", userEmail);
    window.open(paymentUrl.toString(), "_blank");
  };

  return (
    <div className="w-full bg-white shadow-lg pt-2 px-2 rounded-md min-h-screen overflow-x-hidden">
      <div className="flex flex-wrap gap-6 items-center mb-8 mt-2 ml-1">
        <p className="text-gray-600 text-sm">Filter</p>
        <ul className="flex flex-wrap items-center gap-4">
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

      {/* Custom CSS to fix masonry layout */}
      <style jsx global>{`
        .my-masonry-grid {
          display: flex;
          width: 100%;
          margin-left: 0;
          box-sizing: border-box;
        }
        .my-masonry-grid_column {
          padding-right: 16px;
          background-clip: padding-box;
          box-sizing: border-box;
        }
      `}</style>

      <div className="w-full" style={{ overflowX: "hidden", maxWidth: "100%" }}>
        <Masonry
          breakpointCols={breakpointColumns}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
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

        {!isUserPremium && (
          <div className="flex flex-col items-center gap-1">
            <p className="text-center mt-2 text-gray-600">
              You're currently on free plan.
            </p>
            <p
              className="underline cursor-pointer animate-bounce hover:no-underline transition-all delay-[50ms] mb-6"
              onClick={handleButtonClick}
            >
              Get Monthly Plan To See All Viral Videos!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardMain;
