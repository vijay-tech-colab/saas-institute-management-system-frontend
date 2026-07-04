import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// ─── 1. Core Spinner ─────────────────────────────────────────────────────────
interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'white' | 'muted';
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const variantClasses = {
  primary: 'text-blue-600',
  white: 'text-white',
  muted: 'text-slate-400',
};

export function Spinner({ size = 'md', variant = 'primary', className, ...props }: SpinnerProps) {
  return (
    <Loader2 
      className={cn("animate-spin", sizeClasses[size], variantClasses[variant], className)} 
      {...props} 
    />
  );
}

// ─── 2. Page Loader ─────────────────────────────────────────────────────────
export function PageLoader({ text = "Loading content..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full h-full space-y-4">
      <Spinner size="xl" />
      {text && <p className="text-sm font-medium text-slate-500 animate-pulse">{text}</p>}
    </div>
  );
}

// ─── 3. Button Loader ─────────────────────────────────────────────────────────
export function ButtonLoader({ text }: { text?: string }) {
  return (
    <span className="flex items-center justify-center gap-2">
      <Spinner size="sm" variant="white" className="opacity-70" />
      {text && <span>{text}</span>}
    </span>
  );
}

// ─── 4. Table Overlay Loader ─────────────────────────────────────────────────
export function TableOverlayLoader() {
  return (
    <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[2px] flex items-center justify-center rounded-xl">
      <div className="bg-white px-6 py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 border border-slate-100">
        <Spinner size="md" />
        <span className="font-semibold text-slate-700">Fetching records...</span>
      </div>
    </div>
  );
}

// ─── 5. Infinite Scroll Loader ───────────────────────────────────────────────
export function InfiniteScrollLoader() {
  return (
    <div className="py-6 flex justify-center w-full">
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-200">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
