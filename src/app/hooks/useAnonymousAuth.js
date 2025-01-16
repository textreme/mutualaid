import { auth } from "@/app/utils/firebase"; // Ensure this path matches your file structure
import { signInAnonymously } from "firebase/auth";

export const useAnonymousAuth = () => {
  const authenticate = async () => {
    console.log("Starting anonymous authentication"); // Debug log
    try {
      const userCredential = await signInAnonymously(auth);
      console.log("Anonymous user signed in:", userCredential.user); // Success log
    } catch (error) {
      console.error("Error during anonymous sign-in:", error); // Error log
    }
  };

  return { authenticate };
};
