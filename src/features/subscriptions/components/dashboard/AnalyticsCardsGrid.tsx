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
    { title: 'Total Active Subs', value: mockStats.totalActive, trend: 8.2, trendLabel: 'vs last month', icon: <Users size={18} />, tone: 'primary' as const, prefix: '' },
    { title: 'Total Trial Users', value: mockStats.trialUsers, trend: 12.1, trendLabel: 'vs last month', icon: <Clock size={18} />, tone: 'warning' as const },
    { title: 'Expired Subs', value: mockStats.expired, trend: -3.4, trendLabel: 'vs last month', icon: <XCircle size={18} />, tone: 'neutral' as const },
    { title: 'Cancelled Plans', value: mockStats.cancelledPlans, trend: -1.2, trendLabel: 'vs last month', icon: <UserMinus size={18} />, tone: 'danger' as const },
    
    { title: 'MRR', value: mockStats.mrr, trend: 7.8, trendLabel: 'vs last month', icon: <CreditCard size={18} />, tone: 'success' as const, prefix: '₹' },
    { title: 'ARR', value: mockStats.arr, trend: 10.4, trendLabel: 'vs last year', icon: <BarChart2 size={18} />, tone: 'success' as const, prefix: '₹' },
    { title: "Today's Revenue", value: mockStats.todayRevenue, trend: 15.3, trendLabel: 'vs yesterday', icon: <TrendingUp size={18} />, tone: 'success' as const, prefix: '₹' },
    { title: 'Pending Renewals', value: mockStats.pendingRenewals, trend: -2.1, trendLabel: 'vs last week', icon: <RefreshCw size={18} />, tone: 'warning' as const },
    
    { title: 'Renewal Success', value: mockStats.renewalSuccessRate, trend: 2.5, trendLabel: 'vs last month', icon: <Activity size={18} />, tone: 'primary' as const, suffix: '%' },
    { title: 'Avg Rev / Tenant', value: mockStats.avgRevenuePerTenant, trend: 4.2, trendLabel: 'vs last month', icon: <DollarSign size={18} />, tone: 'info' as const, prefix: '₹' },
    { title: 'Lifetime Value (LTV)', value: mockStats.lifetimeValue, trend: 5.6, trendLabel: 'vs last month', icon: <Heart size={18} />, tone: 'info' as const, prefix: '₹' },
    { title: 'Customer Churn', value: mockStats.churnRate, trend: -0.5, trendLabel: 'vs last month', icon: <AlertCircle size={18} />, tone: 'danger' as const, suffix: '%' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
      {statCards.map((card, i) => (
        <StatCard key={i} {...card} delay={i * 0.03} />
      ))}
    </div>
  );
}

