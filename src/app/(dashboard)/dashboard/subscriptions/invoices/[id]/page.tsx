import { InvoiceDetailsView } from '@/features/subscriptions/components/details/InvoiceDetailsView';

export default function InvoiceDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex-1 w-full min-w-0">
      <InvoiceDetailsView invoiceId={params.id} />
    </div>
  );
}
