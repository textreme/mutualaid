import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveUserData } from "@/app/utils/firebase";

export default function AccountForm({ searchParams }) {
  const { email, userId } = searchParams;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveUserData(userId, { firstName, lastName, email });
    router.push(`/account/${userId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
      <button type="submit">Save</button>
    </form>
  );
}
