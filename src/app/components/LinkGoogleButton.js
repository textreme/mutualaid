"use client";

import { googleProvider, auth, saveUserData, getUserData } from "@/app/utils/firebase";
import { signInWithPopup, linkWithPopup, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useRouter } from "next/navigation";

function LinkGoogleButton() {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      console.log("Starting Google sign-in process...");
      let result;
      let userId;

      if (auth.currentUser?.isAnonymous) {
        console.log("Current user is anonymous. Linking with Google...");
        try {
          result = await linkWithPopup(auth.currentUser, googleProvider);
        } catch (error) {
          if (error.code === "auth/credential-already-in-use") {
            console.warn("Google credential already in use. Signing in...");
            const credential = GoogleAuthProvider.credentialFromError(error);
            result = await signInWithCredential(auth, credential);
          } else {
            throw error;
          }
        }
      } else {
        result = await signInWithPopup(auth, googleProvider);
      }

      const { uid, email, displayName } = result.user;
      userId = uid;

      // Check for existing Firestore data
      const userData = await getUserData(userId);
      if (!userData) {
        console.log("No user data found. Redirecting to account form...");
        router.push(`/account/accountform?email=${email}&userId=${userId}`);
      } else {
        console.log("User data found. Redirecting to profile...");
        router.push(`/account/${userId}`);
      }
    } catch (error) {
      console.error("Google sign-in or linking error:", error);
    }
  };

  return (
    <button onClick={handleSignIn} className="bg-blue-500 text-white py-2 px-4 rounded">
      Sign in with Google
    </button>
  );
}

export default LinkGoogleButton;
