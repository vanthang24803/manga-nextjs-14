import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req) {
  try {
    const { email, firstName, lastName } = await req.json();

    if (!email || !firstName || !lastName) {
      return new NextResponse("Missing data", { status: 400 });
    }

    const currentUser = await getServerSession(authOptions);

    if (!currentUser) {
      return new NextResponse("Authorization", { status: 401 });
    }

    const user = await db.user.findUnique({
      where: {
        email: currentUser.user.email,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const updateUser = await db.user.update({
      where: {
        email: currentUser.user.email,
      },
      data: {
        email,
        name : `${firstName} ${lastName}`,
        firstName,
        lastName,
      },
    });

    return NextResponse.json(updateUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Invalid Server", { status: 500 });
  }
}
