"use client";
import { Rocket, X } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { useAppContext } from "@/context/AppContext";
import { signInAction } from "@/actions";
import { useTransition } from "react";

const LoginPopup = () => {
  const [isPending, startTransition] = useTransition();
  const handleSignIn = () => {
    startTransition(async () => {
      await signInAction();
    });
  };
  const { selectedOption, setSelectedOption } = useAppContext();
  if (selectedOption === null) return;
  return (
    <div className=" fixed top-0  inset-0 h-full backdrop-blur-md z-[1000] flex items-center justify-center  ">
      <div className="relative bg-white w-[750px] h-[450px] flex rounded-md border-yellow-50 border">
        {/* SIGN UP */}
        <div
          className={`flex-1 rounded-md  ${
            selectedOption === "signin"
              ? "flex items-center justify-center"
              : "shadow-xl border-l-2 rounded-md pt-6"
          }`}
        >
          {selectedOption === "signup" ? (
            <>
              <h2 className={`text-4xl  ml-6 font-thin $`}>Sign Up</h2>
              <div>
                <form action="" className="mt-2 p-6 flex flex-col gap-6">
                  <div className="relative w-full">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="border-b-2 pl-2 py-1 w-full text-sm outline-none"
                      placeholder="E-mail Adress"
                    />
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-red-500">
                      *
                    </span>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="password"
                      name=""
                      id=""
                      className="border-b-2 pl-2 py-1 w-full text-sm outline-none"
                      placeholder="Password"
                    />
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-red-500">
                      *
                    </span>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="password"
                      name=""
                      id=""
                      className="border-b-2 pl-2 py-1 w-full text-sm outline-none"
                      placeholder="Password Again"
                    />
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-red-500">
                      *
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <input type="checkbox" />
                    <p className="text-[11px] text-gray-500 ">
                      By clicking the button, you agree to our{" "}
                      <a
                        href="/terms"
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        Terms of Service
                      </a>{" "}
                      and
                      <a
                        href="/privacy"
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        {" "}
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>

                  <button className="bg-gray-100 rounded-full py-1 font-thin text-lg border">
                    Sign Up
                  </button>
                </form>
                <div className="px-6  mt-1">
                  <button
                    className="flex items-center justify-center rounded-full py-1 font-thin text-lg border gap-2 w-full h-9 min-h-[36px]"
                    onClick={handleSignIn}
                  >
                    {isPending ? (
                      <div
                        className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"
                        aria-label="loading"
                      ></div>
                    ) : (
                      <>
                        <FaGoogle className="size-3" />
                        <p className="text-sm">Login with Google</p>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex items-center gap-1 ">
                <Rocket className="fill-yellow-200 size-3 sm:size-5 md:size-6" />
                <h1 className="md:text-lg font-semibold">GoViralFast</h1>
              </div>
              <p className="text-xs  text-gray-400 text-center">
                Create and Share viral videos in minutes, not hours
              </p>
              <button
                className="mt-4 border-b cursor-pointer border-black"
                onClick={() => setSelectedOption("signup")}
              >
                Create an account
              </button>
            </div>
          )}
        </div>
        {/* SIGN IN */}
        <div
          className={`flex-1 rounded-md  ${
            selectedOption === "signup"
              ? "flex items-center justify-center"
              : "shadow-xl border-l-2 rounded-md pt-14"
          }`}
        >
          {selectedOption === "signin" ? (
            <>
              <h2 className={`text-4xl  ml-6 font-thin $`}>Sign In</h2>
              <div>
                <form action="" className="mt-2 p-6 flex flex-col gap-10">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border-b-2 pl-2 py-1 w-full text-sm outline-none"
                    placeholder="E-mail Adress"
                  />
                  <input
                    type="password"
                    name=""
                    id=""
                    className="border-b-2 pl-2 py-1 w-full text-sm outline-none"
                    placeholder="Password"
                  />
                  <button className="bg-gray-100 rounded-full py-1 font-thin text-lg border">
                    Sign In
                  </button>
                </form>
                <div className="px-6  mt-1">
                  <button
                    className="flex items-center justify-center rounded-full py-1 font-thin text-lg border gap-2 w-full h-9 min-h-[36px]"
                    onClick={handleSignIn}
                  >
                    {isPending ? (
                      <div
                        className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"
                        aria-label="loading"
                      ></div>
                    ) : (
                      <>
                        <FaGoogle className="size-3" />
                        <p className="text-sm">Login with Google</p>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-center text-gray-600 text-sm border-b border-black w-fit mx-auto mt-8 cursor-pointer">
                  Forgot your password?
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex items-center gap-1 ">
                <Rocket className="fill-yellow-200 size-3 sm:size-5 md:size-6" />
                <h1 className="md:text-lg font-semibold">GoViralFast</h1>
              </div>
              <p className="text-xs  text-gray-400 text-center">
                Create and Share viral videos in minutes, not hours
              </p>
              <button
                className="mt-4 border-b cursor-pointer border-black"
                onClick={() => setSelectedOption("signin")}
              >
                Sign in to your account
              </button>
            </div>
          )}
        </div>
        <button
          className="absolute right-2 top-2"
          onClick={() => setSelectedOption(null)}
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
