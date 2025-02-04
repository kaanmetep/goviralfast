import { Rocket } from "lucide-react";
const Footer = () => {
  return (
    <footer className="mt-12 pt-8 border-t border-black p-4">
      <div className="flex flex-col gap-1 items-center">
        <div className="flex items-center justify-center gap-1 ">
          <Rocket className="fill-yellow-200 size-5 " />
          <h1 className=" font-semibold">GoViralFast</h1>
        </div>
        <p className="text-sm  text-gray-700">
          Create and Share viral videos in minutes, not hours
        </p>
        <p className="text-sm font-semibold">
          Copyright © {new Date().getFullYear()} - All rights reserved
        </p>
        <a
          href="mailto:kaanpmete@gmail.com"
          className="text-blue-500 underline text-sm"
        >
          Contact via e-mail
        </a>
      </div>
    </footer>
  );
};

export default Footer;
