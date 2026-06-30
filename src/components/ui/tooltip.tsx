import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-50 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Helper for UI Action Buttons
export function ActionTooltip({
  icon: Icon,
  tooltip,
  onClick,
  variant = "default",
}: {
  icon: any;
  tooltip: string;
  onClick?: () => void;
  variant?: "default" | "danger" | "success" | "warning";
}) {
  const variantStyles = {
    default: "text-slate-500 bg-white border-slate-200 shadow-sm hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50",
    danger: "text-slate-500 bg-white border-slate-200 shadow-sm hover:text-red-600 hover:border-red-200 hover:bg-red-50",
    success: "text-slate-500 bg-white border-slate-200 shadow-sm hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50",
    warning: "text-slate-500 bg-white border-slate-200 shadow-sm hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50",
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className={cn(
              "flex items-center justify-center p-1.5 rounded-lg border transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1",
              variantStyles[variant]
            )}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
