import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { sizeId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const sizeId = params.sizeId;

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name || !value) {
      return new NextResponse("Missing data", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Missing sizeId", { status: 400 });
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

    const updatedSize = await prismadb.size.updateMany({
      where: {
        id: sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(updatedSize);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { sizeId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const sizeId = params.sizeId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!sizeId) {
      return new NextResponse("Missing sizeId", { status: 400 });
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

    const deletedSize = await prismadb.size.deleteMany({
      where: {
        id: sizeId,
      },
    });

    return NextResponse.json(deletedSize);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    const sizeId = params.sizeId;

    if (!sizeId) {
      return new NextResponse("Missing sizeId", { status: 400 });
    }

    const deletedSize = await prismadb.size.findUnique({
      where: {
        id: sizeId,
      },
    });

    return NextResponse.json(deletedSize);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}
