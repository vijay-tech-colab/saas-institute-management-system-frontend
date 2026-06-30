import React from 'react';
import { ShieldCheck, ShieldAlert, Key, Globe, Ban } from 'lucide-react';

export function SecurityCenterWidget() {
  const securityLogs = [
    { id: 1, event: 'Failed Login Attempt', user: 'admin@school.edu', ip: '143.192.45.1', status: 'critical', time: '10 mins ago', icon: Ban },
    { id: 2, event: 'API Key Rotated', user: 'system_service', ip: 'Internal', status: 'info', time: '1 hour ago', icon: Key },
    { id: 3, event: 'New IP Login', user: 'owner@institute.com', ip: '45.22.11.90', status: 'warning', time: '3 hours ago', icon: Globe },
    { id: 4, event: 'Firewall Rule Updated', user: 'superadmin', ip: '10.0.0.1', status: 'success', time: 'Yesterday', icon: ShieldCheck },
  ];

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            Security Center
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Recent alerts and activity</p>
        </div>
        <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">View Logs</button>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {securityLogs.map((log) => {
          const Icon = log.icon;
          return (
            <div key={log.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                log.status === 'critical' ? 'bg-rose-100 text-rose-600' :
                log.status === 'warning' ? 'bg-amber-100 text-amber-600' :
                log.status === 'success' ? 'bg-emerald-100 text-emerald-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{log.event}</p>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500 font-medium">
                  <span className="truncate max-w-[120px]">{log.user}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>{log.ip}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">{log.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
