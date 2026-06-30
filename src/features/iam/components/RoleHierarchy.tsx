'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { Shield, ChevronDown, ChevronRight, Check, Users, Lock, Plus, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Advanced Mock data representing a tree of roles
const ADVANCED_HIERARCHY_DATA = [
  {
    id: 'h1',
    role: 'Super Administrator',
    code: 'super_admin',
    level: 1,
    usersCount: 3,
    policiesCount: 24,
    children: [
      {
        id: 'h2',
        role: 'Institute Owner',
        code: 'institute_owner',
        level: 2,
        usersCount: 12,
        policiesCount: 18,
        children: [
          {
            id: 'h3',
            role: 'Branch Manager',
            code: 'branch_manager',
            level: 3,
            usersCount: 45,
            policiesCount: 12,
            children: [
              {
                id: 'h4',
                role: 'Teacher',
                code: 'teacher',
                level: 4,
                usersCount: 320,
                policiesCount: 5,
                children: []
              },
              {
                id: 'h5',
                role: 'Accountant',
                code: 'accountant',
                level: 4,
                usersCount: 8,
                policiesCount: 7,
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
];

const AdvancedRoleNode = ({ node, isLast }: { node: any; isLast?: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="relative">
      {/* Curved Connecting line to parent */}
      {node.level > 1 && (
        <div 
          className="absolute border-l-2 border-b-2 border-slate-200 rounded-bl-xl" 
          style={{
            left: '-28px',
            top: '-24px',
            bottom: 'calc(100% - 32px)',
            width: '28px'
          }}
        />
      )}
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white border ${isExpanded ? 'border-indigo-200 shadow-md shadow-indigo-100/50' : 'border-slate-200 shadow-sm'} rounded-2xl p-4 mb-4 w-full max-w-xl relative z-10 flex flex-col hover:border-indigo-300 transition-all cursor-default group`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              disabled={!hasChildren}
              className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                hasChildren 
                  ? 'hover:bg-slate-100 text-slate-500 cursor-pointer' 
                  : 'text-transparent cursor-default'
              }`}
            >
              {hasChildren && (
                isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
              )}
            </button>
            
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
              node.level === 1 ? 'bg-indigo-600 text-white' :
              node.level === 2 ? 'bg-emerald-500 text-white' :
              node.level === 3 ? 'bg-amber-500 text-white' : 'bg-slate-700 text-white'
            }`}>
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-base font-bold text-slate-900">{node.role}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  node.level === 1 ? 'bg-indigo-50 text-indigo-700' :
                  node.level === 2 ? 'bg-emerald-50 text-emerald-700' :
                  node.level === 3 ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  Level {node.level}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-500 mt-0.5">{node.code}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <Users className="w-3.5 h-3.5 text-indigo-500" /> {node.usersCount} Users
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mt-1">
                <Lock className="w-3.5 h-3.5 text-rose-500" /> {node.policiesCount} Policies
              </div>
            </div>

            {/* Actions visible on hover */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity border-l border-slate-100 pl-4 ml-2">
              <button className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Add Sub-Role">
                <Plus className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors" title="Options">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Children Container */}
      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative pl-8 sm:pl-12 overflow-hidden"
          >
            {/* Vertical line connecting children - stops before the last child to prevent hanging lines */}
            {!isLast && (
              <div 
                className="absolute left-[16px] sm:left-[28px] top-0 bottom-8 w-0.5 bg-slate-200" 
              />
            )}
            
            <div className="pt-2">
              {node.children.map((child: any, idx: number) => (
                <AdvancedRoleNode 
                  key={child.id} 
                  node={child} 
                  isLast={idx === node.children.length - 1} 
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function RoleHierarchy() {
  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="Role Hierarchy"
        description="Visualize and manage the inheritance tree. Child roles inherit permissions from their parents."
        breadcrumbs={[{ label: 'IAM', href: '/dashboard/iam' }, { label: 'Hierarchy' }]}
      >
        <button className="flex items-center gap-2 px-5 py-2 text-sm bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-sm shadow-indigo-200">
          <Check className="w-4 h-4" /> Save Hierarchy
        </button>
      </PageHeader>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col flex-1 overflow-auto min-h-0 mb-6 p-6 md:p-8">
        <div className="max-w-5xl w-full mx-auto">
          <div className="mb-8 p-5 bg-gradient-to-r from-indigo-50 to-white border border-indigo-100 rounded-2xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-indigo-900">Advanced Inheritance Mode</h3>
              <p className="text-xs text-indigo-700/80 mt-1 leading-relaxed max-w-3xl">
                Roles at the top of the tree automatically inherit all permissions granted to their descendants. 
                Use this advanced view to track user counts and applied policies across the inheritance chain. 
                Hover over any node to add sub-roles or configure exceptions.
              </p>
            </div>
          </div>

          <div className="pt-4 overflow-x-auto pb-20">
            <div className="min-w-[800px] pl-6">
              {ADVANCED_HIERARCHY_DATA.map((rootNode, idx) => (
                <AdvancedRoleNode 
                  key={rootNode.id} 
                  node={rootNode} 
                  isLast={idx === ADVANCED_HIERARCHY_DATA.length - 1} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
