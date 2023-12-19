import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import "../(main)/globals.css";
import { redirect } from "next/navigation";
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

export default async function AuthLayout({ children }) {
  const currentUser = await getServerSession(authOptions);
  if (currentUser) {
    redirect("/");
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-full flex items-center justify-center bg-[url('https://images5.alphacoders.com/133/1339874.png')] bg-no-repeat bg-center bg-cover">
          {children}
        </main>
      </body>
    </html>
  );
}
