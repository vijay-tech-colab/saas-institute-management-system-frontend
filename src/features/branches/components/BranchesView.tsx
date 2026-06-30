"use client"
import React, { useState } from 'react';
import { BranchStats } from './BranchStats';
import { BranchList, Branch } from './BranchList';
import { AddBranchModal } from './AddBranchModal';
import { Plus } from 'lucide-react';

const DUMMY_BRANCHES: Branch[] = [
  {
    id: '1',
    name: 'Main Campus',
    code: 'VNS-01',
    manager: 'Dr. Anita Sharma',
    email: 'anita@institute.edu',
    phone: '+91 98765 43210',
    studentCount: 850,
    status: 'active'
  },
  {
    id: '2',
    name: 'Downtown Center',
    code: 'DT-02',
    manager: 'Rajeev Kumar',
    email: 'rajeev.k@institute.edu',
    phone: '+91 98765 43211',
    studentCount: 320,
    status: 'active'
  },
  {
    id: '3',
    name: 'TechHub Noida',
    code: 'ND-01',
    manager: 'Sarah Jenkins',
    email: 'sarah.j@institute.edu',
    phone: '+91 98765 43212',
    studentCount: 0,
    status: 'maintenance'
  }
];

export function BranchesView() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Institute Branches</h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitor, edit, and add dynamic branch campuses under your computer institute network.
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer flex-shrink-0"
        >
          <Plus className="w-5 h-5" /> Add New Branch
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        <BranchStats />
        <BranchList branches={DUMMY_BRANCHES} />
      </div>

      {/* Modal */}
      <AddBranchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}
