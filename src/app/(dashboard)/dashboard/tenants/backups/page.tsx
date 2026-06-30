import { BackupManagement } from '@/features/tenants/components/backups/BackupManagement';

export const metadata = {
  title: 'Backup & Restore | Institute OS',
  description: 'Manage automated and manual backups across tenants.',
};

export default function BackupsPage() {
  return <div className="flex-1 p-4 md:p-6 w-full"><BackupManagement /></div>;
}
