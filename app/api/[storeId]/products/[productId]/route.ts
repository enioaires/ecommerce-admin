import prismadb from "@/lib/prismadb";
import { corsHeaders } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const productId = params.productId;

    const {
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      stockSize,
      isFeatured,
      isArchived,
      images,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !name ||
      !price ||
      !categoryId ||
      !sizeId ||
      !colorId ||
      !stockSize ||
      !images ||
      !images.length
    ) {
      return new NextResponse("Missing data", { status: 400 });
    }

    if (!productId) {
      return new NextResponse("Missing productId", { status: 400 });
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

    await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        stock: stockSize,
        isFeatured,
        isArchived,
        images: {
          deleteMany: {},
        },
        storeId: params.storeId,
      },
    });

    const updatedProduct = await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: images.map((image: { url: string }) => image),
          },
        },
      },
    });

    if (stockSize === 0) {
      await prismadb.product.update({
        where: {
          id: productId,
        },
        data: {
          isArchived: true,
        },
      });
    }

    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { productId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const productId = params.productId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!productId) {
      return new NextResponse("Missing productId", { status: 400 });
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

    const deletedProduct = await prismadb.product.deleteMany({
      where: {
        id: productId,
      },
    });

    return NextResponse.json(deletedProduct);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const productId = params.productId;

    if (!productId) {
      return new NextResponse("Missing productId", { status: 400 });
    }

    const deletedProduct = await prismadb.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(deletedProduct, { headers: corsHeaders });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}
