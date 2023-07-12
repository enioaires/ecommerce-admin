import prismadb from "@/lib/prismadb";
import { corsHeaders } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const categoryId = params.categoryId;

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name || !billboardId) {
      return new NextResponse("Missing data", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Missing categoryId", { status: 400 });
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

    const updatedCategory = await prismadb.category.updateMany({
      where: {
        id: categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const categoryId = params.categoryId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!categoryId) {
      return new NextResponse("Missing categoryId", { status: 400 });
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

    const deletedCategory = await prismadb.category.deleteMany({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json(deletedCategory);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const categoryId = params.categoryId;

    if (!categoryId) {
      return new NextResponse("Missing categoryId", { status: 400 });
    }

    const deletedCategory = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(deletedCategory, { headers: corsHeaders });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}
