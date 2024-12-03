
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { validateRequest } from "@/lib/auth";
//import { SessionProvider } from "./providers/sessionProvider";
import { SessionProvider } from "./context/SessionContext";
import UserProfile from "./Profile/UserProfile";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

 const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const sessionData = await validateRequest();
  // console.log(sessionData);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <SessionProvider value={sessionData}>
        {children}
        </SessionProvider> */}

        <SessionProvider>
        <div>
        <h1>Welcome</h1>
        <UserProfile />
        </div>
        </SessionProvider>
      </body>
    </html>
  );
}
