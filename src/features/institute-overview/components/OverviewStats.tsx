import React from 'react';
import { Users, Code2, Server, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function OverviewStats() {
  const stats = [
    {
      title: 'Total Enrollments',
      value: '2,845',
      trend: '+12.5%',
      isPositive: true,
      icon: <Users className="w-6 h-6" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Active Bootcamps',
      value: '14',
      trend: '+2',
      isPositive: true,
      icon: <Code2 className="w-6 h-6" />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Lab Utilization',
      value: '86%',
      trend: '-2.4%',
      isPositive: false,
      icon: <Server className="w-6 h-6" />,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      title: 'Total Revenue',
      value: '$124,500',
      trend: '+18.2%',
      isPositive: true,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 hover:-translate-y-[2px] transition-all duration-300 flex items-center justify-between group cursor-pointer relative overflow-hidden">
          {/* Subtle gradient background glow */}
          <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${stat.bgColor} opacity-50 blur-2xl group-hover:opacity-80 transition-opacity`}></div>
          
          <div className="flex items-center gap-3 relative z-10">
            <div className={`w-10 h-10 ${stat.bgColor} ${stat.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.title}</p>
              <h3 className="text-xl font-bold text-slate-900 leading-tight mt-0.5">{stat.value}</h3>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className={`flex items-center gap-0.5 text-[10px] font-bold px-2 py-1 rounded-md ${stat.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
              {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {stat.trend}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
