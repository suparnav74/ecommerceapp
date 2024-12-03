"use client"
import React, { createContext, useContext, useState } from "react";
import dummydata from "@/lib/dummydata";

interface Session {
    user: { id: number; name: string; email: string; role: string };
    loggedIn: boolean;
}

const SessionContext = createContext<Session | undefined>(undefined);

export const SessionProvider = ({children}:{children :React.ReactNode}) => {
  const [session, setSession] = useState(dummydata);

  return (
   <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
  )
}

export const useSession = () => useContext(SessionContext)
