"use client";
import { useState } from "react";

const VideoDownloadButton = ({ link }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engelle
    setLoading(true); // Yükleme başlasın
    try {
      const response = await fetch(link); // Cloudinary linkinden videoyu çek
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "video.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Video indirilemedi:", error);
    }
    setLoading(false); // Yükleme bitti
  };

  return (
    <button
      onClick={handleDownload}
      className="flex-1 px-4 py-2 text-sm font-medium text-amber-900 bg-amber-100 border border-amber-300 rounded-md hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 flex items-center justify-center"
      disabled={loading} // Yüklenirken tıklamayı engelle
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
  );
};
export default VideoDownloadButton;
