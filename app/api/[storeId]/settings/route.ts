import prismadb from "@/lib/prismadb";
import { corsHeaders } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeName = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
      select: {
        name: true,
      },
    })

    return NextResponse.json(storeName, { headers: corsHeaders });
  } catch (error) {
    console.log("[SETTINGS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}