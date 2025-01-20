"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { saveUserData } from "@/app/utils/firebase";

export default function AccountForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const userId = searchParams.get("userId");
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (!email || !userId) {
      console.error("Missing email or userId in query parameters.");
      router.push("/"); // Redirect to homepage if parameters are missing
    }
  }, [email, userId, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Saving user data:", { firstName, lastName, email });
      await saveUserData(userId, { firstName, lastName, email });
      console.log("User data saved successfully.");
      router.push(`/account/${userId}`);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 shadow-md rounded">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Save
        </button>
      </form>
    </div>
  );
}
