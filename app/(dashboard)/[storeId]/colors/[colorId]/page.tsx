import prismadb from "@/lib/prismadb";
import { FC } from "react";
import ColorForm from "./colorForm";

interface pageProps {
  params: {
    colorId: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default page;
