"use client";
import React, { useState, useEffect } from "react";
import { Play, Pause, Edit } from "lucide-react";
import Link from "next/link";

const ViralVideo = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMetadataLoaded, setIsMetadataLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlayPause = () => {
    const videoElement = document.getElementById(`video-${video.id}`);
    if (videoElement.paused) {
      videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    const videoElement = document.getElementById(`video-${video.id}`);
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
    videoElement.addEventListener("durationchange", updateDuration);
    videoElement.addEventListener("canplay", updateDuration);
    videoElement.addEventListener("ended", handleVideoEnd);

    return () => {
      videoElement.removeEventListener("timeupdate", updateTime);
      videoElement.removeEventListener("loadedmetadata", updateDuration);
      videoElement.removeEventListener("durationchange", updateDuration);
      videoElement.removeEventListener("canplay", updateDuration);
      videoElement.removeEventListener("ended", handleVideoEnd);
    };
  }, [video.id]);

  return (
    <div>
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-lg overflow-hidden">
        <div
          className="relative group hover:scale-105 transition-all delay-[50ms]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
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

          {/* Video */}
          <video
            id={`video-${video.id}`}
            className="w-full max-w-[230px] rounded-t-lg cursor-pointer "
            onClick={togglePlayPause}
          >
            <source src={video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Play/Pause Button */}
          <button
            className="opacity-0 pointer-events-none  absolute group-hover:opacity-100 group-hover:pointer-events-auto inset-0 flex items-center justify-center w-full h-full text-white bg-black bg-opacity-40 transition-all delay-[50ms]"
            onClick={togglePlayPause}
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
          <h3 className="text-lg font-semibold text-amber-900 truncate">
            {video.title || "Untitled Video"}
          </h3>
          {video.description && (
            <p className="mt-1 text-sm text-amber-700 line-clamp-2">
              {video.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViralVideo;
