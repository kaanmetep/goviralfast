import { Instagram } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="md:flex items-center gap-12 text-lg font-medium w-full hidden ">
      <a href="#pricing" className="nav-link">
        Pricing
      </a>
      <a href="#learn" className="nav-link">
        Learn
      </a>

      <button
        href="#"
        className="flex font-semibold items-center gap-2 bg-blue-400 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:shadow-lg ml-auto text-sm"
      >
        <Instagram size={20} />
        <span className="font-medium">Login with Google</span>
      </button>
    </nav>
  );
};

export default Navigation;
