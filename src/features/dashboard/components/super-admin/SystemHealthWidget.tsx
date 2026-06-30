import React from 'react';
import { Server, Database, Box, Cpu, HardDrive, Wifi, Activity, CheckCircle2, AlertTriangle } from 'lucide-react';

export function SystemHealthWidget() {
  const metrics = [
    { name: 'CPU Usage', value: '42%', status: 'healthy', icon: Cpu },
    { name: 'RAM Usage', value: '78%', status: 'warning', icon: Server },
    { name: 'Disk I/O', value: '25%', status: 'healthy', icon: HardDrive },
    { name: 'Database', value: '99.9%', status: 'healthy', icon: Database },
    { name: 'Redis Cache', value: '98.5%', status: 'healthy', icon: Box },
    { name: 'API Latency', value: '124ms', status: 'healthy', icon: Wifi },
  ];

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            System Health
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Live infrastructure monitoring</p>
        </div>
        <div className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-md border border-emerald-100 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          All Systems Operational
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isWarning = metric.status === 'warning';
          return (
            <div key={metric.name} className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex flex-col gap-3 group hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between">
                <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                {isWarning ? (
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                )}
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{metric.name}</p>
                <p className={`text-xl font-bold mt-0.5 ${isWarning ? 'text-amber-600' : 'text-slate-900'}`}>{metric.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
