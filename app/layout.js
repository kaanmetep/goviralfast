import { AppProvider } from "@/context/AppContext";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Bricolage_Grotesque } from "next/font/google";

export const metadata = {
  title: "GoViralFast - Create & Share Viral Videos in Minutes, Not Hours",
  description:
    "GoViralFast allows you to easily create and share viral videos within minutes, making video creation fast, fun, and accessible for everyone.",
  keywords:
    "viral videos, video maker, video creation, social media videos, video editing, content creation, TikTok videos, Instagram reels, short videos, video templates",
  openGraph: {
    type: "website",
    locale: "en_US",
    // url: "https://goviralfast.com/", CHANGE HERE
    siteName: "GoViralFast",
    title: "GoViralFast - Create Viral Videos in Minutes",
    description:
      "Turn ideas into trending videos. Easy templates, fast editing, instant sharing.",
  },
  // robots: "index, follow",
  // canonical: "https://goviralfast.com",
  // alternates: {
  //   canonical: "https://goviralfast.com",
  //   languages: {
  //     "en-US": "https://goviralfast.com",
  //   },
  // }, // CHANGE HERE
};

const bric = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bric.variable} bg-gray-50`}>
        <SessionProvider>
          <AppProvider>{children}</AppProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
