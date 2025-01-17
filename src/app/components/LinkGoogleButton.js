import { googleProvider, auth } from "@/app/utils/firebase";
import { signInWithPopup } from "firebase/auth";

function LinkGoogleButton() {
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google sign-in successful:", result.user);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <button onClick={handleSignIn} className="btn btn-google">
      Sign in with Google
    </button>
  );
}

export default LinkGoogleButton;
