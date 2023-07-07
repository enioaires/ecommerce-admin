"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cellAction";

export type CategorieColumns = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CategorieColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardLabel",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel,
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
