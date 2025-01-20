"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, getUserData } from "@/app/utils/firebase";
import LinkGoogleButton from "@/app/components/LinkGoogleButton";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const handleNavigation = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        try {
          const userData = await getUserData(currentUser.uid);
          if (userData) {
            router.push(`/account/${currentUser.uid}`); // Skip to profile page
          } else {
            // Let them proceed to complete their account setup
            console.warn("No user data found. Waiting for user to proceed...");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("No authenticated user. Staying on /account.");
      }
    };

    handleNavigation();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to Account</h1>
      <p className="text-lg mb-6">Sign in with Google to upgrade your account.</p>
      <LinkGoogleButton /> {/* Show Google sign-in button */}
    </div>
  );
}
