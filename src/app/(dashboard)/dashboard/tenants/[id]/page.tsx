import { TenantDetailsView } from '@/features/tenants/components/details/TenantDetailsView';

export const metadata = {
  title: 'Tenant Details | Institute OS',
  description: 'Manage tenant configuration and details.',
};

export default async function TenantDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <div className="flex-1 w-full flex flex-col min-h-0"><TenantDetailsView tenantId={id} /></div>;
}
