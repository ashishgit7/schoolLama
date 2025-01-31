import { Input } from "@/components/ui/input";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "./ui/button";

export function DataTable({ columns, data, pageSizeInit = 10}: any) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSizeInit,
  });
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  const pageCount = table.getPageCount();

  const renderPageNumbers = () => {
    const currentPage = pagination.pageIndex;
    const pageNumbers = [];

    // Always show first page
    if (currentPage > 2) {
      pageNumbers.push(
        <Button
          key="first"
          variant={currentPage === 0 ? "default" : "outline"}
          size="sm"
          onClick={() => table.setPageIndex(0)}
        >
          1
        </Button>
      );
      if (currentPage > 3) {
        pageNumbers.push(
          <span key="start-ellipsis" className="mx-2">
            ...
          </span>
        );
      }
    }

    // Render page numbers around current page
    for (
      let i = Math.max(0, currentPage - 1);
      i < Math.min(pageCount, currentPage + 2);
      i++
    ) {
      pageNumbers.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => table.setPageIndex(i)}
        >
          {i + 1}
        </Button>
      );
    }

    // Show ellipsis and last page if needed
    if (currentPage < pageCount - 3) {
      pageNumbers.push(
        <span key="end-ellipsis" className="mx-2">
          ...
        </span>
      );
      pageNumbers.push(
        <Button
          key="last"
          variant={currentPage === pageCount - 1 ? "default" : "outline"}
          size="sm"
          onClick={() => table.setPageIndex(pageCount - 1)}
        >
          {pageCount}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="rounded-md border">
      <div className="flex items-center py-4 ">
        <Input
          placeholder="Search"
          value={
            (table.getColumn("combinedData")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("combinedData")?.setFilterValue(event.target.value)
          }
          className="max-w-sm ml-3"
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isVisible = header.column.columnDef?.visible !== false;
                return isVisible ? (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ) : null;
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    if (cell.column.columnDef?.visible !== false) {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    } else return null;
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="hidden md:flex items-center justify-center space-x-2 py-4 ">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <div className="flex items-center space-x-1">{renderPageNumbers()}</div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <div className="justify-center flex md:hidden items-center space-x-2 py-4">
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
  );
}
