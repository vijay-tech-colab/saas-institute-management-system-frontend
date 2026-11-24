import { cn } from "@/lib/utils"
import { TABLE_STICKY } from "@/components/ui/row-action-menu"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200", className)}
      {...props}
    />
  )
}

export function TableSkeleton({
  columns = 5,
  rows = 5,
  hasCheckbox = true,
  hasActions = true,
}: {
  columns?: number;
  rows?: number;
  hasCheckbox?: boolean;
  hasActions?: boolean;
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-slate-100 bg-white">
          {Array.from({ length: columns }).map((_, colIndex) => {
            const isCheckbox = hasCheckbox && colIndex === 0;
            const isId = hasCheckbox ? colIndex === 1 : colIndex === 0;
            const isPrimary = hasCheckbox ? colIndex === 2 : colIndex === 1;
            const isLast = hasActions && colIndex === columns - 1;

            if (isCheckbox) {
              return (
                <td key={colIndex} className={cn("py-3 px-3 text-center align-middle", TABLE_STICKY.checkboxTd)}>
                  <div className="flex items-center justify-center">
                    <Skeleton className="h-4 w-4 rounded-[4px]" />
                  </div>
                </td>
              );
            }

            if (isId) {
              return (
                <td
                  key={colIndex}
                  className={cn(
                    "py-3 px-3.5 align-middle",
                    hasCheckbox ? TABLE_STICKY.idTdWithCheckbox : TABLE_STICKY.idTd
                  )}
                >
                  <Skeleton className="h-4 w-16 rounded-md" />
                </td>
              );
            }

            if (isLast) {
              return (
                <td key={colIndex} className={cn("py-3 px-3 align-middle", TABLE_STICKY.actionTd)}>
                  <div className="flex items-center justify-center">
                    <Skeleton className="h-7 w-7 rounded-lg" />
                  </div>
                </td>
              );
            }

            return (
              <td key={colIndex} className="py-3 px-3.5 align-middle">
                {isPrimary ? (
                  <div className="space-y-1.5">
                    <Skeleton className="h-3.5 w-32 rounded-md" />
                    <Skeleton className="h-3 w-20 rounded-md" />
                  </div>
                ) : (
                  <Skeleton className={cn("h-4 rounded-md", ['w-16', 'w-24', 'w-20', 'w-28'][colIndex % 4])} />
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-32" />
      </div>
    </div>
  )
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <Skeleton className="h-24 w-24 rounded-full flex-shrink-0" />
      <div className="space-y-4 flex-1 w-full">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-px w-full my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="w-full h-[300px] flex flex-col justify-end gap-2 pb-6 px-4 bg-slate-50/50 rounded-xl border border-slate-100 relative">
      <div className="absolute top-6 left-6 space-y-2">
         <Skeleton className="h-5 w-32" />
         <Skeleton className="h-4 w-48" />
      </div>
      <div className="flex items-end justify-between gap-2 h-48 mt-12 w-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="w-full rounded-t-sm" style={{ height: `${Math.max(20, Math.random() * 100)}%` }} />
        ))}
      </div>
    </div>
  )
}

export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
          <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full hidden sm:block" />
        </div>
      ))}
    </div>
  )
}

export function DetailSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24 rounded-lg" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CardSkeleton />
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="space-y-4">
              <Skeleton className="h-6 w-48 mb-6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full mt-4" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  )
}

export { Skeleton }
