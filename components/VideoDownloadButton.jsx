"use client";
import { useState, useRef } from "react";
import { getDownloadUrl } from "@/actions";

const VideoDownloadButton = ({ link, uploadedAudio }) => {
  const [loading, setLoading] = useState(false);
  const downloadLinkRef = useRef(null);

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = await getDownloadUrl(link, uploadedAudio);

      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      if (downloadLinkRef.current) {
        downloadLinkRef.current.href = blobUrl;
        downloadLinkRef.current.download = "video.mp4";
        downloadLinkRef.current.click();

        setTimeout(() => {
          window.URL.revokeObjectURL(blobUrl);
        }, 100);
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("Video could not downloaded. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <a ref={downloadLinkRef} className="hidden" aria-hidden="true" />

      <button
        onClick={handleDownload}
        disabled={loading}
        className={`flex-1 px-4 py-2 text-sm font-medium text-amber-900 bg-amber-100 border border-amber-300 rounded-md hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 flex items-center justify-center ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-amber-900 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        ) : (
          "Download Video"
        )}
      </button>
    </>
  );
};

export default VideoDownloadButton;
