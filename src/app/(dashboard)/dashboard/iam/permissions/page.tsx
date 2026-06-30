import { PermissionBuilder } from '@/features/iam/components/PermissionBuilder';

export default function PermissionsPage() {
  return (
    <div className="flex-1 w-full flex flex-col min-h-0 bg-slate-50/50 p-4 md:p-6 lg:p-8">
      <PermissionBuilder />
    </div>
  );
}
