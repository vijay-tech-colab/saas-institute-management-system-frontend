import { CustomerSubscriptionDetailsView } from '@/features/subscriptions/components/details/CustomerSubscriptionDetailsView';

export default function CustomerDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex-1 w-full min-w-0">
      <CustomerSubscriptionDetailsView customerId={params.id} />
    </div>
  );
}
