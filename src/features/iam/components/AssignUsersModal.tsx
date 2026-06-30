import React, { useState } from 'react';
import { Modal, SearchInput } from '@/features/subscriptions/components/shared/UIComponents';
import { Loader2, UserPlus, Check, Users } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock list of all available users in the system to assign
const MOCK_ALL_USERS = [
  { id: 'u1', name: 'John Doe', email: 'john@example.com', avatar: 'JD' },
  { id: 'u2', name: 'Jane Smith', email: 'jane@example.com', avatar: 'JS' },
  { id: 'u3', name: 'Mike Johnson', email: 'mike@example.com', avatar: 'MJ' },
  { id: 'u4', name: 'Sarah Williams', email: 'sarah@example.com', avatar: 'SW' },
  { id: 'u5', name: 'David Brown', email: 'david@example.com', avatar: 'DB' },
];

interface AssignUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (userIds: string[]) => void;
  roleName: string;
  alreadyAssignedIds?: string[];
}

export function AssignUsersModal({ isOpen, onClose, onAssign, roleName, alreadyAssignedIds = [] }: AssignUsersModalProps) {
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);

  // Filter out already assigned users from the main list
  const availableUsers = MOCK_ALL_USERS.filter(u => !alreadyAssignedIds.includes(u.id));
  
  const filteredUsers = availableUsers.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleUser = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleAssign = () => {
    setIsSaving(true);
    setTimeout(() => {
      onAssign(Array.from(selectedIds));
      setIsSaving(false);
      setSelectedIds(new Set());
      setSearch('');
      onClose();
    }, 800);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Assign Users to ${roleName}`} size="md">
      <div className="flex flex-col h-[60vh] max-h-[600px]">
        <div className="p-6 border-b border-slate-100 shrink-0">
          <SearchInput 
            value={search} 
            onChange={setSearch} 
            placeholder="Search users by name or email..." 
          />
          <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> Select one or more users to assign to this role.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-50/50">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => {
              const isSelected = selectedIds.has(user.id);
              return (
                <div 
                  key={user.id}
                  onClick={() => handleToggleUser(user.id)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                    isSelected 
                      ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                      : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {user.avatar}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-900'}`}>{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300'}`}>
                    {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-3 opacity-60">
              <UserPlus className="w-10 h-10" />
              <p className="text-sm font-medium">No users found to assign.</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-white flex items-center justify-between shrink-0">
          <span className="text-sm font-semibold text-slate-600">
            {selectedIds.size} user{selectedIds.size !== 1 && 's'} selected
          </span>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button 
              onClick={handleAssign}
              disabled={isSaving || selectedIds.size === 0}
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed rounded-xl transition-colors flex items-center gap-2 shadow-sm shadow-indigo-200"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {isSaving ? 'Assigning...' : 'Assign Users'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
