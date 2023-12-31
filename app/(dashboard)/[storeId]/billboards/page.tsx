import { FC } from "react";
import BillboardClient from "./client";
import prismadb from "@/lib/prismadb";
import { BillboardColumns } from "./columns";
import { format } from "date-fns";

interface billboardsPageProps {
  params: {
    storeId: string;
  };
}

const BillboardsPage: FC<billboardsPageProps> = async ({ params }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumns[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "do MMMM yy HH:mm"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-11 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
