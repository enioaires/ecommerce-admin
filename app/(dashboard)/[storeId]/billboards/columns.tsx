"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cellAction";

export type BillboardColumns = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumns>[] = [
  {
    accessorKey: "label",
    header: "Label",
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
