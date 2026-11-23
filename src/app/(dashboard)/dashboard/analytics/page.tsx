"use client";

import React from "react";
import { BusinessAnalytics } from "@/features/dashboard/components/super-admin/BusinessAnalytics";

export default function AnalyticsPage() {
  return (
    <div className="flex-1 p-4 md:p-6 w-full space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Platform Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">
          Detailed telemetry on tenant growth, platform ARR/MRR metrics, and subscription velocity.
        </p>
      </header>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <BusinessAnalytics />
      </div>
    </div>
  );
}
