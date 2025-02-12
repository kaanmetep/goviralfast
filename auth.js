import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      try {
        const supabase = createClient();

        // Kullanıcının veritabanında olup olmadığını kontrol et
        const { data: existingUser, error } = await supabase
          .from("users")
          .select("email")
          .eq("email", user.email)
          .single(); // Tek bir kayıt al

        if (error && error.code !== "PGRST116") {
          // Kullanıcı yoksa hata oluşabilir, ama diğer hataları kontrol etmeliyiz
          console.log("Error fetching user:", error);
          return false;
        }

        // Eğer kullanıcı veritabanında yoksa ekle
        if (!existingUser) {
          const { error: insertError } = await supabase.from("users").insert([
            {
              email: user.email,
              full_name: user.name,
              avatar_url: user.image,
              is_premium: false,
              instagram_connected_accounts: [],
              youtube_connected_accounts: [],
              tiktok_connected_accounts: [],
            },
          ]);

          if (insertError) {
            console.log("Error inserting user:", insertError);
            return false;
          }
        }

        return true;
      } catch (err) {
        console.log("Unexpected error:", err);
        return false;
      }
    },
    // bir session tam olarak olusturulmadan once ona istedigim bazi seyleri ekleyebilirim
    async session({ session }) {
      const supabase = createClient();
      const { data: userData, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", session.user.email);
      if (userData) session.user.userData = userData;
      return session;
    },
    // bu callback da user middlewareki route'a hit yaptiginda, user auth ise true dondur degilse false dondur demek.
    authorized({ auth, request }) {
      if (auth?.user) return true;
      return NextResponse.redirect(new URL("/", request.url));
    },
  },
});
