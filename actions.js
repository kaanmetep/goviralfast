"use server";
import { signIn, signOut } from "./auth";
import { createAdminClient } from "@/utils/supabase/server";

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
  await signOut({ redirectTo: "/" });
};
export const signUpWithSupabase = async (_, formData) => {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
      rePassword: formData.get("rePassword"),
      full_name: formData.get("full_name"),
    };
    // check if inputs are empty.
    if (
      !rawData.email ||
      !rawData.password ||
      !rawData.full_name ||
      !rawData.rePassword
    ) {
      return { message: "Please fill all the areas.", inputs: rawData };
    }
    // check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(rawData.email)) {
      return {
        message: "Please enter a valid email address.",
        inputs: rawData,
      };
    }
    if (rawData.full_name.length < 2 || rawData.full_name.length > 50) {
      return {
        message: "Name must be between 2 and 50 characters.",
        inputs: rawData,
      };
    }
    if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(rawData.full_name)) {
      return {
        message: "Name can only contain letters and spaces.",
        inputs: rawData,
      };
    }
    if (rawData.password.length < 8) {
      return {
        message: "Password must be at least 8 characters long.",
        inputs: rawData,
      };
    }

    if (rawData.password !== rawData.rePassword) {
      return {
        message: "Passwords you enter does not match.",
        inputs: rawData,
      };
    }

    // XSS ve injection önleme için
    const sanitizedFullName = rawData.full_name.trim().replace(/[<>]/g, "");
    const sanitizedEmail = rawData.email.trim().toLowerCase();

    // Supabase ile kayıt
    const supabase = createAdminClient();
    const { data, error } = await supabase.auth.signUp({
      email: sanitizedEmail,
      password: rawData.password,
      options: {
        data: {
          full_name: sanitizedFullName,
          is_premium: false,
        },
      },
    });

    if (error) {
      console.error("Supabase signup error:", error);
      return { message: error.message, inputs: rawData };
    }

    return {
      message: "You signed up successfully. Please confirm your email.",
    };
  } catch (error) {
    console.error("Signup error:", error);
    return { message: "An error occurred. Please try again later." };
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(rawData.email)) {
      return {
        message: "Please enter a valid email address.",
        inputs: rawData,
      };
    }
    // XSS ve injection koruması
    const sanitizedEmail = rawData.email.trim().toLowerCase();

    // Supabase ile giriş yap
    const supabase = createAdminClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: sanitizedEmail,
      password: rawData.password,
    });

    if (error) {
      if (error.status === 400) {
        return { message: "Invalid email or password." };
      }
      if (error.status === 429) {
        return { message: "Too many login attempts. Please try again later." };
      }
      console.error("Supabase auth error:", error);
      return { message: "Authentication failed." };
    }

    if (!data?.user) {
      return { message: "User not found." };
    }

    // NextAuth'a yönlendir
    const res = await signIn("supabase", {
      id: data.user.id,
      email: data.user.email,
      redirect: false,
    });

    if (res?.error) {
      console.error("NextAuth error:", res.error);
      return { message: "Login failed. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return {
      message: "An unexpected error occurred. Please try again later.",
    };
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
