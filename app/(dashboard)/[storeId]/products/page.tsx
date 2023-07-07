import { FC } from "react";
import ProductClient from "./client";
import prismadb from "@/lib/prismadb";
import { ProductColumn } from "./columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

interface billboardsPageProps {
  params: {
    storeId: string;
  };
}

const ProductsPage: FC<billboardsPageProps> = async ({ params }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "do MMMM yy HH:mm"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-11 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
