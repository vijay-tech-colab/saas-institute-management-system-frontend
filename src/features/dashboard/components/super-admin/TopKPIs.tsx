import React from 'react';
import { 
  Building, Building2, AlertTriangle, Clock, 
  Users, UserCheck, UserX, UserPlus, ShieldAlert,
  IndianRupee, TrendingUp, TrendingDown, Activity, 
  CreditCard, CreditCardIcon
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { WidgetSkeleton, AnimatedCounter } from '@/components/ui/dashboard-states';

const initialKpiData = [
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
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState(initialKpiData);

  // Simulate initial loading and live updates
  React.useEffect(() => {
    // Initial fetch simulation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Live update simulation every 5 seconds
    const interval = setInterval(() => {
      setData(prev => prev.map(kpi => {
        // Randomly fluctuate values slightly for simulation
        if (kpi.id === '1' || kpi.id === '2' || kpi.id === '8') {
          // Parse number, add small random int
          const currentVal = parseFloat(kpi.value.replace(/,/g, ''));
          const newVal = currentVal + Math.floor(Math.random() * 3);
          return { ...kpi, value: newVal.toString() };
        }
        if (kpi.id === '4') {
          // Revenue fluctuation
          const currentVal = parseFloat(kpi.value.replace(/[^0-9.-]+/g, ""));
          const newVal = currentVal + Math.floor(Math.random() * 5000) - 1000;
          return { ...kpi, value: `₹${newVal.toLocaleString('en-IN')}` };
        }
        return kpi;
      }));
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <WidgetSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {data.map((kpi) => {
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
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                {kpi.value.includes('₹') || kpi.value.includes('M') || kpi.value.includes('k') || kpi.value.includes('%') ? (
                  // For formatted strings (k, M, %, ₹) we could parse, but for simplicity we render AnimatedCounter where easily parseable
                  // Since some have M, k, %, we will just render string for complex ones, or use AnimatedCounter for raw numbers
                  kpi.value.match(/^[0-9,]+$/) ? (
                    <AnimatedCounter value={parseFloat(kpi.value.replace(/,/g, ''))} />
                  ) : kpi.value.includes('₹') && kpi.value.match(/[0-9,]+/) ? (
                    <AnimatedCounter prefix="₹" value={parseFloat(kpi.value.replace(/[^0-9.-]+/g, ""))} />
                  ) : (
                    kpi.value
                  )
                ) : (
                  <AnimatedCounter value={parseFloat(kpi.value.replace(/,/g, ''))} />
                )}
              </h3>
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
