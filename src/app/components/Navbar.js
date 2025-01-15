"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isAccountPageOpen, setIsAccountPageOpen] = useState(false);

  const toggleAccountPage = () => {
    console.log("Button clicked!"); // Log the button click
    setIsAccountPageOpen((prev) => {
      console.log("Previous state:", prev); // Log the previous state
      return !prev;
    });
  };
  

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 pl-24 pr-24">
        {/* Logo */}
        <Link href="/" className="font-semibold">
          Mutual Aid Live
        </Link>

        {/* Toggle Button */}
        <button
          onClick={toggleAccountPage}
          className={`text-2xl font-bold transform transition-transform duration-300 ${
            isAccountPageOpen ? "rotate-45" : ""
          }`}
          aria-label={isAccountPageOpen ? "Close Account Page" : "Open Account Page"}
        >
          +
        </button>
      </nav>

      {/* Account Page */}
      <div
        className={`fixed inset-0 z-50 bg-white text-black transform transition-transform duration-500 ${
          isAccountPageOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">User Account</h2>
            <button
              onClick={toggleAccountPage}
              className="text-black text-2xl transform hover:text-gray-700 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-4 flex-grow">
            <p>Welcome to your account page!</p>
            {/* Add more account-related content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
