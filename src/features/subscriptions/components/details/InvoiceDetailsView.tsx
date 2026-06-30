'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/features/subscriptions/components/shared/StatusBadge';
import { mockInvoices } from '../../data/mock-data';
import { Invoice, InvoiceStatus } from '../../types';
import { format } from 'date-fns';
import { 
  ArrowLeft, Building2, CreditCard, Receipt, Activity,
  Download, Mail, Printer, Calendar, IndianRupee, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { id: 'overview', label: 'Invoice Summary', icon: <Receipt className="w-4 h-4" /> },
  { id: 'payment', label: 'Payment Details', icon: <CreditCard className="w-4 h-4" /> },
];

function Tab_Overview({ invoice }: { invoice: Invoice }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Invoice Summary Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" /> Invoice Line Items
            </h3>
            <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
              {invoice.invoiceNumber}
            </span>
          </div>

          <div className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50">
            <table className="w-full text-left">
              <thead className="bg-slate-100/50 border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase">Description</th>
                  <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-sm text-slate-900">Subscription: {invoice.planName}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Software subscription fees for the period</p>
                  </td>
                  <td className="py-4 px-4 text-right text-sm font-semibold text-slate-900">
                    ₹{invoice.amount.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div className="p-4 border-t border-slate-100 flex flex-col items-end gap-2 bg-white">
              <div className="flex justify-between w-64 text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-semibold text-slate-900">₹{invoice.amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between w-64 text-sm">
                <span className="text-slate-500">GST (18%)</span>
                <span className="font-semibold text-slate-900">₹{invoice.gst.toLocaleString('en-IN')}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between w-64 text-sm">
                  <span className="text-emerald-600">Discount</span>
                  <span className="font-semibold text-emerald-600">- ₹{invoice.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between w-64 text-base pt-2 border-t border-slate-100 mt-2">
                <span className="font-bold text-slate-900">Total</span>
                <span className="font-black text-blue-600">₹{invoice.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer & Info Card */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400" /> Billed To
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Institute Name</p>
                <p className="text-sm font-semibold text-slate-900">{invoice.instituteName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Email</p>
                <p className="text-sm font-medium text-blue-600">{invoice.email}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" /> Dates
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500">Invoice Date</span>
                <span className="text-sm font-semibold text-slate-900">{format(new Date(invoice.invoiceDate), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-slate-500">Due Date</span>
                <span className="text-sm font-semibold text-rose-600">{format(new Date(invoice.dueDate), 'MMM d, yyyy')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tab_Payment({ invoice }: { invoice: Invoice }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-slate-400" /> Payment Details
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Payment Method</span>
              <span className="text-sm font-bold text-slate-900 px-3 py-1 bg-slate-100 rounded-lg">{invoice.paymentMethod}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Total Amount</span>
              <span className="text-sm font-bold text-slate-900">₹{invoice.total.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-sm font-medium text-slate-500">Payment Status</span>
              <span className="text-sm font-bold capitalize text-slate-900">{invoice.status}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4 text-slate-400" /> Timeline
          </h3>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2" />
              <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-slate-900 text-xs">Invoice Created</div>
                  <time className="font-mono text-[10px] text-slate-500">{format(new Date(invoice.invoiceDate), 'MMM d, yyyy')}</time>
                </div>
                <div className="text-slate-500 text-xs">System generated invoice #{invoice.invoiceNumber}</div>
              </div>
            </div>

            {invoice.status === 'paid' && (
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2" />
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-slate-900 text-xs">Payment Received</div>
                    <time className="font-mono text-[10px] text-slate-500">Within {invoice.dueDate}</time>
                  </div>
                  <div className="text-slate-500 text-xs">Payment completed via {invoice.paymentMethod}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Main Container
// ----------------------------------------------------------------------

export function InvoiceDetailsView({ invoiceId }: { invoiceId: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find invoice by ID, or fallback to first mock invoice
  const invoice = mockInvoices.find(c => c.id === invoiceId) || mockInvoices[0];

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
                  onClick={() => router.push('/dashboard/subscriptions/invoices')}
                  aria-label="Back to invoices"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 sm:flex font-bold">
                  <Receipt className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] font-bold tracking-wide text-slate-600">
                      {invoice.invoiceNumber}
                    </span>
                    <StatusBadge status={invoice.status} />
                  </div>
                  <h1 className="max-w-4xl text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    Invoice for {invoice.instituteName}
                  </h1>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                    <span>Generated on {format(new Date(invoice.invoiceDate), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end lg:self-auto">
                <Button 
                  variant="outline" 
                  className="border-slate-200 bg-white shadow-sm hover:bg-slate-50"
                  onClick={() => window.open(`/print/invoice/${invoice.id}`, '_blank')}
                >
                  <Printer className="mr-2 h-4 w-4" /> Print
                </Button>
                <Button variant="outline" className="border-slate-200 bg-white shadow-sm hover:bg-slate-50">
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
                <Button className="bg-blue-600 text-white hover:bg-blue-700 shadow-sm">
                  <Mail className="mr-2 h-4 w-4" /> Email Invoice
                </Button>
              </div>
            </div>

            <div className="grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm ring-1 ring-slate-200">
                  <IndianRupee className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Amount</p>
                  <p className="text-sm font-semibold text-slate-800">₹{invoice.total.toLocaleString('en-IN')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm ring-1 ring-slate-200">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Payment Method</p>
                  <p className="text-sm font-semibold text-slate-800">{invoice.paymentMethod}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm ring-1 ring-slate-200">
                  <Building2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Plan Category</p>
                  <p className="text-sm font-semibold text-slate-800">{invoice.planName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-rose-50 px-3.5 py-3 ring-1 ring-rose-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-rose-600 shadow-sm ring-1 ring-rose-100">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-rose-500">Due Date</p>
                  <p className="text-sm font-semibold text-rose-700">{format(new Date(invoice.dueDate), 'MMM d, yyyy')}</p>
                </div>
              </div>
            </div>

            <nav className="-mb-5 overflow-x-auto border-t border-slate-100 pt-1 sm:-mb-6" aria-label="Invoice details sections">
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
              {activeTab === 'overview' && <Tab_Overview invoice={invoice} />}
              {activeTab === 'payment' && <Tab_Payment invoice={invoice} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
