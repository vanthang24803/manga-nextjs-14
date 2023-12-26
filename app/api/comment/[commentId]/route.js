import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";


export async function PATCH(req, { params }) {
  try {
    if (!params.commentId) {
      return new NextResponse("Missing params", { status: 400 });
    }

    const { content } = await req.json();

    if (!content) {
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

    const updateComment = await db.comment.update({
      where: {
        id: params.commentId,
        userId: currentUser.user.email,
      },
      data: {
        content,
      },
    });

    return NextResponse.json(updateComment, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Invalid Server", { status: 200 });
  }
}

export async function DELETE(req, { params }) {
  try {
    if (!params.commentId) {
      return new NextResponse("Missing params", { status: 400 });
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

    const comment = await db.comment.findUnique({
      where: {
        userId: currentUser.user.email,
        id: params.commentId,
      },
    });

    if (!comment) {
      return new NextResponse("Comment not found", { status: 400 });
    }

    await db.comment.delete({
      where: {
        userId: currentUser.user.email,
        id: params.commentId,
      },
    });

    return NextResponse.json("Comment deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Invalid Server", { status: 200 });
  }
}
