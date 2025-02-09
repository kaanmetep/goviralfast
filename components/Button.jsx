import { Rocket } from "lucide-react";
const Button = ({ children }) => {
  return (
    <button className="button">
      <Rocket className="fill-black size-5 md:size-6" />
      {children}
    </button>
  );
};

export default Button;
