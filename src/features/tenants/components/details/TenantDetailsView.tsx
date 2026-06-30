'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { mockTenants, Tenant } from '../../data/mock-data';
import { format } from 'date-fns';
import { 
  ArrowLeft, Building2, CreditCard, LayoutDashboard, ShieldCheck, Settings,
  User, Mail, Phone, MapPin, Globe, Calendar, LogIn, ExternalLink, 
  Ban, RefreshCcw, Activity, Download, Key, HardDrive, CheckCircle2, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: 'subscription', label: 'Subscription', icon: <CreditCard className="w-4 h-4" /> },
  { id: 'usage', label: 'Usage & Resources', icon: <Activity className="w-4 h-4" /> },
  { id: 'security', label: 'Security', icon: <ShieldCheck className="w-4 h-4" /> },
  { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
];

function Tab_Overview({ tenant }: { tenant: Tenant }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Institute Information Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-400" /> Institute Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Institute Name</p>
              <p className="text-sm font-medium text-slate-900">{tenant.name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Tenant Code</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-md border border-blue-100">{tenant.code}</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Location</p>
              <p className="text-sm font-medium text-slate-900 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {tenant.state}, {tenant.country}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Created On</p>
              <p className="text-sm font-medium text-slate-900 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {format(new Date(tenant.createdAt), 'MMMM d, yyyy')}</p>
            </div>
          </div>
        </div>

        {/* Primary Contact Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <User className="w-4 h-4 text-slate-400" /> Primary Administrator
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                {tenant.ownerName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{tenant.ownerName}</p>
                <p className="text-xs text-slate-500">Institute Owner</p>
              </div>
            </div>
            <div className="h-px bg-slate-100 w-full"></div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a href={`mailto:${tenant.email}`} className="text-blue-600 hover:underline truncate">{tenant.email}</a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-700">{tenant.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-blue-200 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <User className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{tenant.usage.students.toLocaleString()}</p>
          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Total Students</p>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-emerald-200 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{tenant.usage.branches.toLocaleString()}</p>
          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Active Branches</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-purple-200 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <User className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{tenant.usage.users.toLocaleString()}</p>
          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Staff Members</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-amber-200 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <HardDrive className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{tenant.usage.storageUsedGB} <span className="text-base text-slate-400 font-medium">GB</span></p>
          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Storage Used</p>
        </div>
      </div>
    </div>
  );
}

function Tab_Subscription({ tenant }: { tenant: Tenant }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Current Plan Overview */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-blue-200 text-sm font-semibold mb-1 uppercase tracking-wider">Current Plan</p>
                <h2 className="text-3xl font-black">{tenant.plan} Plan</h2>
              </div>
              <div className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 font-bold text-xs rounded-lg border border-emerald-500/30">
                Active & Paid
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-blue-200/70 text-xs mb-1">Billing Cycle</p>
                <p className="font-semibold">Annually</p>
              </div>
              <div>
                <p className="text-blue-200/70 text-xs mb-1">Next Renewal</p>
                <p className="font-semibold">{format(new Date(tenant.expiryDate), 'MMMM d, yyyy')}</p>
              </div>
            </div>
            
            <div className="mt-auto flex items-center gap-3">
              <button className="px-5 py-2.5 bg-white text-blue-900 text-sm font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-sm">
                Upgrade Plan
              </button>
              <button className="px-5 py-2.5 bg-white/10 text-white border border-white/20 text-sm font-bold rounded-xl hover:bg-white/20 transition-colors">
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>

        {/* Add-ons & Features */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Included Features</h3>
          <ul className="space-y-3">
            {[
              'Unlimited Branches', 'Custom Domain', 'White-labeling', 'API Access', '24/7 Priority Support', 'Advanced Analytics'
            ].map(feature => (
              <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {feature}
              </li>
            ))}
          </ul>
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
                <td className="py-4 px-6 text-sm font-medium text-slate-900">INV-2026-00{i}</td>
                <td className="py-4 px-6 text-sm text-slate-600">$1,188.00</td>
                <td className="py-4 px-6 text-sm text-slate-600">{format(new Date(tenant.createdAt), 'MMM d, yyyy')}</td>
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

function Tab_Security({ tenant }: { tenant: Tenant }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Security Controls */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-400" /> Security Controls
          </h3>
          <div className="space-y-4">
            <div className="flex items-start justify-between p-4 border border-slate-100 rounded-xl bg-slate-50/50">
              <div>
                <p className="text-sm font-bold text-slate-900">Two-Factor Authentication</p>
                <p className="text-xs text-slate-500 mt-0.5">Enforced for all admin accounts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-start justify-between p-4 border border-slate-100 rounded-xl bg-slate-50/50">
              <div>
                <p className="text-sm font-bold text-slate-900">API Access</p>
                <p className="text-xs text-slate-500 mt-0.5">Allow generating REST API keys</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-start justify-between p-4 border border-slate-100 rounded-xl bg-slate-50/50">
              <div>
                <p className="text-sm font-bold text-slate-900">SSO Login</p>
                <p className="text-xs text-slate-500 mt-0.5">Google / Microsoft Single Sign-on</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input type="checkbox" className="sr-only peer" defaultChecked={false} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Audit Log Snippet */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Key className="w-4 h-4 text-slate-400" /> Recent Security Events
            </h3>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View Full Log</button>
          </div>
          <div className="flex-1 space-y-4">
            {[
              { event: 'Successful Login', user: tenant.ownerName, ip: '192.168.1.1', time: '2 mins ago', icon: <LogIn className="text-emerald-500" /> },
              { event: 'Password Changed', user: 'Admin User', ip: '10.0.0.4', time: '1 day ago', icon: <Key className="text-blue-500" /> },
              { event: 'Failed Login Attempt', user: 'Unknown', ip: '45.33.22.11', time: '2 days ago', icon: <AlertCircle className="text-rose-500" /> },
            ].map((log, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  {React.cloneElement(log.icon, { className: `w-3.5 h-3.5 ${log.icon.props.className}` })}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{log.event}</p>
                  <p className="text-xs text-slate-500">{log.user} • {log.ip} • {log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function Tab_Usage({ tenant }: { tenant: Tenant }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <User className="w-4 h-4 text-slate-400" /> User Allocations
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Students</span>
                <span className="text-sm font-bold text-slate-900">{tenant.usage.students} / 5000</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(tenant.usage.students / 5000) * 100}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Staff Members</span>
                <span className="text-sm font-bold text-slate-900">{tenant.usage.users} / 150</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(tenant.usage.users / 150) * 100}%` }}></div>
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
                <span className="text-sm font-bold text-slate-900">{tenant.usage.storageUsedGB} GB / {tenant.usage.maxStorageGB} GB</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(tenant.usage.storageUsedGB / tenant.usage.maxStorageGB) * 100}%` }}></div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Database</p>
                <p className="text-sm font-bold text-slate-900">45 GB</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Files</p>
                <p className="text-sm font-bold text-slate-900">{tenant.usage.storageUsedGB - 45} GB</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Backups</p>
                <p className="text-sm font-bold text-slate-900">120 GB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tab_Settings({ tenant }: { tenant: Tenant }) {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-slate-900 mb-2 border-b border-slate-100 pb-3">Branding</h3>
        
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
            <span className="text-xs font-semibold">Logo</span>
          </div>
          <div>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
              Upload New
            </button>
            <p className="text-xs text-slate-500 mt-2">Recommended: 512x512px transparent PNG</p>
          </div>
        </div>

        <h3 className="text-sm font-bold text-slate-900 mt-8 mb-2 border-b border-slate-100 pb-3">Domain Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Subdomain</label>
            <div className="flex items-center">
              <input type="text" defaultValue={tenant.code.toLowerCase()} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-l-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              <span className="px-4 py-2.5 bg-slate-100 border border-l-0 border-slate-200 text-slate-500 text-sm rounded-r-xl font-medium">.instituteos.com</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Custom Domain</label>
            <input type="text" placeholder="e.g. portal.globaltech.edu" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-blue-700 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Main Container
// ----------------------------------------------------------------------

export function TenantDetailsView({ tenantId }: { tenantId: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find tenant by ID, or fallback to first mock tenant
  const tenant = mockTenants.find(t => t.id === tenantId) || mockTenants[0];

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
                  onClick={() => router.push('/dashboard/tenants/list')}
                  aria-label="Back to institutes"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 sm:flex">
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] font-bold tracking-wide text-slate-600">
                      {tenant.id}
                    </span>
                    <StatusBadge status={tenant.status} />
                    <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-700">
                      {tenant.plan} plan
                    </span>
                  </div>
                  <h1 className="max-w-4xl text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    {tenant.name}
                  </h1>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5"><Globe className="h-4 w-4" /> {tenant.code.toLowerCase()}.instituteos.com</span>
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {tenant.state}, {tenant.country}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end lg:self-auto">
                <Button variant="outline" className="border-slate-200 bg-white shadow-sm">
                  <ExternalLink className="mr-2 h-4 w-4" /> Login as Tenant
                </Button>
                {tenant.status === 'active' ? (
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
                  <p className="text-sm font-semibold text-slate-800">{tenant.plan} · Annual billing</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm ring-1 ring-slate-200">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Students</p>
                  <p className="text-sm font-semibold text-slate-800">{tenant.usage.students.toLocaleString()} enrolled</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm ring-1 ring-slate-200">
                  <HardDrive className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Storage</p>
                  <p className="text-sm font-semibold text-slate-800">{tenant.usage.storageUsedGB} / {tenant.usage.maxStorageGB} GB</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-emerald-50 px-3.5 py-3 ring-1 ring-emerald-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Next renewal</p>
                  <p className="text-sm font-semibold text-emerald-700">{format(new Date(tenant.expiryDate), 'MMM d, yyyy')}</p>
                </div>
              </div>
            </div>

            <nav className="-mb-5 overflow-x-auto border-t border-slate-100 pt-1 sm:-mb-6" aria-label="Institute details sections">
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
              {activeTab === 'overview' && <Tab_Overview tenant={tenant} />}
              {activeTab === 'subscription' && <Tab_Subscription tenant={tenant} />}
              {activeTab === 'security' && <Tab_Security tenant={tenant} />}
              {activeTab === 'usage' && <Tab_Usage tenant={tenant} />}
              {activeTab === 'settings' && <Tab_Settings tenant={tenant} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
