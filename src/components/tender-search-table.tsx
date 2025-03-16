"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react";

interface TenderItem {
  id: string;
  number: string;
  title: string;
  type: string;
  status: string;
  date: string;
  endDate: string;
  region: string;
  price: number;
  currency: string;
  organization: string;
  details?: string;
  customer?: string;
  specialist?: string;
  contactInfo?: string;
  nmck?: string;
  law?: string;
  platform?: string;
  link?: string;
  noticeNumber?: string;
  category?: string;
  implementationPlace?: string;
  conditions?: string;
}

interface TenderSearchTableProps {
  data: TenderItem[];
  onViewTender: (tender: TenderItem) => void;
}

export function TenderSearchTable({ data, onViewTender }: TenderSearchTableProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU');
  };

  const columns: ColumnDef<TenderItem>[] = [
    {
      id: "tender",
      header: () => <div className="w-[16rem]">Закупка</div>,
      cell: ({ row }) => {
        const tender = row.original;
        return (
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-1 rounded text-[10px]">
                  {tender.type}
                </span>
                <span>{tender.date}</span>
                <span>{tender.number}</span>
              </div>
              <div
                className="font-medium text-sm hover:text-primary cursor-pointer mb-1"
                onClick={() => onViewTender(tender)}
              >
                {tender.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {tender.endDate}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      id: "region",
      header: () => <div className="text-right">Регион</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right text-sm">{row.original.region}</div>
        );
      },
    },
    {
      id: "price",
      header: () => <div className="text-right w-[8rem]">Цена</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right font-semibold text-sm">
            {formatPrice(row.original.price)} {row.original.currency}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="w-[3rem]"></div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onViewTender(row.original)}
              title="Просмотр деталей"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border dark:border-slate-800 elevation-1 overflow-hidden">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-muted/50">
            <TableRow>
              {table.getHeaderGroups().map((headerGroup) => (
                headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-sm font-semibold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="group hover:bg-muted/50 border-t border-border"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-4">
                  Нет тендеров, соответствующих выбранным фильтрам
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-2">
        <div className="text-sm text-muted-foreground">
          Показано{" "}
          <strong>
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
          </strong>{" "}
          - {" "}
          <strong>
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}
          </strong>{" "}
          из <strong>{table.getFilteredRowModel().rows.length}</strong> записей
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex border-accent/30 hover:bg-accent/10"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">На первую страницу</span>
            <ChevronsLeft className="h-4 w-4 text-accent" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 border-accent/30 hover:bg-accent/10"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">На предыдущую страницу</span>
            <ChevronLeft className="h-4 w-4 text-accent" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 border-accent/30 hover:bg-accent/10"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">На следующую страницу</span>
            <ChevronRight className="h-4 w-4 text-accent" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex border-accent/30 hover:bg-accent/10"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">На последнюю страницу</span>
            <ChevronsRight className="h-4 w-4 text-accent" />
          </Button>
        </div>
      </div>
    </div>
  );
}
