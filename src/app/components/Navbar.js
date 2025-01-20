"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNavBarContext } from "@/app/context/NavBarContext";
import { auth } from "@/app/utils/firebase";

const Navbar = () => {
  const { altText, isAccountPage } = useNavBarContext();
  const router = useRouter();

  const handleButtonClick = async () => {
    const currentUser = auth.currentUser;

    if (isAccountPage) {
      router.push("/"); // Navigate to homepage
    } else if (currentUser && !currentUser.isAnonymous) {
      router.push(`/account/${currentUser.uid}`); // Redirect to profile page
    } else {
      router.push("/account"); // Redirect to account creation
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-inherit text-white w-full fixed top-0 z-10">
      <Link href="/" className="font-semibold">
        Mutual Aid Live
      </Link>
      <span className="text-center">{altText || ""}</span>
      <button
        onClick={handleButtonClick}
        className={`text-2xl font-bold transform transition-transform duration-300 ${
          isAccountPage ? "rotate-45" : ""
        }`}
        aria-label={isAccountPage ? "Close Account Page" : "Open Account Page"}
      >
        +
      </button>
    </nav>
  );
};

export default Navbar;
