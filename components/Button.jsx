"use client";

import { Rocket } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useSession, getSession } from "next-auth/react";
import { monthlyPlan } from "@/stripeinfo";

const Button = ({ children, logo = true }) => {
  const { data: session } = useSession();
  const { setSelectedOption } = useAppContext();

  const handleClick = async () => {
    if (!session) {
      setSelectedOption("signin");
    } else {
      const latestSession = await getSession();
      if (latestSession) {
        const email = latestSession.user?.email;
        const paymentUrl = new URL(monthlyPlan.link);

        if (email) {
          paymentUrl.searchParams.append("prefilled_email", email);
        }
        window.open(paymentUrl.toString(), "_blank");
      }
    }
  };

  return (
    <button
      className={logo ? "button" : "button-with-no-logo"}
      onClick={handleClick}
    >
      {logo && <Rocket className="fill-black size-5 md:size-6" />}
      {children}
    </button>
  );
};

export default Button;
