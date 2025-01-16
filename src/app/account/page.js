"use client";
  
import Navbar from "./Navbar";

const UserAccount = () => {
  return (
    <div>
      <Navbar isAccountPage={true} />
      <div className="p-6 bg-white text-black">
        <h1 className="text-2xl font-bold">Your Account</h1>
        <p>Manage your account settings and preferences here.</p>
        <button className="mt-4 px-4 py-2 bg-black text-white rounded">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserAccount;
  