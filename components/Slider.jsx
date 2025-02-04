"use client";

import Image from "next/image";
import React from "react";

const images = [
  "/image1.jpg",
  "/image2.png",
  "/image3.png",
  "/image4.png",
  "/image5.png",
  "/image6.png",
];

export default function Slider() {
  return (
    <div className="overflow-hidden relative w-[400px] sm:w-[500px] md:w-[700px] lg:w-[1000px] flex items-center mt-14 ">
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-yellow-50 to-transparent z-10"></div>

      <div
        className="flex animate-slide"
        style={{ width: `${300 * images.length * 2}px` }}
      >
        {[...images, ...images].map((src, index) => (
          <div
            key={index}
            className="relative w-[130px] h-[130px] md:w-[230px] md:h-[180px] "
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className="rounded-xl object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-yellow-50 to-transparent z-10"></div>
    </div>
  );
}
