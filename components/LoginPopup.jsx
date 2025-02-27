"use client";
import { Rocket, X } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { useAppContext } from "@/context/AppContext";
import {
  signInAction,
  signUpWithSupabase,
  signInWithSupabase,
} from "@/actions";
import { useTransition, useActionState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
const signUpWithSupabaseInitialState = {
  message: "",
};
const signInWithSupabaseInitialState = {
  message: "",
};
const LoginPopup = () => {
  const router = useRouter();
  const [
    signUpWithSupabaseState,
    signUpWithSupabaseAction,
    signingUpWithSupabase,
  ] = useActionState(signUpWithSupabase, signUpWithSupabaseInitialState);
  const [
    signInWithSupabaseState,
    signInWithSupabaseAction,
    signingInWithSupabase,
  ] = useActionState(signInWithSupabase, signInWithSupabaseInitialState);
  const [isPending, startTransition] = useTransition();
  const handleSignIn = () => {
    startTransition(async () => {
      await signInAction();
    });
  };
  useEffect(() => {
    if (signInWithSupabaseState.success) {
      router.push("/dashboard");
    }
  }, [signInWithSupabaseState]);
  const { selectedOption, setSelectedOption } = useAppContext();
  if (selectedOption === null) return;
  return (
    <div className=" fixed top-0  inset-0 h-full backdrop-blur-md z-[1000] flex items-center justify-center  ">
      <div className="relative bg-white w-[800px] flex rounded-md border-yellow-50 border">
        {/* SIGN UP */}
        <div
          className={`${
            selectedOption === "signin" && "hidden"
          } sm:block py-6  flex-1 rounded-md  ${
            selectedOption === "signin"
              ? "flex items-center justify-center"
              : "shadow-xl border-l-2 rounded-md pt-6"
          }`}
        >
          {selectedOption === "signup" ? (
            <motion.div
              key="signup"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className={`text-4xl  ml-6 font-thin $`}>Sign Up</h2>
              <div>
                <form
                  action={signUpWithSupabaseAction}
                  className="mt-2 p-6 flex flex-col gap-6"
                >
                  <div className="relative w-full">
                    <input
                      type="text"
                      name="full_name"
                      id="full_name"
                      required
                      min={3}
                      max={40}
                      defaultValue={signUpWithSupabaseState.inputs?.full_name}
                      className="border-b-2 pl-2 py-1 w-full text-sm outline-none"
                      placeholder="First Name"
                    />
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-red-500">
                      *
                    </span>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      required
                      min={3}
                      max={100}
                      defaultValue={signUpWithSupabaseState.inputs?.email}
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
                      name="password"
                      id="password"
                      defaultValue={signUpWithSupabaseState.inputs?.password}
                      required
                      min={3}
                      max={100}
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
                      name="rePassword"
                      id="rePassword"
                      required
                      min={3}
                      max={100}
                      className="border-b-2 pl-2 py-1 w-full text-sm outline-none"
                      placeholder="Password Again"
                    />
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-red-500">
                      *
                    </span>
                  </div>
                  <p
                    className={`text-center text-sm ${
                      signUpWithSupabaseState?.message.includes("success")
                        ? "text-green-500"
                        : "text-red-500"
                    } font-bold`}
                  >
                    {signUpWithSupabaseState?.message}
                  </p>
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

                  <button className="bg-gray-100 rounded-full py-1 font-thin text-lg border h-[38px]">
                    {signingUpWithSupabase ? (
                      <div className="flex justify-center items-center">
                        <div
                          className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"
                          aria-label="loading"
                        ></div>
                      </div>
                    ) : (
                      "Sign up"
                    )}
                  </button>
                </form>
                <div className="px-6  mt-1">
                  <button
                    className="flex items-center justify-center rounded-full py-1 bg-blue-100 text-lg border gap-2 w-full h-9 min-h-[36px]"
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
                  <p
                    className="sm:hidden border-b border-black text-black cursor-pointer hover:border-transparent transition-all delay-[50ms] w-fit mt-6 mx-auto text-sm"
                    onClick={() => setSelectedOption("signin")}
                  >
                    Sign in to your account
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1 h-full">
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
          className={`${
            selectedOption === "signup" && "hidden"
          } sm:block py-6 flex-1 rounded-md   ${
            selectedOption === "signup"
              ? "flex items-center justify-center"
              : "shadow-xl border-l-2 rounded-md pt-14"
          }`}
        >
          {selectedOption === "signin" ? (
            <motion.div
              key="signup"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className={`text-4xl  ml-6 font-thin $`}>Sign In</h2>
              <div>
                <form
                  action={signInWithSupabaseAction}
                  className="mt-2 p-6 flex flex-col gap-10"
                >
                  <input
                    type="text"
                    name="email"
                    id="email"
                    defaultValue={signInWithSupabaseState?.inputs?.email}
                    className="border-b-2 pl-2 py-1 w-full text-sm outline-none"
                    placeholder="E-mail Adress"
                    required
                    min={3}
                    max={100}
                  />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="border-b-2 pl-2 py-1 w-full text-sm outline-none"
                    placeholder="Password"
                    required
                    min={3}
                    max={100}
                  />
                  <p
                    className={`text-red-500 text-center text-sm ${
                      signInWithSupabaseState?.message ? "block" : "hidden"
                    } font-bold`}
                  >
                    {signInWithSupabaseState?.message}
                  </p>
                  <button className="bg-gray-100 rounded-full py-1 font-thin text-lg border h-[38px]">
                    {signingInWithSupabase ? (
                      <div className="flex justify-center items-center">
                        <div
                          className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"
                          aria-label="loading"
                        ></div>
                      </div>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </form>
                <div className="px-6  mt-1">
                  <button
                    className="flex items-center justify-center rounded-full py-1  text-lg border gap-2 w-full h-9 min-h-[36px] bg-blue-100 "
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

                <div className="flex justify-center text-sm items-center mt-8 gap-6">
                  <p
                    className="sm:hidden border-b border-black text-black cursor-pointer hover:border-transparent transition-all delay-[50ms]"
                    onClick={() => setSelectedOption("signup")}
                  >
                    Create an account
                  </p>
                  <p className=" border-b border-black  cursor-pointer text-gray-600 hover:border-transparent transition-all delay-[50ms]">
                    Forgot your password?
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1 h-full">
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
          className="absolute right-3 top-3"
          onClick={() => setSelectedOption(null)}
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
