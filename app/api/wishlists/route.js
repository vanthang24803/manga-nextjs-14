import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { name, thumbnail, views, href } = await req.json();

    if (!name || !thumbnail || !views || !href) {
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

    const item = await db.wishlist.findFirst({
      where: {
        name,
        userId: currentUser.user.email,
      },
    });

    if (item) {
      return NextResponse.json("Wishlist created");
    }

    const newItem = await db.wishlist.create({
      data: {
        userId: currentUser.user.email,
        name,
        thumbnail,
        views,
        href,
      },
    });

    return NextResponse.json(newItem, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Invalid Server", { status: 500 });
  }
}

export async function GET(req) {
  try {
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

    const items = await db.wishlist.findMany({
      where: {
        userId: currentUser.user.email,
      },
    });

    if (!items) {
      return new NextResponse("Manga not found ", { status: 404 });
    }

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Invalid Server", { status: 500 });
  }
}

