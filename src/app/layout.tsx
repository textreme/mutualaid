"use client";

import { NavBarProvider } from "@/app/context/NavBarContext";
import Navbar from "@/app/components/Navbar";
import { useAnonymousAuth } from "@/app/hooks/useAnonymousAuth";
import AuthRedirectHandler from "@/app/components/AuthRedirectHandler"; // Import the handler
import { useEffect, ReactNode } from "react";
import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { authenticate } = useAnonymousAuth();

  useEffect(() => {
    authenticate(); // Ensure anonymous authentication
  }, [authenticate]);

  return (
    <html lang="en">
      <body className="min-h-screen">
        <NavBarProvider>
          <Navbar />
          <AuthRedirectHandler /> {/* Handle redirect results */}
          {children}
        </NavBarProvider>
      </body>
    </html>
  );
}
