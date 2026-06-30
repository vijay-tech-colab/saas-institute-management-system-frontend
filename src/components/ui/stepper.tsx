"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export interface StepperProps {
  steps: { title: string; description?: string }[]
  currentStep: number
  className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("flex flex-col space-y-6 w-full", className)}>
      {steps.map((step, index) => {
        const isCompleted = currentStep > index
        const isActive = currentStep === index

        return (
          <div key={step.title} className="flex relative">
            {/* Vertical Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute left-4 top-10 bottom-[-24px] w-[2px] -ml-[1px] transition-colors duration-300",
                  currentStep > index ? "bg-blue-500" : "bg-slate-700/50"
                )}
              />
            )}

            <div className="flex items-start gap-4 z-10 w-full">
              <div
                className={cn(
                  "w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 border-2",
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 ring-4 ring-blue-500/20 shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                    : isCompleted
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <div className="pt-1">
                <span
                  className={cn(
                    "block text-sm font-semibold tracking-wide transition-colors duration-300",
                    isActive ? "text-white" : isCompleted ? "text-slate-200" : "text-slate-500"
                  )}
                >
                  {step.title}
                </span>
                {step.description && (
                  <span
                    className={cn(
                      "block text-xs mt-1 transition-colors duration-300",
                      isActive ? "text-slate-300" : "text-slate-500"
                    )}
                  >
                    {step.description}
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
