import Button from "./Button";
const Navigation = ({ session }) => {
  return (
    <nav className="md:flex items-center gap-12 text-lg font-medium w-full hidden ">
      <a href="#pricing" className="nav-link">
        Pricing
      </a>
      <a href="#learn" className="nav-link">
        Learn
      </a>
      <div className="w-full flex justify-end ">
        <Button logo={false}>{session ? "Dashboard" : "Login"}</Button>
      </div>
    </nav>
  );
};

export default Navigation;
