import { RoleDetailsHub } from '@/features/iam/components/RoleDetailsHub';

export default async function RolePermissionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <RoleDetailsHub roleId={resolvedParams.id} />
    </div>
  );
}
