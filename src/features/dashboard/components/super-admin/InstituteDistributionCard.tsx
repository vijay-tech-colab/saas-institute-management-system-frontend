"use client"

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';

const REGIONS = [
  { name: 'Maharashtra & West', institutes: 724, share: 33 },
  { name: 'Karnataka & South', institutes: 612, share: 28 },
  { name: 'Delhi NCR & North', institutes: 482, share: 22 },
  { name: 'Gujarat & Central', institutes: 372, share: 17 },
];

export function InstituteDistributionCard() {
  return (
    <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl shadow-2xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight truncate">
              Institute Distribution
            </h3>
          </div>
          <Link
            href="/dashboard/tenants/list"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors whitespace-nowrap shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3.5">
          {REGIONS.map((region) => (
            <div key={region.name} className="space-y-1.5">
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="font-medium text-slate-800 truncate">{region.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 tabular-nums">
                  <span className="font-semibold text-slate-900">{region.institutes}</span>
                  <span className="text-[11px] font-medium text-slate-500">({region.share}%)</span>
                </div>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-teal-400"
                  style={{ width: `${region.share * 2.4}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Active across 24 states</span>
        <span className="font-semibold text-slate-800 tabular-nums">2,190 Institutes</span>
      </div>
    </div>
  );
}
