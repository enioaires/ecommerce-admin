import { FC } from "react";
import SizeClient from "./client";
import prismadb from "@/lib/prismadb";
import { SizeColumns } from "./columns";
import { format } from "date-fns";

interface sizesPageProps {
  params: {
    storeId: string;
  };
}

const SizePage: FC<sizesPageProps> = async ({ params }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumns[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "do MMMM yy HH:mm"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-11 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizePage;
