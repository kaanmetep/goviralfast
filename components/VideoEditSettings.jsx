import { Edit, CloudUpload, Info } from "lucide-react";
import VideoDownloadButton from "./VideoDownloadButton";
import { modifyUrl } from "@/utils/helpers";
import { useState, useEffect } from "react";
const VideoEditSettings = ({
  editSettings,
  updateEditSettings,
  link,
  videoType,
}) => {
  const [uploadedAudio, setUploadedAudio] = useState(null);
  const editedVideoLink = modifyUrl(
    link,
    editSettings,
    videoType,
    uploadedAudio
  );
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const maxSize = 1 * 1024 * 1024;

      if (file.size > maxSize) {
        alert("Audio file cant be more than 1MB!");
        return;
      }

      setUploadedAudio(file);
    }
  };

  useEffect(() => {
    if (editSettings.audioSource === "original") {
      setUploadedAudio(null);
    }
  }, [editSettings.audioSource]);
  return (
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
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-amber-700">
              Audio Source
            </label>
            <div className="relative group ">
              <Info size={20} color="#d97706" />
              <p className="opacity-0 pointer-events-none absolute group-hover:opacity-100 group-hover:pointer-events-auto w-[280px] text-xs transition-all delay-[50ms] -left-16 text-amber-800 bg-amber-100 px-4 py-2 border-md leading-relaxed">
                Audio files longer than the video duration will be shortened to
                match the video length, while audio files shorter than the video
                duration will play only for their own length.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="audioSource"
                value="original"
                checked={editSettings.audioSource === "original"}
                onChange={(e) =>
                  updateEditSettings("audioSource", e.target.value)
                }
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
                checked={editSettings.audioSource === "new"}
                onChange={(e) =>
                  updateEditSettings("audioSource", e.target.value)
                }
                className="w-4 h-4 appearance-none rounded-full border-2 border-amber-300 checked:border-amber-600 checked:bg-amber-600 checked:border-4 focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:outline-none cursor-pointer transition-colors"
              />
              <span className="text-sm text-amber-700 select-none">
                Upload New Audio
              </span>
            </label>
          </div>
        </div>
        {editSettings.audioSource === "new" && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-amber-700">
              Audio File
            </label>
            <div className="flex flex-col gap-2">
              {uploadedAudio ? (
                <p className="text-amber-700 bg-amber-200 w-fit px-2 rounded-md py-1">
                  Audio uploaded succesfully ✓
                </p>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-amber-300 border-dashed rounded-lg cursor-pointer bg-amber-50 hover:bg-amber-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <CloudUpload className="mb-3" color="#d97706" />
                      <p className="mb-2 text-sm text-amber-700">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-amber-600">
                        MP3, WAV or M4A (MAX. 1 MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".mp3,.wav,.m4a"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Text Overlay Settings */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-amber-700">
            Text Overlay
          </label>
          <input
            type="text"
            maxLength={200}
            value={editSettings.textOverlay.text}
            onChange={(e) =>
              updateEditSettings("textOverlay.text", e.target.value)
            }
            placeholder="Enter text to display on video"
            className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-amber-700 mb-1">
                Position
              </label>
              <select
                value={editSettings.textOverlay.position}
                onChange={(e) =>
                  updateEditSettings("textOverlay.position", e.target.value)
                }
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
                value={editSettings.textOverlay.fontSize}
                onChange={(e) =>
                  updateEditSettings("textOverlay.fontSize", e.target.value)
                }
                className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="48">Small</option>
                <option value="64">Medium</option>
                <option value="72">Large</option>
                <option value="96">Extra Large</option>
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
                value={editSettings.textOverlay.color}
                onChange={(e) =>
                  updateEditSettings("textOverlay.color", e.target.value)
                }
                className="h-10 w-10 border border-amber-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={editSettings.textOverlay.color}
                onChange={(e) => {
                  const value = e.target.value;

                  if (
                    value === "" ||
                    value === "#" ||
                    /^#([A-Fa-f0-9]{1,6})$/.test(value)
                  ) {
                    updateEditSettings("textOverlay.color", value);
                  }
                }}
                placeholder="#FFFFFF"
                className="flex-1 px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-700 mb-1">
              Background Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={editSettings.textOverlay.backgroundColor}
                onChange={(e) =>
                  updateEditSettings(
                    "textOverlay.backgroundColor",
                    e.target.value
                  )
                }
                className="h-10 w-10 border border-amber-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={editSettings.textOverlay.backgroundColor}
                onChange={(e) => {
                  const value = e.target.value;

                  if (
                    value === "" ||
                    value === "#" ||
                    /^#([A-Fa-f0-9]{1,6})$/.test(value)
                  ) {
                    updateEditSettings("textOverlay.backgroundColor", value);
                  }
                }}
                placeholder="Add background color"
                className="flex-1 px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className={`-mt-2 opacity-0 pointer-events-none  bg-amber-200 font-semibold text-xs px-2 py-1 rounded-lg hover:bg-amber-300 delay-[50ms] transition-all cursor-pointer ${
                editSettings.textOverlay.backgroundColor &&
                "opacity-100 pointer-events-auto"
              }`}
              onClick={() =>
                updateEditSettings("textOverlay.backgroundColor", "")
              }
            >
              Remove
            </button>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <VideoDownloadButton
            link={editedVideoLink}
            uploadedAudio={uploadedAudio}
          />
          <div className="relative ">
            <button
              type="button"
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-amber-800 border border-transparent rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 blur-[1px]"
            >
              Share Instantly
            </button>
            <span className="absolute text-xs -top-1 -right-3 bg-black text-white rounded-md px-1 ">
              Coming soon!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoEditSettings;
