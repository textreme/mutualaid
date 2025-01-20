"use client";

import { useEffect } from "react";
import { auth, saveUserData } from "@/app/utils/firebase";
import { getRedirectResult } from "firebase/auth";

const AuthRedirectHandler = () => {
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        console.log("Checking redirect result...");
        const result = await getRedirectResult(auth);

        if (result) {
          const { user } = result;
          console.log("Redirect result available:", result);
          console.log("Google account linked successfully:", user);

          // Extract user info
          const { uid, email, displayName } = user;
          const [firstName, lastName] = displayName
            ? displayName.split(" ")
            : [null, null];

          // Save user data to Firestore
          if (email) {
            await saveUserData(uid, {
              firstName,
              lastName,
              email,
              createdAt: new Date().toISOString(),
            });
            console.log("User data saved after redirect.");
          } else {
            console.warn("Email missing from Google account.");
          }
        } else {
          console.log("No redirect result available.");
        }
      } catch (error) {
        console.error("Error handling redirect:", error.message);
      }
    };

    handleRedirect();
  }, []);

  return null;
};

export default AuthRedirectHandler;
