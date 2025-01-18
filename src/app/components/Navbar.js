"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; // Navigation helpers
import { useNavBarContext } from "@/app/context/NavBarContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { altText } = useNavBarContext();
  const router = useRouter();
  const pathname = usePathname();
  const [isAccountPage, setIsAccountPage] = useState(false);

  useEffect(() => {
    // Normalize pathname to handle trailing slashes
    const normalizedPath = pathname.replace(/\/$/, ""); // Remove trailing slash
    console.log("Normalized pathname:", normalizedPath);
    setIsAccountPage(normalizedPath === "/account");
  }, [pathname]);

  const handleButtonClick = () => {
    console.log("Button clicked, navigating:", isAccountPage ? "back" : "/account");
    if (isAccountPage) {
      router.back(); // Close user account page
    } else {
      router.push("/account"); // Open user account page
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-inherit text-white w-full fixed top-0 z-10">
      {/* Left: Logo */}
      <Link href="/" className="font-semibold">
        Mutual Aid Live
      </Link>

      {/* Center: Alt Text */}
      <span className="text-center">{altText || ""}</span>

      {/* Right: Rotating Button */}
      <button
        onClick={handleButtonClick}
        className={`text-2xl font-bold transform transition-transform duration-300 ${
          isAccountPage ? "rotate-45" : ""
        }`}
        aria-label={isAccountPage ? "Close Account Page" : "Open Account Page"}
      >
        +
      </button>
    </nav>
  );
};

export default Navbar;
