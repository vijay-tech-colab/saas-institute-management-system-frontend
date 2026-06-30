import React from "react"
import { useAtomValue } from "jotai"
import { userAtom } from "@/store/user-store"
import { CreditCard, CheckCircle2, Download, ExternalLink } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export function BillingSettings() {
  const user = useAtomValue(userAtom)
  const isSuperAdmin = user.role === 'SUPER_ADMIN'

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{isSuperAdmin ? 'Global Billing & Subscriptions' : 'Plan & Billing'}</h2>
          <p className="text-sm text-slate-500 mt-1">
            {isSuperAdmin ? 'Manage platform pricing plans and Stripe integrations.' : 'Manage your institute subscription and billing details.'}
          </p>
        </div>
        {!isSuperAdmin && (
          <button className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">
            Upgrade Plan
          </button>
        )}
      </div>

      {isSuperAdmin ? (
        <SuperAdminBillingView />
      ) : (
        <AdminBillingView />
      )}
    </div>
  )
}

function AdminBillingView() {
  const [selectedInvoices, setSelectedInvoices] = useState<Set<number>>(new Set());
  const invoices = [
    { date: 'Oct 01, 2026', amount: '$299.00', status: 'Paid' },
    { date: 'Sep 01, 2026', amount: '$299.00', status: 'Paid' },
    { date: 'Aug 01, 2026', amount: '$299.00', status: 'Paid' },
  ];

  const toggleSelectAll = () => {
    if (selectedInvoices.size === invoices.length) {
      setSelectedInvoices(new Set());
    } else {
      setSelectedInvoices(new Set(invoices.map((_, i) => i)));
    }
  };

  const toggleSelect = (i: number) => {
    const next = new Set(selectedInvoices);
    if (next.has(i)) { next.delete(i); } else { next.add(i); }
    setSelectedInvoices(next);
  };

  return (
    <div className="max-w-3xl space-y-8">
      {/* Current Plan */}
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Current Plan</h3>
        <div className="p-6 border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full">Active</span>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <h4 className="text-3xl font-bold text-slate-900">Pro Plan</h4>
            <span className="text-slate-500 font-medium mb-1">/ month</span>
          </div>
          <p className="text-sm text-slate-600 mb-6">Billed $299.00 on the 1st of every month.</p>
          
          <div className="space-y-3">
            {['Up to 5,000 Students', 'Advanced Analytics Dashboard', 'Priority Email Support'].map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium text-slate-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Method */}
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-slate-400" /> Payment Method
        </h3>
        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-slate-100 border border-slate-200 rounded flex items-center justify-center font-bold text-slate-800 text-xs italic">
              VISA
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Visa ending in 4242</p>
              <p className="text-xs text-slate-500">Expires 12/2028</p>
            </div>
          </div>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">Edit</button>
        </div>
      </section>

      {/* Billing History */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Billing History</h3>
          <button className="text-sm font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">Download All</button>
        </div>
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold w-12 text-center align-middle">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedInvoices.size === invoices.length && invoices.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {invoices.map((inv, i) => (
                <tr 
                  key={i} 
                  className={`hover:bg-slate-50 transition-colors cursor-pointer ${selectedInvoices.has(i) ? 'bg-indigo-50/50' : ''}`}
                  onClick={() => toggleSelect(i)}
                >
                  <td className="px-4 py-3 text-center align-middle">
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={selectedInvoices.has(i)}
                        onCheckedChange={() => toggleSelect(i)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-900 font-medium">{inv.date}</td>
                  <td className="px-4 py-3 text-slate-600">{inv.amount}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-md">{inv.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <button className="text-slate-400 hover:text-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">
                      <Download className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function SuperAdminBillingView() {
  return (
    <div className="max-w-3xl space-y-8">
      {/* Stripe Integration */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Stripe Integration</h3>
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-md">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Connected
          </span>
        </div>
        <div className="p-6 border border-slate-200 rounded-xl bg-white space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Stripe Secret Key</label>
            <input type="password" defaultValue="sk_test_1234567890abcdef" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Stripe Webhook Secret</label>
            <input type="password" defaultValue="whsec_1234567890abcdef" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all" />
          </div>
          <div className="pt-2 flex justify-end">
             <button className="px-5 py-2 bg-slate-900 text-white font-semibold rounded-lg shadow-sm hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">
              Update Keys
            </button>
          </div>
        </div>
      </section>

      {/* Subscription Plans Configuration */}
      <section>
         <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Platform Subscription Plans</h3>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">Create New Plan</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 border border-slate-200 rounded-xl bg-white relative">
            <h4 className="text-lg font-bold text-slate-900">Basic</h4>
            <p className="text-2xl font-bold mt-1">$99<span className="text-sm text-slate-500 font-normal">/mo</span></p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-500">421 Active Subscribers</span>
              <button className="text-indigo-600 hover:text-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"><ExternalLink className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="p-5 border border-indigo-200 rounded-xl bg-indigo-50 relative">
            <h4 className="text-lg font-bold text-slate-900">Pro <span className="ml-2 px-2 py-0.5 bg-indigo-200 text-indigo-800 text-[10px] uppercase rounded-full">Popular</span></h4>
            <p className="text-2xl font-bold mt-1">$299<span className="text-sm text-slate-500 font-normal">/mo</span></p>
            <div className="mt-4 pt-4 border-t border-indigo-100 flex justify-between items-center">
              <span className="text-xs font-semibold text-indigo-600">856 Active Subscribers</span>
              <button className="text-indigo-600 hover:text-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"><ExternalLink className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


