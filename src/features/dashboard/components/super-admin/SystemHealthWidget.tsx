"use client"

import React from 'react';
import { Server, Database, Box, Cpu, HardDrive, Wifi, Activity, CheckCircle2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export function SystemHealthWidget() {
  const metrics = [
    { name: 'CPU Utilization', value: '38%', status: 'healthy', icon: Cpu, detail: '16 Cores' },
    { name: 'Memory (RAM)', value: '64%', status: 'healthy', icon: Server, detail: '41/64 GB' },
    { name: 'Primary Storage', value: '32%', status: 'healthy', icon: HardDrive, detail: 'NVMe SSD' },
    { name: 'PostgreSQL Cluster', value: '99.9%', status: 'healthy', icon: Database, detail: 'Active Replica' },
    { name: 'Redis Cache Layer', value: '98.5%', status: 'healthy', icon: Box, detail: 'Hit rate 98%' },
    { name: 'Average API Latency', value: '112ms', status: 'healthy', icon: Wifi, detail: 'Global p95' },
  ];

  return (
    <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-xl shadow-xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm text-slate-900 leading-tight truncate">Infrastructure Health</h3>
              <p className="text-[11px] text-slate-500 truncate">Real-time cluster & service status</p>
            </div>
          </div>
          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold rounded-full border border-emerald-200/70 flex items-center gap-1.5 whitespace-nowrap shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Operational
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const isWarning = metric.status === 'warning';
            return (
              <div
                key={metric.name}
                className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-colors flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                  {isWarning ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  )}
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-500 truncate">
                    {metric.name}
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-slate-900 mt-0.5">
                    {metric.value}
                  </p>
                  <p className="text-[10.5px] text-slate-400 mt-0.5 truncate">
                    {metric.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <span>6 of 6 microservices healthy</span>
        <Link
          href="/dashboard/logs/system"
          className="font-semibold text-primary hover:text-primary-hover transition-colors whitespace-nowrap"
        >
          View System Logs &rarr;
        </Link>
      </div>
    </div>
  );
}
