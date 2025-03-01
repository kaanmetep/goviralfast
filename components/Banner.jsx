"use client";
import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
const Banner = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const bannerRef = useRef(null);
  const [bannerSize, setBannerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
      const { width, height } = bannerRef.current.getBoundingClientRect();
      setBannerSize({ width, height });
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    let animationFrame;
    let startTime;
    const fastDuration = 6000;
    const slowDuration = 2000;
    const endValueFast = 999990;
    const endValueSlow = 1000000;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < fastDuration) {
        const progressRatio = progress / fastDuration;
        // Using a different easing function for more dramatic effect
        const easeOutBack = (t) => {
          const c1 = 1.70158;
          const c3 = c1 + 1;
          return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
        };
        const currentCount = Math.floor(progressRatio * endValueFast);
        setCount(currentCount);
        animationFrame = requestAnimationFrame(updateCount);
      } else if (progress < fastDuration + slowDuration) {
        const slowProgress = (progress - fastDuration) / slowDuration;
        // Dramatic slowdown for the final push to 1M
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
        const currentCount = Math.floor(
          endValueFast +
            easeOutCubic(slowProgress) * (endValueSlow - endValueFast)
        );
        setCount(currentCount);
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(endValueSlow);
        setShowConfetti(true);
        setAnimationComplete(true);
        setTimeout(() => setShowConfetti(false), 7000);
      }
    };

    if (isVisible) {
      animationFrame = requestAnimationFrame(updateCount);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible]);

  // Format the number with commas and highlight the last 3 digits
  const formatNumber = (num) => {
    const numStr = num.toLocaleString();
    if (animationComplete) {
      const parts = numStr.split(",");
      if (parts.length > 1) {
        return (
          <>
            {parts.slice(0, -1).join(",")}
            <span className="text-yellow-500 font-extrabold">
              ,{parts[parts.length - 1]}
            </span>
          </>
        );
      }
    }
    return numStr;
  };

  return (
    <div
      ref={bannerRef}
      className="relative overflow-hidden bg-gradient-to-br from-white via-yellow-50 to-white py-16 px-8 rounded-2xl shadow-lg mt-20  mx-auto border border-yellow-100 "
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h2 className="text-center font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl w-full mx-auto text-gray-800 mb-6">
          Now is your time to <span className="text-yellow-500">grow</span> with
          the latest viral trends and{" "}
          <span className="relative inline-block">
            <span className="relative z-10">get millions of views.</span>
            <span className="absolute bottom-2 left-0 h-3 w-full bg-yellow-300 -z-10 rounded-md transform -rotate-1"></span>
          </span>
        </h2>

        <div className="mt-10 mb-8 flex flex-col items-center justify-center">
          <div className="bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl border border-yellow-200 shadow-xl transform transition-all duration-300 hover:scale-105 w-[300px]">
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl md:text-5xl font-black bg-gradient-to-r from-gray-800 to-yellow-600 bg-clip-text text-transparent">
                {formatNumber(count)}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-2">Total Views</p>
          </div>
        </div>
      </div>

      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          <Confetti
            width={bannerSize.width}
            height={bannerSize.height}
            recycle={false}
            numberOfPieces={700}
            gravity={0.15}
            colors={["#EAB308", "#FBBF24", "#F59E0B", "#FEF3C7", "#FFFFFF"]}
            confettiSource={{
              x: bannerSize.width / 2,
              y: bannerSize.height / 3,
              w: 0,
              h: 0,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Banner;
