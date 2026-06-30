import React from 'react';
import { Activity, PlusCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      title: 'New Branch Created',
      description: 'Downtown Center [DT-02] was successfully provisioned.',
      time: '2 hours ago',
      icon: <PlusCircle className="w-4 h-4 text-indigo-600" />,
      bg: 'bg-indigo-50',
      border: 'border-indigo-100'
    },
    {
      id: 2,
      title: 'Network Issue Detected',
      description: 'High latency observed in Main Campus Lab 4.',
      time: '5 hours ago',
      icon: <AlertCircle className="w-4 h-4 text-rose-600" />,
      bg: 'bg-rose-50',
      border: 'border-rose-100'
    },
    {
      id: 3,
      title: 'Batch Graduated',
      description: 'Python Data Science Cohort 12 completed their final assessments.',
      time: 'Yesterday',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    {
      id: 4,
      title: 'Instructor Added',
      description: 'Alex Mercer joined the Cloud Architecture faculty.',
      time: '2 days ago',
      icon: <PlusCircle className="w-4 h-4 text-indigo-600" />,
      bg: 'bg-indigo-50',
      border: 'border-indigo-100'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">System Activity</h2>
          <p className="text-sm text-slate-500 mt-1">Latest events across the network</p>
        </div>
        <div className="w-10 h-10 bg-slate-50 text-slate-500 rounded-lg flex items-center justify-center">
          <Activity className="w-5 h-5" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <div className="relative border-l border-slate-200 ml-3 space-y-6 pb-4">
          {activities.map((activity) => (
            <div key={activity.id} className="relative pl-6">
              <span className={`absolute -left-[17px] top-1 flex items-center justify-center w-8 h-8 rounded-full ${activity.bg} border ${activity.border} ring-4 ring-white`}>
                {activity.icon}
              </span>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="text-sm font-bold text-slate-900">{activity.title}</h3>
                  <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">{activity.time}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
