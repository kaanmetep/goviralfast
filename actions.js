"use server";
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
import { signIn, signOut } from "./auth";
export const signInAction = async () => {
  await signIn("google", { redirectTo: "/dashboard" });
};
export const signOutAction = async () => {
  await signOut({ redirect: "/" });
};

export async function getDownloadUrl(link, uploadedAudio) {
  try {
    let linkBeforeAudioOption = link;
    if (uploadedAudio) {
      try {
        const buffer = await uploadedAudio
          .arrayBuffer()
          .then((arrayBuffer) => Buffer.from(arrayBuffer));

        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: "auto",
              public_id: "temp_audio",
              discard_original_filename: true,
              use_filename: false,
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );

          uploadStream.end(buffer);
        });
        linkBeforeAudioOption =
          linkBeforeAudioOption.split("/ac_none/")[0] +
          `/ac_none/l_audio:${result.public_id}/fl_layer_apply` +
          "/" +
          linkBeforeAudioOption.split("/ac_none/")[1];
        console.log("linkBeforeAudioOption:", linkBeforeAudioOption);
      } catch (error) {
        console.error("uploading error:", error);
        throw error;
      }
    }
    return linkBeforeAudioOption;
  } catch (error) {
    console.error("File download failed:", error);
    throw error;
  }
}
