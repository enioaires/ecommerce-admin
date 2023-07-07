"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cellAction";

export type SizeColumns = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<SizeColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Valor",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    header: "Actions",
    id: "action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
