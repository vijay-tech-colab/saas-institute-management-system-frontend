import { DomainManagement } from '@/features/tenants/components/domains/DomainManagement';

export const metadata = {
  title: 'Domain Management | Institute OS',
  description: 'Manage custom domains and SSL certificates for all tenants.',
};

export default function DomainsPage() {
  return <div className="flex-1 p-4 md:p-6 w-full"><DomainManagement /></div>;
}
