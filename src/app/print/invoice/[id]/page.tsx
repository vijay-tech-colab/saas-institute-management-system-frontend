'use client';

import React, { useEffect } from 'react';
import { mockInvoices } from '@/features/subscriptions/data/mock-data';
import { format } from 'date-fns';
import { Printer, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function PrintInvoicePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const invoice = mockInvoices.find(i => i.id === params.id) || mockInvoices[0];

  useEffect(() => {
    // Optionally trigger print automatically when the page loads
    // const timer = setTimeout(() => {
    //   window.print();
    // }, 1000);
    // return () => clearTimeout(timer);
  }, []);

  if (!invoice) return <div className="p-10 text-center">Invoice not found</div>;

  return (
    <div className="min-h-screen bg-slate-200 py-8 print:py-0 print:bg-white font-sans text-slate-900">
      {/* Non-printable action bar */}
      <div className="max-w-[800px] mx-auto mb-4 flex items-center justify-between print:hidden px-4 sm:px-0">
        <Button variant="outline" className="bg-white" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={() => window.print()} className="bg-blue-600 text-white hover:bg-blue-700">
          <Printer className="w-4 h-4 mr-2" /> Print Invoice
        </Button>
      </div>

      {/* A4 Printable Area */}
      <div className="max-w-[800px] mx-auto bg-white shadow-xl print:shadow-none sm:rounded-xl print:rounded-none overflow-hidden print:w-full print:max-w-none">
        
        {/* Invoice Header */}
        <div className="p-8 sm:p-12 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-bold text-xl flex items-center justify-center">
              IM
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Institute Manager</h1>
              <p className="text-sm text-slate-500 font-medium">B2B SaaS Platform</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <h2 className="text-3xl font-black text-slate-200 uppercase tracking-widest mb-1">Invoice</h2>
            <p className="font-mono text-slate-700 font-bold">{invoice.invoiceNumber}</p>
          </div>
        </div>

        {/* Invoice Meta */}
        <div className="p-8 sm:p-12 grid grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Billed To</p>
            <p className="font-bold text-lg text-slate-900 mb-1">{invoice.instituteName}</p>
            <p className="text-slate-600 text-sm">{invoice.email}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Date</p>
              <p className="font-semibold text-slate-800">{format(new Date(invoice.invoiceDate), 'MMM d, yyyy')}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Due Date</p>
              <p className="font-semibold text-rose-600">{format(new Date(invoice.dueDate), 'MMM d, yyyy')}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
              <p className="font-bold capitalize text-slate-800">{invoice.status}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Payment Method</p>
              <p className="font-semibold text-slate-800">{invoice.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="px-8 sm:px-12">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-900">
                <th className="py-4 text-xs font-bold text-slate-900 uppercase tracking-widest">Description</th>
                <th className="py-4 text-xs font-bold text-slate-900 uppercase tracking-widest text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-6">
                  <p className="font-bold text-slate-900 text-lg mb-1">{invoice.planName} Subscription</p>
                  <p className="text-slate-500 text-sm">Software subscription and licensing fees</p>
                </td>
                <td className="py-6 text-right font-bold text-slate-900 text-lg">
                  ₹{invoice.amount.toLocaleString('en-IN')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="p-8 sm:p-12 flex justify-end">
          <div className="w-full max-w-xs space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-600">
              <span>Subtotal</span>
              <span>₹{invoice.amount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-semibold text-slate-600">
              <span>GST (18%)</span>
              <span>₹{invoice.gst.toLocaleString('en-IN')}</span>
            </div>
            {invoice.discount > 0 && (
              <div className="flex justify-between items-center text-sm font-bold text-emerald-600">
                <span>Discount</span>
                <span>- ₹{invoice.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-4 border-t-2 border-slate-900">
              <span className="font-black text-xl text-slate-900">Total</span>
              <span className="font-black text-2xl text-blue-600">₹{invoice.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 sm:p-12 bg-slate-50 mt-8 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm font-medium mb-1">Thank you for your business!</p>
          <p className="text-slate-400 text-xs">If you have any questions about this invoice, please contact billing@institutemanager.com</p>
        </div>
      </div>
    </div>
  );
}
