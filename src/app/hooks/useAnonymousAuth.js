import { signInAnonymously } from "firebase/auth";
import { auth } from "@/app/utils/firebase";

let isAuthenticating = false;

export const useAnonymousAuth = async () => {
  if (isAuthenticating) {
    console.log("Authentication is already in progress. Skipping...");
    return;
  }

  isAuthenticating = true;
  try {
    if (!auth.currentUser) {
      console.log("No user session found. Creating an anonymous session...");
      await signInAnonymously(auth);
      console.log("Anonymous user signed in:", auth.currentUser);
    } else {
      console.log("User session already exists:", auth.currentUser);
    }
  } catch (error) {
    console.error("Error during anonymous authentication:", error);
  } finally {
    isAuthenticating = false;
  }
};
