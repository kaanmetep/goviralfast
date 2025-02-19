"use client";
import { useEffect, useState } from "react";

const ProgressBar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollProgress =
        (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollPercentage(scrollProgress);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-[5px] bg-gray-200 z-50  transition-all  delay-100 ${
        scrollPercentage < 3
          ? "opacity-0 pointer-events-none"
          : "opacity-100 pointer-events-auto"
      }`}
    >
      <div
        className="h-full bg-yellow-300 transition-all duration-100"
        style={{ width: `${scrollPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
