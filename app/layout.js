import { AppProvider } from "@/context/AppContext";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Bricolage_Grotesque } from "next/font/google";

export const metadata = {
  title: "GoViralFast - Create and Share viral videos in minutes, not hours ",
  description:
    "GoViralFast allows you to easily create and share viral videos within minutes, making video creation fast, fun, and accessible for everyone.",
};

const bric = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage", // Optional: Custom variable name for the font
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bric.variable}  bg-gray-50 `}>
        <SessionProvider>
          <AppProvider>{children}</AppProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
