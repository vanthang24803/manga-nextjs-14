import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";


export async function POST(req) {
  try {
    const body = await req.json();

    if (!body) {
      return new NextResponse("Missing data", { status: 400 });
    }

    const { firstName, lastName, email, password } = body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword, // Store the hashed password
      },
    });

    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
