import { Rocket } from "lucide-react";

const Navigation = ({ session, handleLoginOrDashboardClick }) => {
  return (
    <nav className="sm:flex items-center gap-12 text-lg font-medium w-full hidden">
      <a href="#pricing" className="nav-link">
        Pricing
      </a>
      <a href="#learn" className="nav-link">
        Learn
      </a>
      <div className="w-full flex justify-end">
        <button
          className="button flex items-center justify-center"
          onClick={handleLoginOrDashboardClick}
        >
          {!!session || <Rocket fill="black" />}
          {session ? "Dashboard" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
