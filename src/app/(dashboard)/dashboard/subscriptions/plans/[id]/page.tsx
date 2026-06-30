import { PlanDetailsView } from '@/features/subscriptions/components/details/PlanDetailsView';

export default function PlanDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex-1 w-full min-w-0">
      <PlanDetailsView planId={params.id} />
    </div>
  );
}
