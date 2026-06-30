import { CreateTenantWizard } from '@/features/tenants/components/create/CreateTenantWizard';

export const metadata = {
  title: 'Create Tenant | Institute OS',
  description: 'Onboard a new institute to the platform.',
};

export default function CreateTenantPage() {
  return <div className="flex-1 p-4 md:p-6 w-full"><CreateTenantWizard /></div>;
}
