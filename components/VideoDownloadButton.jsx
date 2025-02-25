"use client";
import { useState, useRef, useEffect } from "react";
import { getDownloadUrl } from "@/actions";

const VideoDownloadButton = ({ link, uploadedAudio }) => {
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const downloadLinkRef = useRef(null);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const detectSafari = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      return /safari/.test(userAgent) && !/chrome/.test(userAgent);
    };

    setIsSafari(detectSafari());
  }, []);

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // URL'yi hazırla
      const url = await getDownloadUrl(link, uploadedAudio);
      setDownloadUrl(url);

      // Safari için özel işlem
      if (isSafari) {
        // Blob kullanarak veriyi indirmeye zorla
        fetch(url)
          .then((response) => response.blob())
          .then((blob) => {
            // Blob URL oluştur
            const blobUrl = window.URL.createObjectURL(blob);

            // İndirme işlemi
            if (downloadLinkRef.current) {
              downloadLinkRef.current.href = blobUrl;
              downloadLinkRef.current.download = "video.mp4";
              downloadLinkRef.current.click();

              // Belleği temizle
              setTimeout(() => {
                window.URL.revokeObjectURL(blobUrl);
              }, 100);
            }
          })
          .catch((err) => {
            console.error("Safari indirme hatası:", err);
            alert(
              "Safari'de indirme sırasında bir hata oluştu. Lütfen tekrar deneyin."
            );
          });
      } else {
        // Mobil tarayıcı tespiti (Safari hariç)
        const isMobile =
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          ) && !isSafari;

        if (isMobile) {
          // Mobil cihazlar için doğrudan tarayıcıda indirme yöntemi
          window.location.href = url;
        } else {
          // Masaüstü için programatik indirme
          if (downloadLinkRef.current) {
            downloadLinkRef.current.href = url;
            downloadLinkRef.current.download = "video.mp4";
            downloadLinkRef.current.click();
          }
        }
      }
    } catch (error) {
      console.error("İndirme hatası:", error);
      alert("Video indirilemedi. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Görünmeyen gerçek indirme linki */}
      <a
        ref={downloadLinkRef}
        href={downloadUrl || "#"}
        download="video.mp4"
        className="hidden"
        aria-hidden="true"
        target="_blank"
      />

      {/* Kullanıcı arayüzü butonu */}
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
