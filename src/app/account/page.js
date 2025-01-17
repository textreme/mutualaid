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
    <div className="min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-bold">User Account</h1>
      <p className="mt-4">
        Welcome to your account page. Here you can manage your settings and preferences.
      </p>
      <p className="mt-2">
        Additional text on this page will also be styled as black, ensuring readability.
      </p>
      <ul className="mt-4 list-disc list-inside">
        <li>Manage your profile</li>
        <li>Update account settings</li>
        <li>View recent activity</li>
      </ul>
      <LinkGoogleButton />
    </div>
  );
}
