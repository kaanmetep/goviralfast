"use client";
import { Rocket } from "lucide-react";
import Navigation from "./Navigation";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { signInAction } from "@/actions";
import Link from "next/link";
const Header = ({ session }) => {
  const [isScrolled, setIsScrolled] = useState(false);
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
        isScrolled && "   shadow-md backdrop-blur-md"
      } fixed top-0 left-0 z-50 st`}
    >
      <div className="flex items-center gap-1 ">
        <Rocket className="fill-yellow-200 size-5 sm:size-7 md:size-9" />
        <h1 className="sm:text-lg md:text-xl font-semibold">GoViralFast</h1>
      </div>

      <Navigation isScrolled={isScrolled} session={session} />
      <div className="block md:hidden ml-auto  group relative ">
        <Menu className="cursor-pointer" />
        <div className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto top-6 right-0 absolute bg-white shadow-lg rounded-lg transition-all duration-200 border border-gray-300 px-">
          <nav>
            <ul className="flex flex-col gap-1 p-2">
              <li className="cursor-pointer hover:bg-gray-100 transition-all duration-150 rounded-lg">
                <a
                  href="#pricing"
                  className="block px-6 py-2 text-gray-700 font-medium text-center"
                >
                  Pricing
                </a>
              </li>
              <li className="cursor-pointer hover:bg-gray-100 transition-all duration-150 rounded-lg">
                <a
                  href="#learn"
                  className="block px-6 py-2 text-gray-700 font-medium text-center"
                >
                  Learn
                </a>
              </li>
              <li className="cursor-pointer bg-blue-400 text-white font-semibold rounded-lg gap-2 px-2 py-2 transition-all duration-150 text-center hover:bg-blue-500 ">
                <form action={signInAction}>
                  {session ? (
                    <Link href={"/dashboard"}>Dashboard</Link>
                  ) : (
                    <div className="flex items-center gap-2">
                      <FaGoogle className="size-4" />{" "}
                      <button className="block text-center whitespace-nowrap text-sm">
                        Login with Google
                      </button>
                    </div>
                  )}
                </form>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
