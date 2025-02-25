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
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    try {
      if (videoRef.current.paused) {
        const playPromise = videoRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Video oynatma hatası:", error);
              // Mobil cihazlarda otomatik oynatma kısıtlaması olabilir
              setIsPlaying(false);
            });
        }
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Video kontrolü hatası:", error);
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

  const isMobile = () => {
    if (typeof window !== "undefined") {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    }
    return false;
  };

  return (
    <div>
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-lg overflow-hidden">
        <div className="relative group">
          <Link
            href={`/dashboard/videos/${video.id}`}
            className="absolute top-4 left-3 z-10 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all group/edit"
            aria-label="Edit video"
          >
            <Edit className="w-5 h-5 text-white" />
            <span className="absolute top-0 left-10 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-md rounded-bl-none opacity-0 group-hover/edit:opacity-100 transition-opacity whitespace-nowrap">
              Click to Edit!
            </span>
          </Link>

          <div className="w-full">
            <video
              ref={videoRef}
              className="w-full rounded-t-lg cursor-pointer"
              onClick={togglePlayPause}
              playsInline
              preload="metadata"
              poster={video.thumbnail || ""}
              controls={isMobile()}
            >
              <source src={video.link} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {!isMobile() && (
            <button
              className="absolute inset-0 flex items-center justify-center w-full h-full text-white bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <Pause className="w-12 h-12" />
              ) : (
                <Play className="w-12 h-12" />
              )}
            </button>
          )}

          {!isMobile() && (
            <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
              {formatTime(currentTime)} /{" "}
              {isMetadataLoaded ? formatTime(duration) : "00:00"}
            </div>
          )}
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
