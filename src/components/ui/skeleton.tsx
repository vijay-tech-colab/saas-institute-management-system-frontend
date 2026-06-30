import { cn } from "@/lib/utils"

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

export function TableSkeleton({ columns = 5, rows = 5 }: { columns?: number, rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-slate-50">
          {Array.from({ length: columns }).map((_, colIndex) => {
            const isFirst = colIndex === 0;
            const isLast = colIndex === columns - 1;
            const isSecond = colIndex === 1;

            return (
              <td key={colIndex} className="py-4 px-4 align-middle">
                {isFirst ? (
                   <Skeleton className="h-5 w-16 rounded-md bg-slate-200" />
                ) : isSecond ? (
                   <div className="space-y-2">
                     <Skeleton className="h-4 w-32 rounded-md bg-slate-200" />
                     <Skeleton className="h-3 w-20 rounded-md bg-slate-100" />
                   </div>
                ) : isLast ? (
                   <div className="flex items-center gap-1.5 opacity-70">
                     <Skeleton className="h-7 w-7 rounded-lg bg-slate-200" />
                     <Skeleton className="h-7 w-7 rounded-lg bg-slate-200" />
                     <Skeleton className="h-7 w-7 rounded-lg bg-slate-200" />
                   </div>
                ) : (
                   <Skeleton className={cn("h-4 rounded-md bg-slate-200", ['w-16', 'w-24', 'w-20', 'w-28'][colIndex % 4])} />
                )}
              </td>
            )
          })}
        </tr>
      ))}
    </>
  )
}

export { Skeleton }
