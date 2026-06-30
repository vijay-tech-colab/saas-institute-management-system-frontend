import { SuspendedTenants } from '@/features/tenants/components/suspended/SuspendedTenants';

export const metadata = {
  title: 'Suspended Institutes | Institute OS',
  description: 'View and manage suspended tenant accounts.',
};

export default function SuspendedPage() {
  return <div className="flex-1 p-4 md:p-6 w-full"><SuspendedTenants /></div>;
}
