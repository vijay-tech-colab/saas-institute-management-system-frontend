import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InstituteModuleView } from '@/features/institute-admin/components/InstituteModuleView';
import {
  getInstituteModuleConfig,
  INSTITUTE_MODULES_BY_ROUTE,
} from '@/features/institute-admin/config/modules-registry';

interface InstituteModulePageProps {
  params: Promise<{ slug: string[] }>;
}

export function generateStaticParams() {
  return Object.keys(INSTITUTE_MODULES_BY_ROUTE).map((route) => ({
    slug: route.replace(/^\/institute\//, '').split('/'),
  }));
}

export async function generateMetadata({
  params,
}: InstituteModulePageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getInstituteModuleConfig(`/institute/${slug.join('/')}`);
  if (!config) {
    return { title: 'Module Not Found - CampusOS' };
  }
  return {
    title: `${config.title} - CampusOS`,
    description: config.description,
  };
}

export default async function InstituteModulePage({
  params,
}: InstituteModulePageProps) {
  const { slug } = await params;
  const config = getInstituteModuleConfig(`/institute/${slug.join('/')}`);

  if (!config) {
    notFound();
  }

  return <InstituteModuleView config={config} />;
}
