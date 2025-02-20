"use client";
import { Rocket } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// !!! THIS BUTTON IS USED ONLY FOR MAIN PAGE. !!!
const Button = ({ children, logo = true }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { setSelectedOption } = useAppContext();
  const handleClick = () => {
    if (!session) {
      setSelectedOption("signin");
      return;
    }
    router.push("/dashboard");
  };
  return (
    <button
      className={`${logo ? "button" : "button-with-no-logo"}`}
      onClick={handleClick}
    >
      {logo && <Rocket className="fill-black size-5 md:size-6" />}
      {children}
    </button>
  );
};

export default Button;
