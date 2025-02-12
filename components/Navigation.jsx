import { FaGoogle } from "react-icons/fa";
import { signInAction } from "@/actions";
import Link from "next/link";
const Navigation = ({ session }) => {
  return (
    <nav className="md:flex items-center gap-12 text-lg font-medium w-full hidden ">
      <a href="#pricing" className="nav-link">
        Pricing
      </a>
      <a href="#learn" className="nav-link">
        Learn
      </a>
      <form action={signInAction} className="w-full">
        {session ? (
          <button
            className="flex font-semibold items-center gap-2 bg-blue-400 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:shadow-lg ml-auto text-sm"
            href={"/dashboard"}
          >
            <Link href={"/dashboard"}>Dashboard</Link>
          </button>
        ) : (
          <button className="flex font-semibold items-center gap-2 bg-blue-400 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:shadow-lg ml-auto text-sm">
            <FaGoogle size={20} />
            <span className="font-medium">Login with Google</span>
          </button>
        )}
      </form>
    </nav>
  );
};

export default Navigation;
