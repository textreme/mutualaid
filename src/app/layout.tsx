"use client";

import { NavBarProvider } from "@/app/context/NavBarContext";
import Navbar from "@/app/components/Navbar";
import { useAnonymousAuth } from "@/app/hooks/useAnonymousAuth";
import { useEffect } from "react";
import "./globals.css";

export default function RootLayout({ children }) {
  const { authenticate } = useAnonymousAuth();

  useEffect(() => {
    authenticate(); // Ensure anonymous authentication
  }, [authenticate]);

  return (
    <html lang="en">
      <body className="min-h-screen">
        <NavBarProvider>
          <Navbar />
          {children}
        </NavBarProvider>
      </body>
    </html>
  );
}
