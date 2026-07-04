import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

// ─── 1. Linear Progress ──────────────────────────────────────────────────────
interface LinearProgressProps {
  value: number; // 0 to 100
  height?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'emerald' | 'amber' | 'rose';
  showLabel?: boolean;
  className?: string;
}

const heightClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

const colorClasses = {
  blue: 'bg-blue-600',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
};

export function LinearProgress({ 
  value, 
  height = 'md', 
  color = 'blue',
  showLabel = false,
  className 
}: LinearProgressProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
          <span>Progress</span>
          <span>{Math.round(safeValue)}%</span>
        </div>
      )}
      <div className={cn("w-full bg-slate-100 rounded-full overflow-hidden", heightClasses[height])}>
        <motion.div 
          className={cn("h-full rounded-full", colorClasses[color])}
          initial={{ width: 0 }}
          animate={{ width: `${safeValue}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─── 2. Circular Progress ────────────────────────────────────────────────────
interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  showLabel?: boolean;
}

export function CircularProgress({
  value,
  size = 64,
  strokeWidth = 6,
  color = 'text-blue-600',
  showLabel = true,
}: CircularProgressProps) {
  const safeValue = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (safeValue / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Background Circle */}
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-slate-100"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Animated Progress Circle */}
        <motion.circle
          className={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          stroke="currentColor"
          fill="transparent"
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-xs font-bold text-slate-700">
          {Math.round(safeValue)}%
        </span>
      )}
    </div>
  );
}

// ─── 3. Step Progress ────────────────────────────────────────────────────────
interface StepProgressProps {
  steps: string[];
  currentStep: number; // 0-indexed
}

export function StepProgress({ steps, currentStep }: StepProgressProps) {
  return (
    <div className="w-full flex items-center justify-between relative">
      {/* Background Line */}
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-200 -z-10 mx-6"></div>
      
      {/* Active Line Fill */}
      <motion.div 
        className="absolute top-4 left-0 h-0.5 bg-blue-600 -z-10 mx-6"
        initial={{ width: '0%' }}
        animate={{ width: `${(Math.min(currentStep, steps.length - 1) / (steps.length - 1)) * 100}%` }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />

      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={step} className="flex flex-col items-center gap-2 z-10">
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300",
                isCompleted ? "bg-blue-600 border-blue-600 text-white" : 
                isActive ? "bg-white border-blue-600 text-blue-600 shadow-sm" : 
                "bg-white border-slate-200 text-slate-400"
              )}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : <span className="text-xs font-bold">{index + 1}</span>}
            </div>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-wider",
              isActive || isCompleted ? "text-slate-800" : "text-slate-400"
            )}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
