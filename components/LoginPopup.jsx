"use client";
import LoginPopupSignIn from "./LoginPopupSignIn";
import LoginPopupSignUp from "./LoginPopupSignUp";
import { X } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { signInAction } from "@/actions";
import { useTransition, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const LoginPopup = () => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const handleSignIn = () => {
    startTransition(async () => {
      await signInAction();
    });
  };
  const { selectedOption, setSelectedOption } = useAppContext();
  useEffect(() => {
    if (searchParams.get("showLogin") === "true") {
      setSelectedOption("signin");
    }
  }, [searchParams]);
  if (selectedOption === null) return;

  return (
    <div className=" fixed top-0  inset-0 h-full backdrop-blur-md z-[1000] flex items-center justify-center px-3 ">
      <div className="relative bg-white w-[800px] flex rounded-md border-yellow-50 border">
        {/* SIGN UP */}
        <LoginPopupSignUp
          selectedOption={selectedOption}
          handleSignIn={handleSignIn}
          isPending={isPending}
          setSelectedOption={setSelectedOption}
        />
        {/* SIGN IN */}
        <LoginPopupSignIn
          selectedOption={selectedOption}
          handleSignIn={handleSignIn}
          isPending={isPending}
          setSelectedOption={setSelectedOption}
        />
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
