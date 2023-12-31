import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Panel } from "./_components/panel";
import { getServerSession } from "next-auth";
import { Navigation } from "./_components/navigation";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function generateMetadata() {
  const currentUser = await getServerSession(authOptions);

  if (!currentUser) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: {
      email: currentUser.user.email,
    },
  });

  return {
    title: user.name || "MangaDex",
  };
}

export default async function Profile() {
  const currentUser = await getServerSession(authOptions);

  if (!currentUser) {
    redirect("/");
  }

  const user = await db.user.findUnique({
    where: {
      email: currentUser.user.email,
    },
  });

  return (
    <div className="flex flex-col space-y-4 md:space-y-6 pb-4">
      <Panel data={user} />
      <Separator />
      <Navigation data={user} />
    </div>
  );
}
