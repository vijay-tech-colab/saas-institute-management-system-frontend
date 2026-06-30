import React, { useState, useEffect } from 'react';
import { Modal } from '@/features/subscriptions/components/shared/UIComponents';
import { Loader2, ShieldCheck, Key, AlignLeft, Hash } from 'lucide-react';

interface Role {
  id: string;
  displayName: string;
  code: string;
  description: string;
  type: 'system' | 'custom';
  priority: number;
}

interface CreateEditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role | null;
  onSave: (role: Partial<Role>) => void;
}

export function CreateEditRoleModal({ isOpen, onClose, role, onSave }: CreateEditRoleModalProps) {
  const [formData, setFormData] = useState<Partial<Role>>({
    displayName: '',
    code: '',
    description: '',
    priority: 50,
    type: 'custom',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (role) {
      setFormData(role);
    } else {
      setFormData({
        displayName: '',
        code: '',
        description: '',
        priority: 50,
        type: 'custom',
      });
    }
  }, [role, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onSave(formData);
      setIsSaving(false);
      onClose();
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={role ? 'Edit Role' : 'Create New Role'} size="md">
      <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[80vh]">
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" /> Role Display Name
              </label>
              <input
                required
                type="text"
                placeholder="e.g., Support Executive"
                value={formData.displayName}
                onChange={e => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Key className="w-3.5 h-3.5 text-indigo-500" /> Internal Code
              </label>
              <input
                required
                type="text"
                placeholder="e.g., SUPPORT_EXEC"
                value={formData.code}
                onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase().replace(/\s+/g, '_') })}
                disabled={role?.type === 'system'}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-sm font-medium uppercase placeholder:normal-case disabled:opacity-60 disabled:cursor-not-allowed"
              />
              {role?.type === 'system' && (
                <p className="text-[10px] text-amber-600 mt-1.5 font-medium">System role codes cannot be modified.</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                <AlignLeft className="w-3.5 h-3.5 text-indigo-500" /> Description
              </label>
              <textarea
                required
                rows={3}
                placeholder="What is the purpose of this role?"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-sm font-medium resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Hash className="w-3.5 h-3.5 text-indigo-500" /> Priority Level (1-100)
              </label>
              <input
                required
                type="number"
                min="1"
                max="100"
                value={formData.priority}
                onChange={e => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-sm font-medium"
              />
              <p className="text-[10px] text-slate-500 mt-1.5">Higher priority roles can manage lower priority roles.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-2xl shrink-0 mt-auto">
          <button 
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={isSaving}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed rounded-xl transition-colors flex items-center gap-2 shadow-sm shadow-indigo-200"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {isSaving ? 'Saving...' : role ? 'Save Changes' : 'Create Role'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
