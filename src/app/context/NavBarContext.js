"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const NavBarContext = createContext();

export const NavBarProvider = ({ children }) => {
  const [altText, setAltText] = useState("");
  const [lastPage, setLastPage] = useState(null);
  const [isAccountPage, setIsAccountPage] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const normalizedPath = pathname.replace(/\/$/, ""); // Remove trailing slash
    const isAccount = normalizedPath.startsWith("/account");

    setIsAccountPage(isAccount);

    // Update lastPage only for non-account pages
    if (!isAccount) {
      setLastPage(normalizedPath);
    }
  }, [pathname]);

  return (
    <NavBarContext.Provider
      value={{ altText, setAltText, lastPage, isAccountPage }}
    >
      {children}
    </NavBarContext.Provider>
  );
};

export const useNavBarContext = () => useContext(NavBarContext);
