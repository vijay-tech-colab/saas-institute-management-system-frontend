'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { StatCard } from '@/features/subscriptions/components/shared/StatCard';
import { UsersDirectoryTable } from './UsersDirectoryTable';
import {
  Users,
  Activity,
  ShieldBan,
  ShieldAlert,
  Download,
  RefreshCcw,
} from 'lucide-react';
import { mockUsers } from '../../data/mock-data';
import { useToast } from '@/hooks/use-toast';

export function UserOverviewDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const toast = useToast();

  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter((u) => u.status === 'active').length;
  const pendingUsers = mockUsers.filter((u) => u.status === 'pending').length;
  const blockedUsers = mockUsers.filter((u) => u.status === 'blocked').length;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success({
        title: 'Directory synced',
        description: 'Latest institute owner statuses loaded.',
      });
    }, 600);
  };

  const handleExport = () => {
    toast.info({
      title: 'Exporting users',
      description: `Preparing CSV export for ${totalUsers} institute owners.`,
    });
  };

  return (
    <div className="flex-1 w-full flex flex-col min-h-0 space-y-6">
      <PageHeader
        title="User Management"
        description="View, filter, and manage all registered institute owner accounts, 2FA security, and verification statuses."
      >
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 text-xs sm:text-[13px] bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-slate-400" /> Export
        </button>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing}
          aria-label="Refresh users directory"
          className="h-9 w-9 inline-flex items-center justify-center bg-primary-light text-primary border border-primary-border rounded-xl hover:bg-primary/15 transition-colors group disabled:opacity-50 cursor-pointer"
        >
          <RefreshCcw
            className={`w-3.5 h-3.5 transition-transform duration-500 ${
              isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'
            }`}
          />
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        <StatCard
          title="Total Owners"
          value={totalUsers}
          icon={<Users size={18} />}
          tone="primary"
          trend={12.5}
          trendLabel="vs last month"
        />
        <StatCard
          title="Active Accounts"
          value={activeUsers}
          icon={<Activity size={18} />}
          tone="success"
          trend={8.2}
          trendLabel="vs last month"
        />
        <StatCard
          title="Pending Verification"
          value={pendingUsers}
          icon={<ShieldAlert size={18} />}
          tone="warning"
        />
        <StatCard
          title="Blocked Accounts"
          value={blockedUsers}
          icon={<ShieldBan size={18} />}
          tone="danger"
        />
      </div>

      {/* Table */}
      <UsersDirectoryTable />
    </div>
  );
}
