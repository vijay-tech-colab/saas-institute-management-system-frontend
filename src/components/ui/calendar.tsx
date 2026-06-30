'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-y-4 sm:gap-x-4 sm:gap-y-0',
        month: 'space-y-3',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-semibold text-slate-900',
        nav: 'flex items-center gap-1',
        nav_button: cn(
          'h-7 w-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 inline-flex items-center justify-center transition-colors'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse',
        head_row: 'flex',
        head_cell: 'text-slate-400 rounded-md w-8 font-medium text-[0.7rem] text-center',
        row: 'flex w-full mt-1.5',
        cell: cn(
          'relative p-0 text-center text-sm',
          '[&:has([aria-selected])]:bg-blue-50 [&:has([aria-selected])]:rounded-lg',
          '[&:has([aria-selected].day-outside)]:bg-blue-50/30',
          '[&:has([aria-selected].day-range-end)]:rounded-r-lg'
        ),
        day: cn(
          'h-8 w-8 p-0 font-normal text-sm rounded-lg hover:bg-slate-100 transition-colors',
          'aria-selected:opacity-100 inline-flex items-center justify-center'
        ),
        day_selected:
          'bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white rounded-lg font-semibold',
        day_today:
          'bg-slate-100 text-slate-900 font-semibold',
        day_outside:
          'day-outside text-slate-300 aria-selected:bg-blue-50/50 aria-selected:text-slate-400',
        day_disabled: 'text-slate-300 cursor-not-allowed opacity-50',
        day_range_middle:
          'aria-selected:bg-blue-50 aria-selected:text-blue-900 rounded-none',
        day_range_end: 'day-range-end',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4 text-slate-500" />,
        IconRight: () => <ChevronRight className="h-4 w-4 text-slate-500" />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };
