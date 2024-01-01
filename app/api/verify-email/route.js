import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new NextResponse("Missing data", { status: 400 });
    }

    const existingUser = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return new NextResponse("User not found", { status: 400 });
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email
      );

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );

      return new NextResponse("Forbidden", { status: 403 });
    }

    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Invalid Server", { status: 500 });
  }
}
