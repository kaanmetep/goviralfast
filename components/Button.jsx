import { Rocket } from "lucide-react";
const Button = ({ children }) => {
  return (
    <button className="flex items-center gap-2 bg-yellow-400 text-black px-8 md:px-12 font-bold rounded-md py-3 hover:bg-yellow-400/80 transition-all delay-[50ms] text-sm md:text-base">
      <Rocket className="fill-black size-5 md:size-6" />
      {children}
    </button>
  );
};

export default Button;
