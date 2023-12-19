import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

import { Navbar } from "@/components/navbar";
import { Noti } from "@/components/noti";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.png",
      href: "/logo.png",
    },
  ],
};

export default async function RootLayout({ children }) {
  const currentUser = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar currentUser={currentUser} />
        <main className="my-14 md:max-w-screen-lg mx-auto">
          <Noti />  
          <>{children}</>
        </main>
      </body>
    </html>
  );
}
