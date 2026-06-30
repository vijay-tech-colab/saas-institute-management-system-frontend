import { PolicyDetailsHub } from '@/features/iam/components/PolicyDetailsHub';

export default async function PolicyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = await params;
  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PolicyDetailsHub policyId={unwrappedParams.id} />
    </div>
  );
}
