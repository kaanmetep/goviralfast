"use client";
import { useState } from "react";
import { getDownloadUrl } from "@/actions";
const VideoDownloadButton = ({ link, uploadedAudio }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const downloadUrl = await getDownloadUrl(link, uploadedAudio);
      console.log("downloadUrl:", downloadUrl);
      const downloadLink = document.getElementById("download-link");
      downloadLink.href = downloadUrl;
      downloadLink.download = "video.mp4";
      downloadLink.click();
    } catch (error) {
      console.error("İndirme işlemi sırasında bir hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <a
      onClick={(e) => {
        if (!loading) {
          handleDownload(e);
        }
      }}
      id="download-link"
      href="javascript:void(0)"
      target="_blank"
      className={`flex-1 px-4 py-2 text-sm font-medium text-amber-900 bg-amber-100 border border-amber-300 rounded-md hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 flex items-center justify-center ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      style={{ pointerEvents: loading ? "none" : "auto" }} // Yükleme sırasında tıklamayı engelle
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
    </a>
  );
};
export default VideoDownloadButton;
