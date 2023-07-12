import prismadb from "@/lib/prismadb";
import { corsHeaders } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const billboardId = params.billboardId;

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!label || !imageUrl) {
      return new NextResponse("Missing data", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Missing billboardId", { status: 400 });
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

    const updatedBillboard = await prismadb.billboard.updateMany({
      where: {
        id: billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(updatedBillboard);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const billboardId = params.billboardId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!billboardId) {
      return new NextResponse("Missing billboardId", { status: 400 });
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

    const deletedBillboard = await prismadb.billboard.deleteMany({
      where: {
        id: billboardId,
      },
    });

    return NextResponse.json(deletedBillboard);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const billboardId = params.billboardId;

    if (!billboardId) {
      return new NextResponse("Missing billboardId", { status: 400 });
    }

    const deletedBillboard = await prismadb.billboard.findUnique({
      where: {
        id: billboardId,
      },
    });

    return NextResponse.json(deletedBillboard, { headers: corsHeaders });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}
