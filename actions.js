"use server";
import { signIn, signOut } from "./auth";
import { createClient } from "./utils/supabase/server";
import { redirect } from "next/navigation";

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const signInAction = async () => {
  await signIn("google", { redirectTo: "/dashboard" });
};
export const signOutAction = async () => {
  await signOut({ redirect: "/" });
};
export const signUpWithSupabase = async (_, formData) => {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
      rePassword: formData.get("rePassword"),
      full_name: formData.get("full_name"),
    };
    const supabase = createClient();

    if (
      !rawData.email ||
      !rawData.password ||
      !rawData.full_name ||
      !rawData.rePassword
    ) {
      return { message: "Please fill all the areas.", inputs: rawData };
    }
    if (rawData.password !== rawData.rePassword) {
      return {
        message: "Passwords you enter does not match.",
        inputs: rawData,
      };
    }
    // Sign up with supabase
    const { data, error } = await supabase.auth.signUp({
      email: rawData.email,
      password: rawData.password,
      options: {
        data: {
          full_name: rawData.full_name,
          is_premium: false,
        },
      },
    });

    if (error) {
      console.error("Supabase signup error:", error);
      return { message: error.message, inputs: rawData };
    }
    console.log(data);
    return {
      message: "You signed up successfully. Please confirm your email.",
    };
  } catch (error) {
    console.error("Signup error:", error);
    return { message: "An error occured. Please try again later." };
  }
};
export const signInWithSupabase = async (_, formData) => {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (!rawData.email || !rawData.password) {
      return { message: "Enter your e-mail and password.", inputs: rawData };
    }

    // Supabase ile giriş yap
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: rawData.email,
      password: rawData.password,
    });
    if (error?.status === 400 || !data.user) {
      return { message: "Invalid email or password." };
    }

    // NextAuth'a yonlendir
    const res = await signIn("supabase", {
      id: data.user.id, // NextAuth'un token'a koyacağı ID
      email: data.user.email,
      redirect: false, // Yönlendirmeyi biz yapacağız
    });

    if (res?.error) {
      return { message: "NextAuth login failed." };
    }

    return { success: true };
  } catch (error) {
    console.log("error" + error);
    return { message: "An unexpected error occurred." };
  }
};
export async function getDownloadUrl(link, uploadedAudio) {
  const timestap = Date.now();
  if (uploadedAudio && uploadedAudio.size > 1 * 1024 * 1024) {
    throw new Error("Audio file cant be more than 1MB!");
  }
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
              public_id: `temp_audio${timestap}`,
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
