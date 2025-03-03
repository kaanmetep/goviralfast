import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { createAdminClient } from "@/utils/supabase/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Providers: Desteklenen giriş yöntemleri
  providers: [
    // 1. Bu provider Google ile giriş yapmak isteyenler için çalışır
    Google,

    // 2. Supabase ile email/password girişi için provider
    CredentialsProvider({
      id: "supabase", // Provider'ın benzersiz ID'si
      name: "Supabase",
      credentials: {
        // Giriş için gerekli alanlar
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // authorize: Kullanıcı girişi doğrulama fonksiyonu
      // Bu fonksiyon sadece Supabase ile giriş yapılırken çalışır
      async authorize(credentials) {
        try {
          if (!credentials?.id || !credentials?.email) {
            return null;
          }

          // Giriş başarılıysa, NextAuth için user objesi döndür
          // bunu dondurmek zorundayiz cunku daha sonra asagidaki session fonksiyonunda bu emaili kullanmamiz gerek. ve token.sub icinde id dondurmemiz lazim kesinlikle. cunku nextuath bu ID'yi jwt token'ina ekliycek.
          return {
            id: credentials.id,
            email: credentials.email,
          };
        } catch (error) {
          console.error("Unexpected error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    // 1. signIn: Kullanıcı giriş yaptığında çalışır
    async signIn({ user }) {
      try {
        const supabase = createAdminClient();

        // Kullanıcının veritabanında olup olmadığını kontrol et
        const { data: existingUser, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", user.email)
          .single();

        if (error && error.code !== "PGRST116") {
          console.log("Error fetching user:", error);
          return false;
        }

        // Kullanıcı veritabanında yoksa yeni kullanıcı oluştur
        if (!existingUser) {
          const { error: insertError } = await supabase.from("users").insert([
            {
              email: user.email,
              full_name: user.name || "",
              avatar_url: user.image || "",
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

    // 2. session: Her sayfa yüklendiğinde ve session güncellendiğinde çalışır
    // Kullanıcı bilgilerini session'a ekler
    async session({ session, token }) {
      const supabase = createAdminClient();

      // token.sub jwt callback'inde eklendi.
      if (token.sub) {
        session.user.id = token.sub;
      }

      // Kullanıcının tüm verilerini Supabase'den çek
      const { data: userData, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", session.user.email)
        .single();

      // Kullanıcı verilerini session'a ekle
      if (userData) {
        session.user.userData = userData;
      }

      return session;
    },

    // 3. jwt: JWT token oluşturulurken veya güncellenirken çalışır
    // Token'a ekstra bilgiler ekler
    // burdaki user, authorize'den dondurulen user bilgisi.
    async jwt({ token, user }) {
      // Yeni giriş yapıldığında user bilgilerini token'a ekle
      if (user) {
        token.sub = user.id;
        token.email = user.email;
      }
      return token;
    },

    authorized({ auth, request }) {
      if (auth?.user) return true;
      request.nextUrl.pathname = "/";
      request.nextUrl.searchParams.set("showLogin", "true");
      return Response.redirect(request.nextUrl);
    },
  },

  // Session yapılandırması
  session: {
    strategy: "jwt", // Session'ları JWT ile yönet
  },
});
// --- Calisma sirasi ---
// oncelikle supabase ile giris yaparsak authorize fonksiyonu calisir. (bu fonksiyon zaten supabase'ye kayitli olan CredentialsProvider icinde. diger yerleri baglamiyor yani.)
// zaten bu supabase ile giris yaparken action.js'te olarak yaptigimiz sey su;
// const result = await signIn("supabase", {
//  email,
// password,
//  redirect: true,
//  callbackUrl: "/dashboard",
//});

// daha sonra bu authroize fonksiyonu icinde supabase login yapiyoruz. eger login basarili ise -oyle bir hesap varsa yani- email ve de id'yi donduruyoruz. daha sonra bu email ve id bize lazim olucak nextuath icinde islemelr yaparken. su anda supabase'nin etki alanindan ciktik. cunku ihtiyacimiz olan id ve emaili aldik.

// authorize fonksiyonu eger ki GECERLI BIR KULLANICI DONERSE, hemen callbacks.signIn fonksiyonu tetiklenir. burda da kullanici databasede yoksa ekliyoruz, varsa da direkt donuyoruz.

// daha sonra da jwt callback'i calisiyor ve token'a ID'yi ekliyor. bu token'i return ediyor.

// daha sonra da session callback'i calisiyor ve tokendeki id'yi session'a aktariyor.

//Neden böyle yapıyoruz?
// JWT token'ı cookie'de şifrelenmiş olarak saklanıyor
// Ama biz client tarafında useSession() hook'u ile session'a erişmek istiyoruz
// Bu yüzden token'daki bilgileri session objesine aktarmamız gerekiyor
// Yani:
// Token -> Güvenli depolama için (cookie'de şifrelenmiş)
// Session -> Kullanım için (client'ta erişilebilir)
// Bu nedenle token'daki ID'yi session'a aktarıyoruz ki client tarafında session.user.id şeklinde erişebilelim.
// Eğer bu aktarımı yapmazsak, client tarafında ID'ye erişemeyiz çünkü token client'ta şifrelenmiş halde.
