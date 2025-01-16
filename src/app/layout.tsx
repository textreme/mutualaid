import { NavBarProvider } from "@/app/context/NavBarContext";
import Navbar from "@/app/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NavBarProvider>
        <body className="min-h-screen">
          <Navbar /> {/* Global Navbar */}
          {children} {/* Render the page content */}
        </body>
      </NavBarProvider>
    </html>
  );
}
