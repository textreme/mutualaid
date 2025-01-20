"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserData } from "@/app/utils/firebase";
import LogoutButton from "@/app/components/LogoutButton";

export default function UserProfile({ params }) {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Unwrap params using useEffect
  useEffect(() => {
    (async () => {
      const resolvedParams = await params;
      setUserId(resolvedParams.userId);
    })();
  }, [params]);

  // Fetch user data after userId is resolved
  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        console.log("Fetching user data for userId:", userId);
        const data = await getUserData(userId);
        if (!data) {
          console.warn("No user data found. Redirecting to home...");
          router.push("/"); // Redirect to home if no data found
        } else {
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/"); // Redirect on error
      }
    };

    fetchUserData();
  }, [userId, router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center min-h-screen justify-center bg-gray-50">
      <h1 className="text-2xl font-bold">Welcome, {user.firstName} {user.lastName}!</h1>
      <p>Email: {user.email}</p>
      <LogoutButton /> {/* Add the logout button */}
    </div>
  );
}
