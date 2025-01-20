"use client";

import { NavBarProvider } from "@/app/context/NavBarContext";
import Navbar from "@/app/components/Navbar";
import { useAnonymousAuth } from "@/app/hooks/useAnonymousAuth"; // Correct import for named export
import AuthRedirectHandler from "@/app/components/AuthRedirectHandler";
import { useEffect, ReactNode } from "react";
import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await useAnonymousAuth(); // Call the named export
      } catch (error) {
        console.error("Failed to initialize anonymous authentication:", error);
      }
    };

    initializeAuth();
  }, []);

  return (
    <html lang="en">
      <body className="min-h-screen">
        <NavBarProvider>
          <Navbar />
          <AuthRedirectHandler />
          {children}
        </NavBarProvider>
      </body>
    </html>
  );
}
