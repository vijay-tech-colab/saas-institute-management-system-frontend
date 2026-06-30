'use client';

import React from 'react';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { AnalyticsCardsGrid } from './dashboard/AnalyticsCardsGrid';
import { RevenueAnalyticsSection } from './dashboard/RevenueAnalyticsSection';
import { PlanPerformanceSection } from './dashboard/PlanPerformanceSection';
import { DashboardTables } from './dashboard/DashboardTables';
import { DashboardLists } from './dashboard/DashboardLists';
import { InsightsAndHealth } from './dashboard/InsightsAndHealth';
import { RightSidebar } from './dashboard/RightSidebar';

export function SubscriptionDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <DashboardHeader />
      <AnalyticsCardsGrid />
      <RevenueAnalyticsSection />
      <PlanPerformanceSection />
      <DashboardTables />
      <DashboardLists />
      <InsightsAndHealth />
    </div>
  );
}