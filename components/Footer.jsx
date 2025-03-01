import { Rocket } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="size-6 fill-yellow-200" />
              <h1 className="text-lg font-bold text-gray-800">GoViralFast</h1>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Create and Share viral videos in minutes, not hours
            </p>
            <p className="text-xs font-medium text-gray-500">
              Copyright © {new Date().getFullYear()} - All rights reserved
            </p>
          </div>

          {/* Links section */}
          <div>
            <h3 className="text-gray-800 font-bold text-sm mb-4 uppercase tracking-wider">
              Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 text-sm hover:text-blue-600 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-600 text-sm hover:text-blue-600 transition-colors duration-200"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal section */}
          <div>
            <h3 className="text-gray-800 font-bold text-sm mb-4 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/tos"
                  className="text-gray-600 text-sm hover:text-blue-600 transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-600 text-sm hover:text-blue-600 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact section */}
          <div>
            <h3 className="text-gray-800 font-bold text-sm mb-4 uppercase tracking-wider">
              Contact
            </h3>
            <a
              href="mailto:kaanpmete@gmail.com"
              className="text-blue-600 text-sm hover:text-blue-800 transition-colors duration-200 inline-block mb-2"
            >
              Contact via e-mail
            </a>
            <p className="text-gray-500 text-xs">
              I'll get back to you within 24 hours!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
