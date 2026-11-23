import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary:
          "border-border bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        destructive:
          "border-transparent bg-rose-600 text-white hover:bg-rose-700",
        outline: "border-border text-foreground",
        success:
          "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
        warning:
          "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100",
        info:
          "border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100",
        error:
          "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100",
        neutral:
          "border-border bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        primary_light:
          "border-primary-border bg-primary-light text-primary hover:bg-primary/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
