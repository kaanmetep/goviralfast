"use client";
import Button from "./Button";
import Navigation from "./Navigation";
import { Rocket, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const { setSelectedOption } = useAppContext();
  const handleLoginOrDashboardClick = () => {
    if (!session) {
      setSelectedOption("signin");
    } else {
      router.push("/dashboard");
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`flex gap-16 items-center justify-center w-full p-5 lg:px-8 transition-all duration-300  ${
        isScrolled && "shadow-md backdrop-blur-md"
      } fixed top-0 left-0 z-50 st`}
      role="banner"
      aria-label="Main site header"
    >
      <div className="flex items-center gap-1">
        <Rocket
          className="fill-yellow-200 size-5 sm:size-7 md:size-9"
          aria-hidden="true"
        />
        <Link href="/">
          <h1 className="sm:text-lg md:text-xl font-semibold">GoViralFast</h1>
        </Link>
      </div>

      <Navigation
        isScrolled={isScrolled}
        session={session}
        handleLoginOrDashboardClick={handleLoginOrDashboardClick}
      />

      {/* MOBILE SCREEN NAVIGATION */}
      <div className="block sm:hidden ml-auto group relative">
        <Menu className="cursor-pointer" aria-label="Open mobile menu" />
        <nav aria-label="Mobile navigation">
          <div className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto top-6 right-0 absolute bg-white shadow-lg rounded-lg transition-all duration-200 border border-gray-300 px-">
            <ul className="flex flex-col gap-1 p-2">
              <li className="cursor-pointer hover:bg-gray-100 transition-all duration-150 rounded-lg">
                <Link
                  href="#pricing"
                  className="block px-6 py-2 text-gray-700 font-medium text-center"
                >
                  Pricing
                </Link>
              </li>
              <li className="cursor-pointer hover:bg-gray-100 transition-all duration-150 rounded-lg">
                <Link
                  href="#learn"
                  className="block px-6 py-2 text-gray-700 font-medium text-center"
                >
                  Learn
                </Link>
              </li>
              <li className="cursor-pointer hover:bg-gray-100 transition-all duration-150 rounded-lg mx-auto">
                <button
                  onClick={handleLoginOrDashboardClick}
                  className="block px-6 py-2 text-gray-700 font-medium text-center"
                >
                  {session ? "Dashboard" : "Login"}
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
