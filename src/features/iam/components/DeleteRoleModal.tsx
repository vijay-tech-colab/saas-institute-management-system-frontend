import React, { useState } from 'react';
import { Modal } from '@/features/subscriptions/components/shared/UIComponents';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface DeleteRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number;
}

export function DeleteRoleModal({ isOpen, onClose, onConfirm, count }: DeleteRoleModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onConfirm();
      setIsDeleting(false);
      onClose();
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Role" size="sm">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Confirm Deletion</h3>
            <p className="text-sm text-slate-600">
              Are you sure you want to delete {count > 1 ? `these ${count} roles` : 'this role'}? This action cannot be undone and will revoke all associated permissions from users assigned to {count > 1 ? 'these roles' : 'this role'}.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-70 disabled:cursor-not-allowed rounded-xl transition-colors flex items-center gap-2 shadow-sm shadow-rose-200"
          >
            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
