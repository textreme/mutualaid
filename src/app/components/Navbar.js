"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isAccountPageOpen, setIsAccountPageOpen] = useState(false);

  const toggleAccountPage = () => {
    setIsAccountPageOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 text-white w-full fixed top-0 z-10">
        {/* Logo */}
        <Link href="/" className="text-l font-semibold">
          Mutual Aid Live
        </Link>

        <span className="text-l">CA Wildfires</span>

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
              +
            </button>
          </div>

          {/* Content */}
          <div className="p-4 flex-grow">
            <h1 className="text-2xl font-bold">Your Account</h1>
            <p>Manage your account settings and preferences here.</p>
            <button className="mt-4 px-4 py-2 bg-black text-white rounded">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
