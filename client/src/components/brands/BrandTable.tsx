'use client';

import {
   ColumnDef,
   ColumnFiltersState,
   SortingState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from '@tanstack/react-table';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
}

export function BrandDataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
   const [sorting, setSorting] = useState<SortingState>([]);
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      state: {
         sorting,
         columnFilters,
      },
   });

   return (
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
               <Input
                  placeholder="Tìm kiếm thương hiệu..."
                  value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                  onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                  className="pl-10 bg-white border-gray-200"
               />
            </div>
            <Button className="bg-black hover:bg-gray-800 text-white">
               <Plus className="mr-2 h-4 w-4" />
               Thêm thương hiệu
            </Button>
         </div>

         <div className="rounded-md border border-gray-200 bg-white">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id} className="border-gray-200">
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead key={header.id} className="font-semibold text-gray-900">
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
                           data-state={row.getIsSelected() && 'selected'}
                           className="border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id} className="text-gray-700">
                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell
                           colSpan={columns.length}
                           className="h-24 text-center text-gray-500"
                        >
                           Không tìm thấy thương hiệu nào.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>

         <div className="flex items-center justify-end space-x-2">
            <Button
               variant="outline"
               size="sm"
               onClick={() => table.previousPage()}
               disabled={!table.getCanPreviousPage()}
               className="border-gray-300"
            >
               Trước
            </Button>
            <Button
               variant="outline"
               size="sm"
               onClick={() => table.nextPage()}
               disabled={!table.getCanNextPage()}
               className="border-gray-300"
            >
               Sau
            </Button>
         </div>
      </div>
   );
}
