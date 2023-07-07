import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { colorId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const colorId = params.colorId;

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name || !value) {
      return new NextResponse("Missing data", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Missing colorId", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const updatedColor = await prismadb.color.updateMany({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(updatedColor);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { colorId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const colorId = params.colorId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!colorId) {
      return new NextResponse("Missing colorId", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const deletedColor = await prismadb.color.deleteMany({
      where: {
        id: colorId,
      },
    });

    return NextResponse.json(deletedColor);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    const colorId = params.colorId;

    if (!colorId) {
      return new NextResponse("Missing colorId", { status: 400 });
    }

    const deletedColor = await prismadb.color.findUnique({
      where: {
        id: colorId,
      },
    });

    return NextResponse.json(deletedColor);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}
