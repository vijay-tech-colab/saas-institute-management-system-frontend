import { SystemLogsView } from '@/features/audit-logs/components/SystemLogsView';

export default function SystemLogsPage() {
  return (
    <div className="h-[calc(100vh-4rem)] w-full flex flex-col min-h-0 bg-slate-50/50 p-4 md:p-6 lg:p-8">
      <SystemLogsView />
    </div>
  );
}
