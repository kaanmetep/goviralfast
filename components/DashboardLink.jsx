"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardLink = ({ href = "", children }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={` flex items-center gap-1 p-2 rounded-md ${
        pathname === href ? "bg-gray-100 transition-all delay-[50ms]" : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default DashboardLink;
