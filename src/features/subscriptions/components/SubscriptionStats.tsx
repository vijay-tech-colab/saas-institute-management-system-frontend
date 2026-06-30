import React from 'react';
import { CreditCard, Building2, TrendingDown, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function SubscriptionStats() {
  const stats = [
    {
      title: 'Global MRR',
      value: '$42,500',
      trend: '+8.4%',
      isPositive: true,
      icon: <CreditCard className="w-5 h-5" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Active Tenants',
      value: '1,248',
      trend: '+12%',
      isPositive: true,
      icon: <Building2 className="w-5 h-5" />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Past Due Accounts',
      value: '14',
      trend: '-2',
      isPositive: true,
      icon: <TrendingDown className="w-5 h-5" />,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      title: 'ARPU',
      value: '$34.05',
      trend: '+1.2%',
      isPositive: true,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
          
          <div className="relative z-10 hidden sm:block">
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
