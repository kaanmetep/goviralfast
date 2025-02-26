"use client";
import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Edit } from "lucide-react";
import Link from "next/link";
import { formatTime } from "@/utils/helpers";

const ViralVideo = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMetadataLoaded, setIsMetadataLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);

  // Check if device is mobile on initial load only
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
  }, []);

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const updateTime = () => {
      setCurrentTime(videoElement.currentTime);
    };

    const updateDuration = () => {
      if (!isNaN(videoElement.duration) && videoElement.duration !== Infinity) {
        setDuration(videoElement.duration);
        setIsMetadataLoaded(true);
      }
    };

    const handleVideoEnd = () => {
      setIsPlaying(false);
    };

    videoElement.addEventListener("timeupdate", updateTime);
    videoElement.addEventListener("loadedmetadata", updateDuration);
    videoElement.addEventListener("loadeddata", updateDuration);
    videoElement.addEventListener("durationchange", updateDuration);
    videoElement.addEventListener("canplay", updateDuration);
    videoElement.addEventListener("ended", handleVideoEnd);

    if (videoElement.readyState >= 2) {
      updateDuration();
    }

    return () => {
      videoElement.removeEventListener("timeupdate", updateTime);
      videoElement.removeEventListener("loadedmetadata", updateDuration);
      videoElement.removeEventListener("loadeddata", updateDuration);
      videoElement.removeEventListener("durationchange", updateDuration);
      videoElement.removeEventListener("canplay", updateDuration);
      videoElement.removeEventListener("ended", handleVideoEnd);
    };
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-lg overflow-hidden">
        <div className="relative group hover:scale-[1.02] transition-all delay-[50ms]">
          {/* Edit Icon */}
          <Link
            href={`/dashboard/videos/${video.id}`}
            className="absolute top-4 left-3 z-10 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all group/edit "
          >
            <Edit className="w-5 h-5 text-white" />
            <span className="absolute top-0 left-10 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-md rounded-bl-none opacity-0 group-hover/edit:opacity-100 transition-opacity whitespace-nowrap">
              Click to Edit!
            </span>
          </Link>

          {/* Video with conditional poster */}
          <video
            ref={videoRef}
            id={`video-${video.id}`}
            className="w-full h-auto rounded-t-lg cursor-pointer object-cover"
            onClick={togglePlayPause}
            playsInline
            preload="metadata"
            {...(isMobile ? { poster: video.poster } : {})}
          >
            <source src={video.link} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Play/Pause Button */}
          <button
            className="opacity-0 pointer-events-none absolute group-hover:opacity-100 group-hover:pointer-events-auto inset-0 flex items-center justify-center w-full h-full text-white bg-black bg-opacity-40 transition-all delay-[50ms]"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <Pause className="w-12 h-12" />
            ) : (
              <Play className="w-12 h-12" />
            )}
          </button>

          {/* Time Indicator */}
          <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
            {formatTime(currentTime)} /{" "}
            {isMetadataLoaded ? formatTime(duration) : "00:00"}
          </div>
        </div>

        {/* Video Info Section */}
        <div className="p-4 border-t border-amber-200">
          <h3 className="font-semibold text-amber-900 truncate">
            {video.title || "Untitled Video"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ViralVideo;
