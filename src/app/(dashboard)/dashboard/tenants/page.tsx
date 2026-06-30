import { TenantDashboard } from '@/features/tenants/components/dashboard/TenantDashboard';

export const metadata = {
  title: 'Tenant Management | Institute OS',
  description: 'Manage all institutes on the platform.',
};

export default function TenantsPage() {
  return <div className="flex-1 p-4 md:p-6 w-full"><TenantDashboard /></div>;
}
