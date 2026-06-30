import { SecurityEventsDashboard } from '@/features/audit-logs/components/SecurityEventsDashboard';

export default function SecurityEventsPage() {
  return (
    <div className="flex-1 w-full flex flex-col min-h-0 bg-slate-50/50 p-4 md:p-6 lg:p-8 overflow-y-auto">
      <SecurityEventsDashboard />
    </div>
  );
}
