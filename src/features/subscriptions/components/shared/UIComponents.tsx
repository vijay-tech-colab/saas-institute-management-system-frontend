'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, X, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { SegmentedTabs } from '@/components/ui/tabs';

// ─── Search Input ───────────────────────────────────────────
interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Search...', className }: SearchInputProps) {
  return (
    <div className={cn('relative flex items-center', className)}>
      <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 pl-8.5 pr-8.5 text-[13px] bg-white border border-slate-200/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400 transition-all shadow-xs"
      />
      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => onChange('')}
            className="absolute right-2.5 p-0.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5 text-slate-400" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Filter Chips ───────────────────────────────────────────
interface FilterOption { label: string; value: string; count?: number }
interface FilterChipsProps {
  options: FilterOption[];
  selected: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FilterChips({ options, selected, onChange, className }: FilterChipsProps) {
  return (
    <SegmentedTabs
      options={options}
      value={selected}
      onChange={onChange}
      size="sm"
      className={className}
    />
  );
}

// ─── Modal ──────────────────────────────────────────────────
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  const sizeClass = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' }[size];
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn('relative bg-white rounded-xl shadow-2xl border border-slate-100 w-full overflow-hidden', sizeClass)}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">{title}</h2>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─── Page Header ────────────────────────────────────────────
interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHeader({ title, description, children, breadcrumbs }: PageHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
      <div className="space-y-0.5 min-w-0">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                <span className="text-[11px] text-slate-400">{b.label}</span>
                {i < breadcrumbs.length - 1 && <span className="text-slate-300 text-[11px]">/</span>}
              </React.Fragment>
            ))}
          </div>
        )}
        <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900 truncate">{title}</h1>
        {description && <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-2xl">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2 flex-wrap flex-shrink-0">{children}</div>}
    </header>
  );
}

// ─── Progress Bar ────────────────────────────────────────────
interface ProgressBarProps { value: number; max: number; color?: string; showLabel?: boolean; size?: 'sm' | 'md' }
export function ProgressBar({ value, max, color = 'bg-primary', showLabel = true, size = 'sm' }: ProgressBarProps) {
  const pct = Math.min(100, (value / max) * 100);
  const barColor = pct > 90 ? 'bg-rose-500' : pct > 70 ? 'bg-amber-500' : color;
  return (
    <div className="w-full">
      <div className={cn('w-full bg-slate-100 rounded-full overflow-hidden', size === 'sm' ? 'h-1.5' : 'h-2')}>
        <motion.div
          className={cn('h-full rounded-full', barColor)}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      {showLabel && <p className="text-[10px] text-slate-400 mt-1">{value.toLocaleString('en-IN')} / {max.toLocaleString('en-IN')}</p>}
    </div>
  );
}

// ─── Toggle Switch ───────────────────────────────────────────
interface ToggleProps { checked: boolean; onChange: (v: boolean) => void; label?: string }
export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn('relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0 cursor-pointer', checked ? 'bg-primary' : 'bg-slate-200')}
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
          className={cn('absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-xs', checked ? 'right-0.5 left-auto' : 'left-0.5 right-auto')}
        />
      </button>
      {label && <span className="text-[13px] text-slate-600">{label}</span>}
    </label>
  );
}

// ─── Custom Select ───────────────────────────────────────────
export interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  buttonClassName?: string;
}

export function CustomSelect({ options, value, onChange, className, placeholder = 'Select...', buttonClassName }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (buttonRef.current && !buttonRef.current.closest('[data-custom-select]')?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  // Recalculate position on open or scroll/resize
  useEffect(() => {
    if (!isOpen || !buttonRef.current) return;
    function updatePosition() {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const openUpward = spaceBelow < 200 && spaceAbove > spaceBelow;
      setDropdownStyle({
        position: 'fixed',
        left: rect.left,
        width: Math.max(rect.width, 180),
        zIndex: 9999,
        ...(openUpward
          ? { bottom: window.innerHeight - rect.top + 4 }
          : { top: rect.bottom + 4 }),
      });
    }
    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  const selectedOption = options.find(o => o.value === value);

  const dropdown = isOpen && typeof document !== 'undefined' ? createPortal(
    <AnimatePresence>
      <motion.div
        data-custom-select-menu
        initial={{ opacity: 0, y: -4, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -4, scale: 0.97 }}
        transition={{ duration: 0.13, ease: 'easeOut' }}
        style={dropdownStyle}
        className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
      >
        <div className="p-1.5 flex flex-col gap-0.5 max-h-56 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                'flex items-center justify-between w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors cursor-pointer',
                value === option.value
                  ? 'bg-primary-light text-primary font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 font-medium hover:text-slate-900'
              )}
            >
              {option.label}
              {value === option.value && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  ) : null;

  return (
    <div data-custom-select className={cn('relative', className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(o => !o)}
        className={cn(
          'flex items-center justify-between w-full min-w-[130px] gap-2 h-9 text-xs font-medium bg-white border border-slate-200 text-slate-700 rounded-lg px-3 py-1.5 outline-none hover:bg-slate-50 hover:border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-xs cursor-pointer',
          buttonClassName
        )}
      >
        <span className={!selectedOption ? 'text-slate-400' : ''}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={cn('w-3.5 h-3.5 text-slate-400 transition-transform duration-200', isOpen ? 'rotate-180' : '')} />
      </button>
      {dropdown}
    </div>
  );
}

