"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckSquare, Square } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer group h-4 w-4 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/20 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer text-slate-400 data-[state=checked]:text-indigo-600 hover:text-indigo-600 transition-colors",
      className
    )}
    {...props}
  >
    <CheckSquare className="h-4 w-4 hidden group-data-[state=checked]:block" />
    <Square className="h-4 w-4 block group-data-[state=checked]:hidden" />
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
