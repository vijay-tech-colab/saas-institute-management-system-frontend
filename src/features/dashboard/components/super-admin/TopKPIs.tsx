import React from 'react';
import { 
  Building, Building2, AlertTriangle, Clock, 
  Users, UserCheck, UserX, UserPlus, ShieldAlert,
  IndianRupee, TrendingUp, TrendingDown, Activity, 
  CreditCard, CreditCardIcon
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const kpiData = [
  { id: '1', title: 'Total Institutes', value: '2,458', change: '+12.5%', isUp: true, icon: Building, color: 'indigo', chartData: [30, 40, 35, 50, 49, 60, 70, 91, 125] },
  { id: '2', title: 'Active Institutes', value: '2,190', change: '+8.2%', isUp: true, icon: Building2, color: 'emerald', chartData: [40, 30, 45, 55, 60, 50, 70, 80, 110] },
  { id: '3', title: 'Suspended', value: '45', change: '-2.4%', isUp: false, icon: AlertTriangle, color: 'rose', chartData: [20, 18, 25, 20, 15, 22, 10, 5, 2] },
  { id: '4', title: 'Monthly Revenue (MRR)', value: '₹342,500', change: '+18.4%', isUp: true, icon: IndianRupee, color: 'blue', chartData: [20, 40, 45, 50, 60, 80, 90, 100, 120] },
  { id: '5', title: 'Active Users Today', value: '845.2k', change: '+5.1%', isUp: true, icon: Activity, color: 'violet', chartData: [30, 40, 45, 50, 49, 60, 70, 91, 125] },
  { id: '6', title: 'Pending Payments', value: '₹12,450', change: '-1.2%', isUp: false, icon: Clock, color: 'amber', chartData: [50, 40, 45, 30, 25, 20, 15, 10, 5] },
  { id: '7', title: 'Customer Churn', value: '1.2%', change: '-0.4%', isUp: false, icon: UserX, color: 'rose', chartData: [10, 15, 12, 18, 14, 10, 8, 5, 4] },
  { id: '8', title: 'Total Students', value: '2.4M', change: '+15%', isUp: true, icon: Users, color: 'sky', chartData: [100, 120, 150, 180, 200, 220, 250, 280, 300] },
];

const colorMap = {
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', fill: '#c7d2fe', stroke: '#6366f1' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', fill: '#a7f3d0', stroke: '#10b981' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600', fill: '#fecdd3', stroke: '#f43f5e' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', fill: '#bfdbfe', stroke: '#3b82f6' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-600', fill: '#ddd6fe', stroke: '#8b5cf6' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', fill: '#fde68a', stroke: '#f59e0b' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-600', fill: '#bae6fd', stroke: '#0ea5e9' },
};

export function TopKPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {kpiData.map((kpi) => {
        const Icon = kpi.icon;
        const colors = colorMap[kpi.color as keyof typeof colorMap];
        const chartData = kpi.chartData.map((val, idx) => ({ value: val, index: idx }));

        return (
          <div key={kpi.id} className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300/80 transition-all duration-300 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`w-10 h-10 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-md ${kpi.isUp ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                {kpi.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.change}
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{kpi.value}</h3>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">{kpi.title}</p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-16 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <Area type="monotone" dataKey="value" stroke={colors.stroke} fill={colors.fill} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}
