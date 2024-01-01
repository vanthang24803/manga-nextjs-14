import { db } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";
import {
  generatePasswordResetToken,
} from "@/lib/tokens";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new NextResponse("Missing data", { status: 400 });
    }

    const exitingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!exitingUser) {
      return new NextResponse("Email not found", { status: 404 });
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );

    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Invalid Server", { status: 500 });
  }
}
