"use client"
import React from "react";
import { useSession } from "../context/SessionContext";

const UserProfile = () => {
  const session = useSession();

  if (!session.loggedIn) {
    return <div>Please log in.</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Welcome, {session.user.name}</p>
      <p>Email: {session.user.email}</p>
    </div>
  );
};

export default UserProfile;