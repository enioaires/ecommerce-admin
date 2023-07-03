import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!body.name) {
      return new NextResponse("Missing name", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name: body.name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}
