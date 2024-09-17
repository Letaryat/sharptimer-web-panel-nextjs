"use client";

import * as React from "react";
import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  createColumnHelper,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SharpFetcher from "../api/sharpfetch/route";
import FetchSteamPlayerInfo from "../api/steamfetch/route";
import Link from "next/link";

const columnHelper = createColumnHelper();
const data = await SharpFetcher();
//console.log(data);

export const columns = [
  {
    accessorKey: "MapName",
    header: "MapName",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("MapName")}</div>
    ),
  },

  {
    accessorKey: "PlayerName",
    header: "PlayerName",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("PlayerName")}</div>
    ),
  },

  {
    accessorKey: "Profile",
    cell: ({ cell, row }) => {
      return (
        <Link
          className=" hover:text-teal-400"
          href={`/player/${row.original.SteamID}`}
        ><Button variant="secondary" className=" text-white hover:bg-teal-800" > 
          Profile <ArrowRight width={15} className="ml-1" /> 
         </Button>
        </Link>
      );
    },
  },

  {
    accessorKey: "FormattedTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          FormattedTime
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("FormattedTime")}</div>
    ),
  },
  {
    accessorKey: "LastFinished",
    header: "Last Finished",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("LastFinished")}</div>
    ),
  },
  {
    accessorKey: "TimesFinished",
    header: "Times Finished",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("TimesFinished")}</div>
    ),
  },
  {
    accessorKey: "Style",
    header: "Style",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Style")}</div>
    ),
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const [tabBtn, setTabBtn] = useState('Four');

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div >
        <div>
        <Button className={`mr-2 ${'One' === tabBtn ? 'bg-teal-500' : ''} `} variant="outline"
          value="surf"
          onClick={(event) => {
            table.getColumn("MapName")?.setFilterValue(event.target.value)
            setTabBtn('One');
          }
          }>
          Surf
        </Button>

        <Button className={`mr-2 ${'Two' === tabBtn ? 'bg-teal-500' : ''} `} variant="outline"
          value="bhop"
          onClick={(event) => {
            table.getColumn("MapName")?.setFilterValue(event.target.value)
            setTabBtn('Two');
          }
          }>
          Bhop
        </Button>
        <Button className={`mr-2 ${'Three' === tabBtn ? 'bg-teal-500' : ''} `} variant="outline"
          value="KZ"
          onClick={(event) => {
            table.getColumn("MapName")?.setFilterValue(event.target.value)
            setTabBtn('Three');
          }
          }>
          KZ
        </Button>
        <Button className={`mr-2 ${'Four' === tabBtn ? 'bg-teal-500' : ''} `} variant="outline"
          value=""
          onClick={(event) => {
            table.getColumn("MapName")?.setFilterValue(event.target.value)
            setTabBtn('Four');
          }
          }>
          All modes
        </Button>

        </div>
        <Input
          placeholder="Player nickname"
          value={table.getColumn("PlayerName")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("PlayerName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mt-2 mb-2"
        />
        <div className="rounded-md border">
        <Table >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} rows
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
