'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { mockPlans } from '../../data/mock-data';
import { Plan } from '../../types';
import { format } from 'date-fns';
import { 
  ArrowLeft, Package, CreditCard, Users, Zap, CheckCircle2,
  XCircle, Edit2, Trash2, IndianRupee, Database, GitBranch,
  ShieldCheck, Smartphone, Settings, BarChart3, Globe, ExternalLink,
  MessageSquare, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { id: 'overview', label: 'Overview', icon: <Package className="w-4 h-4" /> },
  { id: 'features', label: 'Features', icon: <Zap className="w-4 h-4" /> },
  { id: 'pricing', label: 'Pricing', icon: <IndianRupee className="w-4 h-4" /> },
  { id: 'subscribers', label: 'Subscribers', icon: <Users className="w-4 h-4" /> },
];

function Tab_Overview({ plan }: { plan: Plan }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Plan Information Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Package className="w-4 h-4 text-slate-400" /> Plan Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <div className="md:col-span-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Description</p>
              <p className="text-sm font-medium text-slate-900">{plan.description}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Created On</p>
              <p className="text-sm font-medium text-slate-900">{format(new Date(plan.createdAt), 'MMMM d, yyyy')}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Last Updated</p>
              <p className="text-sm font-medium text-slate-900">{format(new Date(plan.updatedAt), 'MMMM d, yyyy')}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Trial Available</p>
              <p className="text-sm font-medium text-slate-900 flex items-center gap-1.5">
                {plan.trialAvailable ? (
                  <><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Yes ({plan.trialDays} days)</>
                ) : (
                  <><XCircle className="w-4 h-4 text-slate-400" /> No</>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-slate-400" /> Quick Stats
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Active Subscribers</span>
              <span className="text-sm font-bold text-slate-900">{plan.subscribersCount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Total Features</span>
              <span className="text-sm font-bold text-slate-900">{plan.featuresCount}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Monthly Price</span>
              <span className="text-sm font-bold text-slate-900">₹{plan.monthlyPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-sm font-medium text-slate-500">Yearly Price</span>
              <span className="text-sm font-bold text-slate-900">₹{plan.yearlyPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Features Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-blue-200 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">
            {plan.features.studentLimit >= 99999 ? 'Unlimited' : plan.features.studentLimit.toLocaleString()}
          </p>
          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Student Limit</p>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-emerald-200 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <GitBranch className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">
            {plan.features.branchLimit >= 999 ? 'Unlimited' : plan.features.branchLimit.toLocaleString()}
          </p>
          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Branch Limit</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-amber-200 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{plan.features.storage} <span className="text-base text-slate-400 font-medium">GB</span></p>
          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Storage Limit</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-purple-200 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{plan.features.userLimit >= 999 ? 'Unlimited' : plan.features.userLimit.toLocaleString()}</p>
          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">User Limit</p>
        </div>
      </div>
    </div>
  );
}

function Tab_Features({ plan }: { plan: Plan }) {
  const allFeatures = Object.entries(plan.features);
  
  const numericFeatures = allFeatures.filter(([, value]) => typeof value === 'number');
  const booleanFeatures = allFeatures.filter(([, value]) => typeof value === 'boolean');
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4 text-slate-400" /> Feature Availability
          </h3>
          <ul className="space-y-3">
            {booleanFeatures.map(([key, value]) => (
              <li key={key} className="flex items-center justify-between text-sm py-2 border-b border-slate-50 last:border-0">
                <span className="capitalize font-medium text-slate-700">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                {value ? (
                  <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Included
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                    <XCircle className="w-4 h-4" /> Not Included
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-fit">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Settings className="w-4 h-4 text-slate-400" /> Quantitative Limits
          </h3>
          <ul className="space-y-3">
            {numericFeatures.map(([key, value]) => (
              <li key={key} className="flex items-center justify-between text-sm py-2 border-b border-slate-50 last:border-0">
                <span className="capitalize font-medium text-slate-700">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                  {Number(value) >= 999 ? 'Unlimited' : Number(value).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Tab_Pricing({ plan }: { plan: Plan }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-blue-200 rounded-2xl p-8 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Monthly Billing</h3>
          <p className="text-sm text-slate-500 mb-6">Billed every month</p>
          <div className="flex items-end gap-2 mb-6">
            <p className="text-4xl font-black text-blue-600">₹{plan.monthlyPrice.toLocaleString()}</p>
            <p className="text-sm font-medium text-slate-400 mb-1">/ month</p>
          </div>
          <div className="bg-blue-50 text-blue-700 text-sm font-semibold p-4 rounded-xl border border-blue-100">
            Current Active Subscribers: {Math.round(plan.subscribersCount * 0.4).toLocaleString()} (40%)
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">Annual Billing</h3>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-lg border border-emerald-500/30">
                Save 16%
              </span>
            </div>
            <p className="text-indigo-200 text-sm mb-6">Billed once a year</p>
            <div className="flex items-end gap-2 mb-6">
              <p className="text-4xl font-black">₹{plan.yearlyPrice.toLocaleString()}</p>
              <p className="text-sm font-medium text-indigo-300 mb-1">/ year</p>
            </div>
            <div className="bg-white/10 text-white text-sm font-semibold p-4 rounded-xl border border-white/20 mt-auto">
              Current Active Subscribers: {Math.round(plan.subscribersCount * 0.6).toLocaleString()} (60%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tab_Subscribers({ plan }: { plan: Plan }) {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400" /> Recent Subscribers
          </h3>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All {plan.subscribersCount}</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase">Institute Name</th>
              <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase">Joined Date</th>
              <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase">Billing Cycle</th>
              <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase">Status</th>
              <th className="py-3 px-6 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[1, 2, 3, 4, 5].map(i => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 text-sm font-medium text-slate-900">Institute Name {i}</td>
                <td className="py-4 px-6 text-sm text-slate-600">{format(new Date(), 'MMM d, yyyy')}</td>
                <td className="py-4 px-6 text-sm text-slate-600">{i % 2 === 0 ? 'Monthly' : 'Annual'}</td>
                <td className="py-4 px-6">
                  <StatusBadge status="active" />
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-slate-400 hover:text-blue-600"><Eye className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Main Container
// ----------------------------------------------------------------------

export function PlanDetailsView({ planId }: { planId: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find plan by ID, or fallback to first mock plan
  const plan = mockPlans.find(p => p.id === planId) || mockPlans[0];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50/70 p-4 sm:p-6 xl:p-8">
      <div className="mx-auto flex max-w-[1540px] flex-col gap-5">
        <header className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="relative flex flex-col gap-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
              <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="mt-0.5 shrink-0 rounded-xl border-slate-200 shadow-sm"
                  onClick={() => router.push('/dashboard/subscriptions/plans')}
                  aria-label="Back to plans"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 sm:flex">
                  <Package className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] font-bold tracking-wide text-slate-600">
                      {plan.id}
                    </span>
                    <StatusBadge status={plan.status} />
                  </div>
                  <h1 className="max-w-4xl text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    {plan.name} Plan
                  </h1>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {plan.subscribersCount.toLocaleString()} subscribers</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end lg:self-auto">
                <Button variant="outline" className="border-slate-200 bg-white shadow-sm hover:bg-slate-50">
                  <Edit2 className="mr-2 h-4 w-4" /> Edit Plan
                </Button>
                <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </div>
            </div>

            <div className="grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm ring-1 ring-slate-200">
                  <IndianRupee className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Monthly Price</p>
                  <p className="text-sm font-semibold text-slate-800">₹{plan.monthlyPrice.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm ring-1 ring-slate-200">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Yearly Price</p>
                  <p className="text-sm font-semibold text-slate-800">₹{plan.yearlyPrice.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm ring-1 ring-slate-200">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Features</p>
                  <p className="text-sm font-semibold text-slate-800">{plan.featuresCount} included</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm ring-1 ring-slate-200">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Subscribers</p>
                  <p className="text-sm font-semibold text-slate-800">{plan.subscribersCount.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <nav className="-mb-5 overflow-x-auto border-t border-slate-100 pt-1 sm:-mb-6" aria-label="Plan details sections">
              <div className="flex min-w-max items-center gap-6">
                {TABS.map(tab => (
                  <button
                    type="button"
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 border-b-2 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </header>

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && <Tab_Overview plan={plan} />}
              {activeTab === 'features' && <Tab_Features plan={plan} />}
              {activeTab === 'pricing' && <Tab_Pricing plan={plan} />}
              {activeTab === 'subscribers' && <Tab_Subscribers plan={plan} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
