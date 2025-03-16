"use client";

import { formatDate } from "@/lib/date-utils";
import { Tender, TenderStatus } from "@/types";
import { Button } from "./ui/button";
import { TenderStatusBadge } from "./tender-status-badge";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableNew } from "./data-table-new";
import { Eye } from "lucide-react";

interface TendersTableProps {
  tenders: Tender[];
  onViewTender: (tender: Tender) => void;
}

export function TendersTable({ tenders, onViewTender }: TendersTableProps) {
  const columns: ColumnDef<Tender>[] = [
    {
      accessorKey: "number",
      header: "Номер",
      cell: ({ row }) => <div>{row.getValue("number")}</div>,
    },
    {
      accessorKey: "organization",
      header: "Организатор",
      cell: ({ row }) => (
        <div className="min-w-[180px] truncate max-w-[200px]" title={row.getValue("organization") as string}>
          {row.getValue("organization")}
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "Название",
      cell: ({ row }) => {
        const title = row.original.title || "—";

        return (
          <div className="min-w-[180px] truncate max-w-[200px]" title={title}>
            {title}
          </div>
        );
      },
    },
    {
      accessorKey: "publicationDate",
      header: "Дата публикации",
      cell: ({ row }) => (
        <div className="min-w-[120px]">
          {formatDate(row.getValue("publicationDate"))}
        </div>
      ),
    },
    {
      accessorKey: "federalLaw",
      header: "ФЗ",
      cell: ({ row }) => {
        const federalLaw = row.getValue("federalLaw") as string || "—";

        return (
          <div className="min-w-[60px]">
            {federalLaw}
          </div>
        );
      },
    },
    {
      accessorKey: "startPrice",
      header: "НМЦ",
      cell: ({ row }) => {
        const startPrice = row.getValue("startPrice") as number;
        const currency = row.original.currency;

        return (
          <div className="min-w-[100px] font-medium text-right">
            {startPrice === 0 ? "—" : `${startPrice.toLocaleString('ru-RU')} ${currency}`}
          </div>
        );
      },
    },
    {
      accessorKey: "finalPrice",
      header: "Итог. цена",
      cell: ({ row }) => {
        const finalPrice = row.original.finalPrice;
        const currency = row.original.currency;

        return (
          <div className="min-w-[100px] text-right">
            {finalPrice ? `${finalPrice.toLocaleString('ru-RU')} ${currency}` : "—"}
          </div>
        );
      },
    },
    {
      accessorKey: "etp",
      header: "ЭТП",
      cell: ({ row }) => {
        const etp = row.original.etp || "—";

        return (
          <div className="min-w-[80px]">
            {etp}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Статус",
      cell: ({ row }) => {
        const status = row.getValue("status") as TenderStatus;

        return (
          <div className="min-w-[100px]">
            <TenderStatusBadge status={status} />
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Действия",
      cell: ({ row }) => {
        const tender = row.original;

        return (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onViewTender(tender)}
              title="Просмотр деталей"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <DataTableNew
      columns={columns}
      data={tenders}
      searchable={true}
      searchColumn="number"
    />
  );
}
