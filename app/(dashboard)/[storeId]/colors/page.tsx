import { FC } from "react";
import ColorClient from "./client";
import prismadb from "@/lib/prismadb";
import { ColorColumns } from "./columns";
import { format } from "date-fns";

interface colorsPageProps {
  params: {
    storeId: string;
  };
}

const ColorPage: FC<colorsPageProps> = async ({ params }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumns[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "do MMMM yy HH:mm"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-11 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorPage;
