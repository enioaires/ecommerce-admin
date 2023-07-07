import prismadb from "@/lib/prismadb";
import { FC } from "react";
import CategoryForm from "./categoryForm";

interface pageProps {
  params: {
    categoryId: string;
    storeId: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
};

export default page;