import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(req, { params }) {
  try {
    if (!params.mangaId) {
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
        name: params.mangaId,
        userId: currentUser.user.email,
      },
    });

    if (!item) {
      return new NextResponse("Manga not found ", { status: 404 });
    }

    await db.wishlist.delete({
      where: {
        id: item.id,
        name: params.mangaId,
        userId: currentUser.user.email,
      },
    });

    return NextResponse.json("Delete manga successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Invalid Server", { status: 500 });
  }
}
