import { TenantList } from '@/features/tenants/components/list/TenantList';

export const metadata = {
  title: 'Institutes List | Institute OS',
  description: 'View and manage all registered institutes.',
};

export default function TenantListPage() {
  return <div className="flex-1 p-4 md:p-6 w-full"><TenantList /></div>;
}
