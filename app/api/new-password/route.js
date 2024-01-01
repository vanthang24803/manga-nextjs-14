import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getPasswordResetTokenByToken } from "@/lib/password-reset-token";

export async function PATCH(req) {
  try {
    const { password, token } = await req.json();

    if (!password || !token) {
      return new NextResponse("Missing data", { status: 400 });
    }

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
      return { error: "Invalid token!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { error: "Token has expired!" };
    }

    const existingUser = await db.user.findUnique({
      where: {
        email: existingToken.email,
      },
    });

    if (!existingUser) {
      return new NextResponse("Email not found", { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return NextResponse.json("Password updated!", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Invalid Server", { status: 500 });
  }
}
