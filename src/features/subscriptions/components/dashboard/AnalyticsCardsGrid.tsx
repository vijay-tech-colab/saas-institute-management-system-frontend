'use client';

import React from 'react';
import { 
  Users, CreditCard, TrendingUp, AlertCircle, Clock, 
  XCircle, BarChart2, RefreshCw, DollarSign, Activity, 
  UserMinus, Heart
} from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { mockStats } from '../../data/mock-data';

export function AnalyticsCardsGrid() {
  const statCards = [
    { title: 'Total Active Subs', value: mockStats.totalActive, trend: 8.2, trendLabel: 'vs last month', icon: <Users size={18} />, iconColor: 'text-blue-600', iconBg: 'bg-blue-50', sparklineData: [320, 380, 340, 420, 460, 490, 552], prefix: '' },
    { title: 'Total Trial Users', value: mockStats.trialUsers, trend: 12.1, trendLabel: 'vs last month', icon: <Clock size={18} />, iconColor: 'text-purple-600', iconBg: 'bg-purple-50', sparklineData: [20, 28, 22, 31, 29, 34, 38] },
    { title: 'Expired Subs', value: mockStats.expired, trend: -3.4, trendLabel: 'vs last month', icon: <XCircle size={18} />, iconColor: 'text-slate-500', iconBg: 'bg-slate-100', sparklineData: [102, 98, 95, 99, 97, 94, 91] },
    { title: 'Cancelled Plans', value: mockStats.cancelledPlans, trend: -1.2, trendLabel: 'vs last month', icon: <UserMinus size={18} />, iconColor: 'text-red-500', iconBg: 'bg-red-50', sparklineData: [25, 23, 26, 21, 24, 25, 24] },
    
    { title: 'MRR', value: mockStats.mrr, trend: 7.8, trendLabel: 'vs last month', icon: <CreditCard size={18} />, iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50', sparklineData: [450000, 480000, 510000, 490000, 530000, 580000, 624000], prefix: '₹' },
    { title: 'ARR', value: mockStats.arr, trend: 10.4, trendLabel: 'vs last year', icon: <BarChart2 size={18} />, iconColor: 'text-indigo-600', iconBg: 'bg-indigo-50', sparklineData: [6800000, 7100000, 6900000, 7200000, 7000000, 7300000, 7488000], prefix: '₹' },
    { title: "Today's Revenue", value: mockStats.todayRevenue, trend: 15.3, trendLabel: 'vs yesterday', icon: <TrendingUp size={18} />, iconColor: 'text-emerald-500', iconBg: 'bg-emerald-50', sparklineData: [18000, 24000, 21000, 28000, 22000, 25000, 28450], prefix: '₹' },
    { title: 'Pending Renewals', value: mockStats.pendingRenewals, trend: -2.1, trendLabel: 'vs last week', icon: <RefreshCw size={18} />, iconColor: 'text-amber-600', iconBg: 'bg-amber-50', sparklineData: [28, 25, 30, 27, 24, 25, 23] },
    
    { title: 'Renewal Success', value: mockStats.renewalSuccessRate, trend: 2.5, trendLabel: 'vs last month', icon: <Activity size={18} />, iconColor: 'text-blue-500', iconBg: 'bg-blue-50', sparklineData: [88, 89, 90, 92, 93, 94, 94.5], suffix: '%' },
    { title: 'Avg Rev / Tenant', value: mockStats.avgRevenuePerTenant, trend: 4.2, trendLabel: 'vs last month', icon: <DollarSign size={18} />, iconColor: 'text-violet-600', iconBg: 'bg-violet-50', sparklineData: [10500, 10800, 10600, 11000, 10900, 11100, 11250], prefix: '₹' },
    { title: 'Lifetime Value (LTV)', value: mockStats.lifetimeValue, trend: 5.6, trendLabel: 'vs last month', icon: <Heart size={18} />, iconColor: 'text-pink-600', iconBg: 'bg-pink-50', sparklineData: [120000, 122000, 125000, 128000, 131000, 134000, 135000], prefix: '₹' },
    { title: 'Customer Churn', value: mockStats.churnRate, trend: -0.5, trendLabel: 'vs last month', icon: <AlertCircle size={18} />, iconColor: 'text-rose-600', iconBg: 'bg-rose-50', sparklineData: [6.2, 5.8, 5.5, 5.2, 5.0, 4.9, 4.8], suffix: '%' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {statCards.map((card, i) => (
        <StatCard key={i} {...card} delay={i * 0.03} />
      ))}
    </div>
  );
}
