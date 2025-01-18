"use client";

import { useEffect } from "react";
import { useNavBarContext } from "@/app/context/NavBarContext";
import LinkGoogleButton from "@/app/components/LinkGoogleButton";

export default function UserAccount() {
  const { setAltText } = useNavBarContext();

  useEffect(() => {
    setAltText("User Account");
    return () => setAltText("");
  }, [setAltText]);

  return (
<div className="flex items-center justify-center min-h-screen bg-white text-black p-6">
  <div className="text-center">
    <h1 className="text-3xl font-bold mb-6">Create Account</h1>
    <LinkGoogleButton />
  </div>
</div>

  );
}
