import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  children?: React.ReactNode;
  className?: string;
  isWidget?: boolean;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  children,
  className = '',
  isWidget = false,
}: EmptyStateProps) {
  return (
    <div 
      className={`flex flex-col items-center justify-center text-center p-8 rounded-3xl w-full border border-slate-100 bg-slate-50/20 animate-in fade-in duration-700 ${isWidget ? 'py-12' : 'py-20'} ${className}`}
    >
      {Icon && (
        <div className="relative mb-8">
          {/* Soft glowing aura behind the icon */}
          <div className="absolute inset-0 bg-blue-100/60 rounded-full blur-xl scale-[1.6]" />
          
          <div className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center text-blue-500 shadow-sm ring-1 ring-slate-100/80">
            <Icon className="w-7 h-7" strokeWidth={1.5} />
          </div>
        </div>
      )}
      
      <h3 className={`relative z-10 font-semibold text-slate-800 tracking-tight ${isWidget ? 'text-lg mb-1.5' : 'text-xl mb-2'}`}>
        {title}
      </h3>
      
      <p className={`relative z-10 text-slate-400 max-w-sm mx-auto leading-relaxed ${isWidget ? 'text-xs mb-5' : 'text-[14px] mb-8'}`}>
        {description}
      </p>
      
      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto relative z-10">
          {secondaryActionLabel && onSecondaryAction && (
            <Button 
              variant="outline" 
              onClick={onSecondaryAction} 
              className="w-full sm:w-auto transition-colors"
            >
              {secondaryActionLabel}
            </Button>
          )}
          {actionLabel && onAction && (
            <Button 
              onClick={onAction}
              className="w-full sm:w-auto shadow-sm hover:shadow-md transition-shadow"
            >
              {actionLabel}
            </Button>
          )}
        </div>
      )}

      {children && (
        <div className="mt-6 w-full max-w-md">
          {children}
        </div>
      )}
    </div>
  );
}
