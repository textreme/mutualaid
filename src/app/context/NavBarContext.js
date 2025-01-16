"use client";
import { createContext, useContext, useState } from "react";

const NavBarContext = createContext();

export const NavBarProvider = ({ children }) => {
  const [altText, setAltText] = useState("");

  return (
    <NavBarContext.Provider value={{ altText, setAltText }}>
      {children}
    </NavBarContext.Provider>
  );
};

export const useNavBarContext = () => useContext(NavBarContext);
