"use client";

import { useEffect } from "react";
import { auth } from "@/app/utils/firebase";
import { getRedirectResult } from "firebase/auth";

const AuthRedirectHandler = () => {
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        console.log("Checking redirect result...");
        const result = await getRedirectResult(auth);
        if (result) {
          console.log("Redirect result available:", result);
          console.log("Google account linked successfully:", result.user);
          console.log("Provider data:", result.user.providerData);
        } else {
          console.log("No redirect result available.");
        }
      } catch (error) {
        console.error("Error handling redirect:", error.message);
      }
    };

    handleRedirect();
  }, []);

  return null; // No visual rendering needed
};

export default AuthRedirectHandler;
