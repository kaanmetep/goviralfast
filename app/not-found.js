import { Rocket } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-100">
      <div className="w-full max-w-md px-4">
        {/* Logo */}
        <div className="flex items-center justify-center gap-1 mb-8">
          <Rocket
            className="fill-yellow-200 size-8 sm:size-10 md:size-12"
            aria-hidden="true"
          />

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-800">
            GoViralFast
          </h1>
        </div>

        {/* 404 content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8 text-center">
          <h2 className="text-6xl font-bold text-yellow-500 mb-4">404</h2>
          <p className="text-xl font-medium text-yellow-800 mb-6">
            Page Not Found
          </p>
          <p className="text-yellow-700 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>

          <Link href="/">
            <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-full transition-colors duration-300 flex items-center gap-2 mx-auto">
              <Rocket className="size-5" />
              <span>Return to Home</span>
            </button>
          </Link>
        </div>

        {/* Flying rockets decoration */}
        <div className="absolute top-16 left-10 opacity-20">
          <Rocket className="fill-yellow-300 size-16 rotate-45" />
        </div>
        <div className="absolute bottom-20 right-12 opacity-20">
          <Rocket className="fill-yellow-300 size-14 -rotate-12" />
        </div>
      </div>
    </div>
  );
}
