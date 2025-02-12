"use client";
import React, { useState, useEffect } from "react";
import { Play, Pause, Edit } from "lucide-react";

const VideoEditPage = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMetadataLoaded, setIsMetadataLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);
  const [audioSource, setAudioSource] = useState("original");
  const [textOverlay, setTextOverlay] = useState("");
  const [textPosition, setTextPosition] = useState("center");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [fontSize, setFontSize] = useState("24");
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
        videoWidth > videoHeight ? "flex-col" : "flex-col sm:flex-row sm:gap-1"
      }  `}
    >
      {/* Video */}
      <div>
        <div
          className="relative group hover:scale-105 transition-all delay-[50ms]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Video */}
          <video
            id={`video-${video.id}`}
            className="rounded-t-lg cursor-pointer max-w-[600px] max-h-[600px] w-full h-auto"
            onClick={togglePlayPause}
          >
            <source src={video.link} type="video/mp4" />
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
          <h3 className=" font-semibold text-amber-900 truncate">
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
      <div className="p-4 border-t border-amber-200 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-amber-900 flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Edit Audio
          </h4>
        </div>

        <div className="space-y-4">
          {/* Audio Source Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-amber-700">
              Audio Source
            </label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="audioSource"
                  value="original"
                  checked={audioSource === "original"}
                  onChange={(e) => setAudioSource(e.target.value)}
                  className="w-4 h-4 appearance-none rounded-full border-2 border-amber-300 checked:border-amber-600 checked:bg-amber-600 checked:border-4 focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:outline-none cursor-pointer transition-colors"
                />
                <span className="text-sm text-amber-700 select-none">
                  Keep Original Audio
                </span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="audioSource"
                  value="new"
                  checked={audioSource === "new"}
                  onChange={(e) => setAudioSource(e.target.value)}
                  className="w-4 h-4 appearance-none rounded-full border-2 border-amber-300 checked:border-amber-600 checked:bg-amber-600 checked:border-4 focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:outline-none cursor-pointer transition-colors"
                />
                <span className="text-sm text-amber-700 select-none">
                  Upload New Audio
                </span>
              </label>
            </div>
          </div>

          {/* Audio Upload Section - Conditional Rendering */}
          {audioSource === "new" && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-amber-700">
                Audio File
              </label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-amber-300 border-dashed rounded-lg cursor-pointer bg-amber-50 hover:bg-amber-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-amber-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-amber-700">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-amber-600">
                        MP3, WAV or M4A (MAX. 10MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".mp3,.wav,.m4a"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Add text on video */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-amber-700">
              Text Overlay
            </label>
            <input
              type="text"
              value={textOverlay}
              onChange={(e) => setTextOverlay(e.target.value)}
              placeholder="Enter text to display on video"
              className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-700 mb-1">
                  Position
                </label>
                <select
                  value={textPosition}
                  onChange={(e) => setTextPosition(e.target.value)}
                  className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="top">Top</option>
                  <option value="center">Center</option>
                  <option value="bottom">Bottom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-700 mb-1">
                  Font Size
                </label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="16">Small</option>
                  <option value="24">Medium</option>
                  <option value="32">Large</option>
                  <option value="48">Extra Large</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-700 mb-1">
                Text Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="h-10 w-10 border border-amber-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  placeholder="#FFFFFF"
                  className="flex-1 px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="flex-1 px-4 py-2 text-sm font-medium text-amber-900 bg-amber-100 border border-amber-300 rounded-md hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Download Video
            </button>
            <button
              type="button"
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Share Instantly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoEditPage;
