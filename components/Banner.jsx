"use client";
import React, { useState, useEffect, useRef } from "react";
import { Eye } from "lucide-react";
import Confetti from "react-confetti";

const Banner = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
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
        // 0 - 999.990
        const progressRatio = progress / fastDuration;
        const easeOutQuad = (t) => t * (2 - t);
        const currentCount = Math.floor(
          easeOutQuad(progressRatio) * endValueFast
        );
        setCount(currentCount);
        animationFrame = requestAnimationFrame(updateCount);
      } else if (progress < fastDuration + slowDuration) {
        // 999.990 - 1.000.000
        const slowProgress = (progress - fastDuration) / slowDuration;
        const easeOutQuad = (t) => t * (2 - t);
        const currentCount = Math.floor(
          endValueFast +
            easeOutQuad(slowProgress) * (endValueSlow - endValueFast)
        );
        setCount(currentCount);
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(endValueSlow);

        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
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

  return (
    <div
      ref={bannerRef}
      className="flex justify-center items-center bg-gradient-to-r from-white to-yellow-50 py-12 px-6 rounded-lg shadow-lg my-12 max-w-[1500px] mx-auto"
    >
      <div className="text-center">
        <h2 className="text-center text-gray-400 font-semibold text-lg xs:text-xl sm:text-2xl md:text-3xl w-full sm:w-4/5 md:w-2/3 lg:w-1/2 mx-auto">
          Now is your time to grow with the latest viral trends and{" "}
          <span className="text-gray-950 font-bold">
            get millions of views.
          </span>
        </h2>

        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="text-2xl md:text-3xl font-bold text-gray-950">
            {count.toLocaleString()}
          </span>
          <Eye />
        </div>
      </div>

      {showConfetti && (
        <>
          {showConfetti && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 9999,
              }}
            >
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                numberOfPieces={500}
                gravity={0.2}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Banner;
