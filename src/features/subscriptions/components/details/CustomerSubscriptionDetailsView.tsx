'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { mockCustomers } from '../../data/mock-data';
import { CustomerSubscription, SubscriptionStatus } from '../../types';
import { format } from 'date-fns';
import { 
  ArrowLeft, Building2, CreditCard, Users, GitBranch,
  ShieldCheck, Smartphone, Settings, BarChart3, Globe, ExternalLink,
  MapPin, User, Mail, Phone, Calendar, Download, RefreshCcw, Ban, HardDrive
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'usage', label: 'Usage & Limits', icon: <HardDrive className="w-4 h-4" /> },
  { id: 'billing', label: 'Billing & Invoices', icon: <CreditCard className="w-4 h-4" /> },
];

function Tab_Overview({ customer }: { customer: CustomerSubscription }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Customer Information Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-400" /> Institute Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Institute Name</p>
              <p className="text-sm font-medium text-slate-900">{customer.instituteName}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Owner Name</p>
              <p className="text-sm font-medium text-slate-900">{customer.ownerName}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Location</p>
              <p className="text-sm font-medium text-slate-900 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {customer.city}, {customer.country}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Contact Email</p>
              <p className="text-sm font-medium text-blue-600 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> {customer.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Subscription Start</p>
              <p className="text-sm font-medium text-slate-900 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {format(new Date(customer.startDate), 'MMMM d, yyyy')}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Subscription End</p>
              <p className="text-sm font-medium text-slate-900 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {format(new Date(customer.endDate), 'MMMM d, yyyy')}</p>
            </div>
          </div>
        </div>

        {/* Subscription Plan Summary */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-slate-400" /> Subscription Plan
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Current Plan</span>
              <span className="text-sm font-bold text-slate-900">{customer.currentPlan}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Billing Cycle</span>
              <span className="text-sm font-bold text-slate-900 capitalize">{customer.billingCycle}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Monthly Revenue</span>
              <span className="text-sm font-bold text-emerald-600">₹{customer.monthlyRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-sm font-medium text-slate-500">Payment Status</span>
              <span className="text-sm font-bold capitalize text-slate-900">{customer.paymentStatus}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-blue-200 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{customer.studentsUsed.toLocaleString()} <span className="text-sm text-slate-400">/ {customer.studentsLimit}</span></p>
          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Students Enrolled</p>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-emerald-200 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <GitBranch className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{customer.branchesUsed} <span className="text-sm text-slate-400">/ {customer.branchesLimit}</span></p>
          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Active Branches</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-amber-200 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <HardDrive className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{customer.storageUsed} <span className="text-sm font-medium text-slate-400">GB</span></p>
          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Storage Used</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-purple-200 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xl font-black text-slate-900 truncate">₹{(customer.monthlyRevenue * 12).toLocaleString()}</p>
          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Annual Value</p>
        </div>
      </div>
    </div>
  );
}

function Tab_Usage({ customer }: { customer: CustomerSubscription }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400" /> Usage vs Limits
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Students</span>
                <span className="text-sm font-bold text-slate-900">{customer.studentsUsed.toLocaleString()} / {customer.studentsLimit >= 99999 ? 'Unlimited' : customer.studentsLimit.toLocaleString()}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (customer.studentsUsed / customer.studentsLimit) * 100)}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Branches</span>
                <span className="text-sm font-bold text-slate-900">{customer.branchesUsed} / {customer.branchesLimit >= 999 ? 'Unlimited' : customer.branchesLimit}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, (customer.branchesUsed / customer.branchesLimit) * 100)}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-slate-400" /> Storage Utilization
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Total Storage</span>
                <span className="text-sm font-bold text-slate-900">{customer.storageUsed} GB / {customer.storageLimit >= 999 ? 'Unlimited' : `${customer.storageLimit} GB`}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(100, (customer.storageUsed / customer.storageLimit) * 100)}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tab_Billing({ customer }: { customer: CustomerSubscription }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Current Plan Overview */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-indigo-200 text-sm font-semibold mb-1 uppercase tracking-wider">Current Plan</p>
                <h2 className="text-3xl font-black">{customer.currentPlan} Plan</h2>
              </div>
              <div className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 font-bold text-xs rounded-lg border border-emerald-500/30">
                {customer.status === 'active' ? 'Active & Paid' : customer.status}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-indigo-200/70 text-xs mb-1">Billing Cycle</p>
                <p className="font-semibold capitalize">{customer.billingCycle}</p>
              </div>
              <div>
                <p className="text-indigo-200/70 text-xs mb-1">Next Renewal</p>
                <p className="font-semibold">{format(new Date(customer.renewalDate), 'MMMM d, yyyy')}</p>
              </div>
            </div>
            
            <div className="mt-auto flex items-center gap-3">
              <button className="px-5 py-2.5 bg-white text-indigo-900 text-sm font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-sm">
                Change Plan
              </button>
              <button className="px-5 py-2.5 bg-white/10 text-white border border-white/20 text-sm font-bold rounded-xl hover:bg-white/20 transition-colors">
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-900">Billing History</h3>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase">Invoice</th>
              <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase">Amount</th>
              <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase">Date</th>
              <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase">Status</th>
              <th className="py-3 px-6 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[1, 2, 3].map(i => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 text-sm font-medium text-slate-900">INV-2024-00{i}</td>
                <td className="py-4 px-6 text-sm text-slate-600">₹{(customer.monthlyRevenue * (customer.billingCycle === 'yearly' ? 12 : 1)).toLocaleString()}</td>
                <td className="py-4 px-6 text-sm text-slate-600">{format(new Date(customer.startDate), 'MMM d, yyyy')}</td>
                <td className="py-4 px-6">
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded border border-emerald-200">Paid</span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-slate-400 hover:text-blue-600"><Download className="w-4 h-4" /></button>
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

export function CustomerSubscriptionDetailsView({ customerId }: { customerId: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find customer by ID, or fallback to first mock customer
  const customer = mockCustomers.find(c => c.id === customerId) || mockCustomers[0];

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
                  onClick={() => router.push('/dashboard/subscriptions/customers')}
                  aria-label="Back to customers"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 sm:flex font-bold">
                  {customer.instituteName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] font-bold tracking-wide text-slate-600">
                      {customer.id}
                    </span>
                    <StatusBadge status={customer.status as SubscriptionStatus} />
                    <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-700">
                      {customer.currentPlan} plan
                    </span>
                  </div>
                  <h1 className="max-w-4xl text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    {customer.instituteName}
                  </h1>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {customer.city}, {customer.country}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end lg:self-auto">
                <Button variant="outline" className="border-slate-200 bg-white shadow-sm hover:bg-slate-50">
                  <ExternalLink className="mr-2 h-4 w-4" /> Login as Admin
                </Button>
                {customer.status === 'active' ? (
                  <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700">
                    <Ban className="mr-2 h-4 w-4" /> Suspend
                  </Button>
                ) : (
                  <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800">
                    <RefreshCcw className="mr-2 h-4 w-4" /> Reactivate
                  </Button>
                )}
              </div>
            </div>

            <div className="grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm ring-1 ring-slate-200">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current plan</p>
                  <p className="text-sm font-semibold text-slate-800">{customer.currentPlan} · <span className="capitalize">{customer.billingCycle}</span></p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm ring-1 ring-slate-200">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Students</p>
                  <p className="text-sm font-semibold text-slate-800">{customer.studentsUsed.toLocaleString()} enrolled</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm ring-1 ring-slate-200">
                  <HardDrive className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Storage</p>
                  <p className="text-sm font-semibold text-slate-800">{customer.storageUsed} / {customer.storageLimit} GB</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-emerald-50 px-3.5 py-3 ring-1 ring-emerald-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Next renewal</p>
                  <p className="text-sm font-semibold text-emerald-700">{format(new Date(customer.renewalDate), 'MMM d, yyyy')}</p>
                </div>
              </div>
            </div>

            <nav className="-mb-5 overflow-x-auto border-t border-slate-100 pt-1 sm:-mb-6" aria-label="Customer details sections">
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
              {activeTab === 'overview' && <Tab_Overview customer={customer} />}
              {activeTab === 'usage' && <Tab_Usage customer={customer} />}
              {activeTab === 'billing' && <Tab_Billing customer={customer} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
