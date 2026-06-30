'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Activity, Check, Users, Settings2, Globe, Clock, Power, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PolicyDetailsHubProps {
  policyId: string;
}

export function PolicyDetailsHub({ policyId }: PolicyDetailsHubProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'conditions' | 'users'>('overview');

  const tabs = [
    { id: 'overview', label: 'Policy Overview', icon: Activity },
    { id: 'conditions', label: 'Conditions Matrix', icon: Settings2 },
    { id: 'users', label: 'Affected Users', icon: Users },
  ];

  return (
    <div className="flex-1 w-full flex flex-col min-h-0 bg-slate-50/70 p-4 sm:p-6 xl:p-8">
      <div className="mx-auto flex w-full flex-col gap-5 h-full">
        <header className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 shrink-0">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-rose-100/70 blur-3xl" />
          <div className="relative flex flex-col gap-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
              <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="mt-0.5 shrink-0 rounded-xl border-slate-200 shadow-sm hover:bg-slate-50"
                  onClick={() => router.push('/dashboard/iam/policies')}
                  aria-label="Back to policies"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white shadow-lg shadow-rose-200 sm:flex">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] font-bold tracking-wide text-slate-600">
                      {policyId}
                    </span>
                    <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-700">
                      Security Policy
                    </span>
                  </div>
                  <h1 className="max-w-4xl text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    Require MFA for Super Admins
                  </h1>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                    <span>Manage configuration, conditions, and impacted users for this security policy.</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end lg:self-auto">
                <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800">
                  <Check className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center gap-2 border-b border-slate-200 mb-6 px-1 shrink-0 overflow-x-auto hide-scrollbar">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-3 px-4 text-sm font-bold border-b-2 transition-all relative whitespace-nowrap ${isActive ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-auto bg-transparent relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col"
              >
                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 lg:p-8 w-full">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Basic Information</h3>
                        <p className="text-sm text-slate-500 mt-1">Core details and metadata for this policy.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 border border-slate-100 rounded-xl bg-slate-50 flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center shrink-0">
                            <ShieldAlert className="w-5 h-5 text-rose-600" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Policy Type</p>
                            <p className="text-sm font-bold text-slate-900 mt-1">Security Rule</p>
                          </div>
                        </div>

                        <div className="p-4 border border-slate-100 rounded-xl bg-slate-50 flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                            <Users className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Role</p>
                            <p className="text-sm font-bold text-slate-900 mt-1">Super Admin</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 border border-amber-200 bg-amber-50 rounded-2xl mt-4">
                        <div className="flex items-start gap-3">
                          <Activity className="w-5 h-5 text-amber-600 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-bold text-amber-900">Audit Trail Active</h4>
                            <p className="text-xs text-amber-700 mt-1">This policy is actively enforced. Any configuration changes will be logged in the system audit trail for compliance purposes.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'conditions' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">Conditions Matrix</h3>
                          <p className="text-sm text-slate-500 mt-1">Define the strict conditions required for this policy to pass.</p>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col flex-1 min-h-[400px]">
                        <table className="w-full text-left border-collapse">
                          <thead className="sticky top-0 bg-white shadow-[0_1px_0_rgba(0,0,0,0.05)] z-10">
                            <tr>
                              <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Condition Variable</th>
                              <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Operator</th>
                              <th className="py-3 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Required Value</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            <tr className="hover:bg-slate-50/30 transition-colors">
                              <td className="py-4 px-6 text-sm font-semibold text-slate-700">user.mfa_enabled</td>
                              <td className="py-4 px-6 text-sm font-mono text-slate-500">EQUALS</td>
                              <td className="py-4 px-6 text-sm font-semibold text-emerald-600 bg-emerald-50 rounded">true</td>
                            </tr>
                            <tr className="hover:bg-slate-50/30 transition-colors">
                              <td className="py-4 px-6 text-sm font-semibold text-slate-700">session.auth_method</td>
                              <td className="py-4 px-6 text-sm font-mono text-slate-500">IN</td>
                              <td className="py-4 px-6 text-sm font-semibold text-indigo-600">['authenticator', 'hardware_key']</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTab === 'users' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Affected Users</h3>
                        <p className="text-sm text-slate-500 mt-1">Users currently bound by this policy via their role assignments.</p>
                      </div>

                      <div className="border border-slate-200 rounded-xl flex items-center justify-center p-12">
                        <div className="text-center">
                          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                          <h4 className="text-sm font-bold text-slate-700">3 Users Affected</h4>
                          <p className="text-xs text-slate-500 mt-1">John Doe, Alice Smith, Bob Johnson</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
