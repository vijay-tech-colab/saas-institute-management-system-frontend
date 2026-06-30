import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

interface DataTablePaginationProps {
  pageSize: number;
  setPageSize: (size: number) => void;
  pageIndex: number;
  setPageIndex: (index: number) => void;
  totalRows: number;
  pageSizeOptions?: number[];
}

export function DataTablePagination({
  pageSize,
  setPageSize,
  pageIndex,
  setPageIndex,
  totalRows,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTablePaginationProps) {
  const totalPages = Math.ceil(totalRows / pageSize) || 1;
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(0);
      if (pageIndex > 2) {
        pages.push(-1); // Ellipsis
      }
      
      const start = Math.max(1, pageIndex - 1);
      const end = Math.min(totalPages - 2, pageIndex + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (pageIndex < totalPages - 3) {
        pages.push(-2); // Ellipsis
      }
      pages.push(totalPages - 1);
    }

    return pages.map((p, i) => {
      if (p < 0) {
        return (
          <span key={`ellipsis-${i}`} className="flex h-8 w-8 items-center justify-center text-slate-400">
            <MoreHorizontal className="h-4 w-4" />
          </span>
        );
      }
      
      const isActive = pageIndex === p;
      return (
        <button
          key={p}
          onClick={() => setPageIndex(p)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-all cursor-pointer",
            isActive ? "bg-blue-600 text-white shadow-sm shadow-blue-200" : "text-slate-500 hover:bg-slate-100"
          )}
        >
          {p + 1}
        </button>
      );
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center px-4 py-3 border-t border-slate-100 gap-4">
      {/* Left side: Rows per page */}
      <div className="flex-1 flex justify-start items-center gap-2">
        <span className="text-xs font-medium text-slate-500">Rows per page</span>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => {
            setPageSize(Number(value));
            setPageIndex(0);
          }}
        >
          <SelectTrigger className="h-8 w-[70px] text-xs">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((opt) => (
              <SelectItem key={opt} value={`${opt}`} className="text-xs">
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Center: Showing entries */}
      <div className="flex-1 flex justify-center items-center">
        <p className="text-xs text-slate-500 font-medium hidden sm:block text-center">
          Showing <span className="font-semibold text-slate-700">{totalRows === 0 ? 0 : startRow}</span> to <span className="font-semibold text-slate-700">{endRow}</span> of <span className="font-semibold text-slate-700">{totalRows}</span> entries
        </p>
      </div>

      {/* Right side: Navigation buttons */}
      <div className="flex-1 flex justify-end items-center gap-1.5">
        <button
          onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
          disabled={pageIndex === 0}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <div className="flex items-center gap-1">
          {renderPageNumbers()}
        </div>

        <button
          onClick={() => setPageIndex(Math.min(totalPages - 1, pageIndex + 1))}
          disabled={pageIndex >= totalPages - 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
