"use client";
import React, { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import VideoEditSettings from "./VideoEditSettings";

const VideoEditPage = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMetadataLoaded, setIsMetadataLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);
  const videoType = videoWidth > videoHeight ? "wideVideo" : "tallVideo";
  console.log(videoType);
  const [editSettings, setEditSettings] = useState({
    audioSource: "original",
    textOverlay: {
      text: "",
      position: "top",
      color: "#FFFFFF",
      fontSize: "48",
    },
  });
  const updateEditSettings = (path, value) => {
    setEditSettings((prev) => {
      const newSettings = { ...prev };
      if (path.includes(".")) {
        const [parent, child] = path.split(".");
        newSettings[parent] = {
          ...newSettings[parent],
          [child]: value,
        };
      } else {
        newSettings[path] = value;
      }
      return newSettings;
    });
  };

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

    const updateMetadata = () => {
      if (videoElement.videoWidth && videoElement.videoHeight) {
        setVideoWidth(videoElement.videoWidth);
        setVideoHeight(videoElement.videoHeight);
      }
    };

    videoElement.addEventListener("timeupdate", updateTime);
    videoElement.addEventListener("loadedmetadata", updateDuration);
    videoElement.addEventListener("durationchange", updateDuration);
    videoElement.addEventListener("canplay", updateDuration);
    videoElement.addEventListener("ended", handleVideoEnd);
    videoElement.addEventListener("loadedmetadata", updateMetadata);
    console.log(video.link);
    return () => {
      videoElement.removeEventListener("timeupdate", updateTime);
      videoElement.removeEventListener("loadedmetadata", updateDuration);
      videoElement.removeEventListener("durationchange", updateDuration);
      videoElement.removeEventListener("canplay", updateDuration);
      videoElement.removeEventListener("ended", handleVideoEnd);
      videoElement.removeEventListener("loadedmetadata", updateMetadata);
    };
  }, [video.id]);

  return (
    <div
      className={`bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-lg overflow-hidden w-fit flex ${
        videoType === "wideVideo" ? "flex-col" : "flex-col sm:flex-row sm:gap-1"
      }`}
    >
      {/* Video */}
      <div>
        <div
          className="relative group "
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative">
            <video
              id={`video-${video.id}`}
              className="rounded-t-lg cursor-pointer max-w-[600px] max-h-[600px] w-full h-auto"
              onClick={togglePlayPause}
            >
              <source src={video.link} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {editSettings.textOverlay.text && (
              <span
                className={`absolute text-white  ${
                  videoType === "wideVideo" ? "w-[450px]" : "w-[215px]"
                } break-words font-semibold text-center `}
                style={{
                  color: editSettings.textOverlay.color,
                  fontSize: `${editSettings.textOverlay.fontSize / 3.5}px`,
                  left: "50%",
                  transform: "translateX(-50%)",
                  ...(editSettings.textOverlay.position === "center"
                    ? {
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                      }
                    : {
                        [editSettings.textOverlay.position]: "20px",
                        transform: "translateX(-50%)",
                      }),
                }}
              >
                {editSettings.textOverlay.text}
              </span>
            )}
          </div>

          <button
            className="opacity-0 pointer-events-none absolute group-hover:opacity-100 group-hover:pointer-events-auto inset-0 flex items-center justify-center w-full h-full text-white bg-black bg-opacity-40 transition-all delay-[50ms]"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="w-12 h-12" />
            ) : (
              <Play className="w-12 h-12" />
            )}
          </button>

          <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
            {formatTime(currentTime)} /{" "}
            {isMetadataLoaded ? formatTime(duration) : "00:00"}
          </div>
        </div>

        <div className="p-4 border-t border-amber-200">
          <h3 className="font-semibold text-amber-900 truncate">
            {video.title || "Untitled Video"}
          </h3>
          {video.description && (
            <p className="mt-1 text-sm text-amber-700 line-clamp-2">
              {video.description}
            </p>
          )}
        </div>
      </div>

      {/* Edit Section */}
      <VideoEditSettings
        editSettings={editSettings}
        updateEditSettings={updateEditSettings}
        link={video.link}
        videoType={videoType}
      />
    </div>
  );
};

export default VideoEditPage;
