"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, TableProperties, Settings2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { ReportTemplates } from './ReportTemplates';
import { ReportCenter } from './ReportCenter';

export function ReportsManager() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState('pdf');

  return (
    <div className="p-4 md:p-6 w-full max-w-full flex flex-col h-[calc(100vh-64px)] space-y-4 print:h-auto print:space-y-0 print:p-0">
      <div className="print:hidden">
        <PageHeader 
          title="Reports Management" 
        description="Browse pre-built templates or generate custom analytics reports for your tenants."
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Reports Management' }
        ]}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 bg-slate-100/80 rounded-xl border border-slate-200 shadow-sm backdrop-blur-sm">
            {[
              { id: 'pdf', label: 'PDF', icon: FileText, color: 'text-rose-500' },
              { id: 'excel', label: 'Excel', icon: TableProperties, color: 'text-emerald-500' },
              { id: 'csv', label: 'CSV', icon: FileText, color: 'text-blue-500' },
            ].map(format => (
              <button
                key={format.id}
                onClick={() => setExportFormat(format.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-[0.98] ${
                  exportFormat === format.id 
                    ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-900/5' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                <format.icon className={`w-3.5 h-3.5 ${exportFormat === format.id ? format.color : 'text-slate-400'}`} />
                {format.label}
              </button>
            ))}
          </div>
        </div>
      </PageHeader>
      </div>

      <div className="flex-1 min-h-0 relative print:hidden">
        <ReportTemplates onSelectTemplate={setSelectedTemplate} />
      </div>

      <AnimatePresence>
        {selectedTemplate && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 print:static print:bg-transparent print:p-0"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="w-full max-w-6xl h-[96vh] sm:h-[90vh] bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col ring-1 ring-slate-900/10 print:shadow-none print:ring-0 print:h-auto print:rounded-none"
            >
              <ReportCenter 
                templateId={selectedTemplate} 
                exportFormat={exportFormat} 
                onBack={() => setSelectedTemplate(null)} 
                onChangeTemplate={setSelectedTemplate}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
