"use client";
import { FC } from "react";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumns, columns } from "./columns";
import { DataTable } from "@/components/ui/dataTable";

interface clientProps {
  data: OrderColumns[];
}

const Client: FC<clientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store."
      />
      <Separator />
      <DataTable data={data} columns={columns} searchKey="products" />
    </>
  );
};

export default Client;
