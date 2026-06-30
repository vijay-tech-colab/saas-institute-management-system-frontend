import { SupportTickets } from '@/features/tenants/components/support/SupportTickets';

export const metadata = {
  title: 'Support Tickets | Institute OS',
  description: 'Manage support tickets from institute administrators.',
};

export default function SupportPage() {
  return <div className="flex-1 p-4 md:p-6 w-full"><SupportTickets /></div>;
}
