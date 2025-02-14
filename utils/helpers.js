export const modifyUrl = (url, editSettings, videoType) => {
  const { textOverlay } = editSettings;
  if (!textOverlay || !textOverlay.text) return url;

  const baseUrl = url.split("/upload/");
  if (baseUrl.length < 2) return url;

  // Metni encode et
  const wrappedText = encodeURIComponent(textOverlay.text);

  const colorHex = textOverlay.color.replace("#", "");

  const backgroundHex =
    textOverlay && textOverlay.backgroundColor?.replace("#", "");

  const fontSize = textOverlay.fontSize;
  const width = videoType === "tallVideo" ? "850" : "1700";

  let gravity = "north";
  let yOffset = ",y_50";

  if (textOverlay.position === "bottom") {
    gravity = "south";
  } else if (textOverlay.position === "center") {
    gravity = "center";
    yOffset = "";
  }
  const backgroundColor = backgroundHex ? `b_rgb:${backgroundHex}` : "";
  const transformation = `w_${width},c_fit,l_text:arial_${fontSize}_bold_line_spacing_3_center:${wrappedText},co_rgb:${colorHex},g_${gravity}${yOffset},${backgroundColor}`;

  return `${baseUrl[0]}/upload/${transformation}/${baseUrl[1]}`;
};
export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};
