import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { Calendar, Filter } from 'lucide-react';

const revenueData = [
  { name: 'Jan', mrr: 40000, arr: 480000 },
  { name: 'Feb', mrr: 50000, arr: 600000 },
  { name: 'Mar', mrr: 45000, arr: 540000 },
  { name: 'Apr', mrr: 65000, arr: 780000 },
  { name: 'May', mrr: 75000, arr: 900000 },
  { name: 'Jun', mrr: 85000, arr: 1020000 },
  { name: 'Jul', mrr: 105000, arr: 1260000 },
  { name: 'Aug', mrr: 120000, arr: 1440000 },
  { name: 'Sep', mrr: 110000, arr: 1320000 },
  { name: 'Oct', mrr: 130000, arr: 1560000 },
  { name: 'Nov', mrr: 142500, arr: 1710000 },
];

const growthData = [
  { name: 'Jan', institutes: 120, students: 2400 },
  { name: 'Feb', institutes: 150, students: 3100 },
  { name: 'Mar', institutes: 140, students: 3400 },
  { name: 'Apr', institutes: 180, students: 4200 },
  { name: 'May', institutes: 220, students: 5100 },
  { name: 'Jun', institutes: 250, students: 6500 },
  { name: 'Jul', institutes: 310, students: 7800 },
  { name: 'Aug', institutes: 350, students: 8900 },
  { name: 'Sep', institutes: 330, students: 9500 },
  { name: 'Oct', institutes: 380, students: 10200 },
  { name: 'Nov', institutes: 420, students: 11500 },
];

export function BusinessAnalytics() {
  const [dateRange, setDateRange] = useState('This Year');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Business Analytics</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none pl-9 pr-8 py-2 bg-white border border-slate-200 text-sm font-semibold rounded-lg text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm hover:bg-slate-50 transition-colors"
            >
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>This Year</option>
            </select>
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue Growth Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[400px] hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-bold text-slate-900">Revenue Growth</h3>
              <p className="text-xs text-slate-500 mt-1">MRR vs ARR comparison</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div> MRR</span>
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-indigo-200"></div> ARR</span>
            </div>
          </div>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMrrNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorArrNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} tickFormatter={(value) => `₹${value / 1000}k`} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any, name: any) => [`₹${Number(value).toLocaleString()}`, String(name).toUpperCase()]}
                />
                <Area type="monotone" dataKey="arr" stroke="#818cf8" strokeWidth={2} fillOpacity={1} fill="url(#colorArrNew)" />
                <Area type="monotone" dataKey="mrr" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorMrrNew)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User & Institute Growth Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[400px] hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-bold text-slate-900">Platform Adoption</h3>
              <p className="text-xs text-slate-500 mt-1">Institutes vs Students onboarding</p>
            </div>
          </div>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} dx={-10} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} tickFormatter={(v) => `${v/1000}k`} dx={10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 600, paddingTop: '20px' }} />
                <Bar yAxisId="left" dataKey="institutes" name="Institutes" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar yAxisId="right" dataKey="students" name="Students" fill="#0ea5e9" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
