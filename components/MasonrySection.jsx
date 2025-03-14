"use client";
import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";
import { motion } from "framer-motion";

const photos = [
  { id: 1, src: "/masonary1.jpeg" },
  { id: 2, src: "/masonary2.jpeg" },
  { id: 3, src: "/masonary3.jpeg" },
  { id: 4, src: "/masonary4.jpeg" },
  { id: 5, src: "/masonary6.jpeg" },
  { id: 6, src: "/masonary7.jpeg" },
  { id: 7, src: "/masonary8.jpeg" },
  { id: 8, src: "/masonary9.jpeg" },
  { id: 9, src: "/masonary10.jpeg" },
  { id: 10, src: "/masonary11.jpeg" },
  { id: 11, src: "/masonary12.jpeg" },
  { id: 12, src: "/masonary13.jpeg" },
];

const MasonrySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const breakpointColumns = {
    default: 5,
    1280: 5,
    1100: 5,
    768: 3,
    480: 3,
  };

  const handleImageClick = (id) => {
    setSelectedImage(selectedImage === id ? null : id);
  };

  return (
    <section className="mt-20" aria-label="Viral Content Gallery">
      <div className="flex flex-col items-center max-w-3xl mx-auto px-4">
        <h2 className="text-center mb-3 font-semibold">
          <span className="text-gray-600 text-lg md:text-xl">
            You don't need thousands of followers, high-quality videos, or
            brand-new ideas to get millions of views
          </span>
          <span className="block mt-1 text-2xl md:text-3xl text-black">
            All you need is the{" "}
            <span className="font-bold">right content!</span>
          </span>
        </h2>
      </div>

      <div className="w-[90%] lg:w-[80%] mx-auto mt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex w-full gap-4"
            columnClassName="masonry-column space-y-4 pl-0"
          >
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                className="relative group overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                layout
              >
                <div className="relative aspect-auto">
                  <Image
                    src={photo.src}
                    width={500}
                    height={350}
                    alt="Trending social media post example"
                    className="w-full h-auto object-cover transition-all duration-500 group-hover:brightness-90"
                    priority={photo.id <= 4}
                    loading={photo.id <= 4 ? "eager" : "lazy"}
                    onClick={() => handleImageClick(photo.id)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>

                {selectedImage === photo.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(null);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </Masonry>
        </motion.div>
      </div>
    </section>
  );
};

export default MasonrySection;
