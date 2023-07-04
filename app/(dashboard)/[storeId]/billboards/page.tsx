import { FC } from "react";
import BillboardClient from "./client";

interface billboardsPageProps {}

const billboardsPage: FC<billboardsPageProps> = ({}) => {
  return (
    <div className="flex-col">
      <div className="flex-11 space-y-4 p-8 pt-6">
        <BillboardClient />
      </div>
    </div>
  );
};

export default billboardsPage;
