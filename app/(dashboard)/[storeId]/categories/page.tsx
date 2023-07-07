import { FC } from "react";
import CategoriesClient from "./client";
import prismadb from "@/lib/prismadb";
import { CategorieColumns } from "./columns";
import { format } from "date-fns";

interface categoriesPageProps {
  params: {
    storeId: string;
  };
}

const CategoriesPage: FC<categoriesPageProps> = async ({ params }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategorieColumns[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "do MMMM yy HH:mm"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-11 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
