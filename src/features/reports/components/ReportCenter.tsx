import React, { useState } from 'react';
import { 
  Building2, DownloadCloud, FileText, ChevronDown, Eye,
  TableProperties, Printer, BarChart3, TrendingUp, WalletCards
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExportProgressModal } from '@/components/ui/export-progress';

// Dummy Data
const TENANTS = [
  { id: 't1', name: 'Global Institute of Tech' },
  { id: 't2', name: 'Apex Medical Academy' },
  { id: 't3', name: 'Pioneer Business School' }
];

const TEMPLATE_STYLES: Record<string, {
  name: string;
  tier: 'Basic' | 'Pro' | 'Advanced';
  accent: string;
  accentText: string;
  accentSoft: string;
  tableHead: string;
}> = {
  essential_clean: { name: 'Essential Clean', tier: 'Basic', accent: 'bg-slate-900', accentText: 'text-slate-900', accentSoft: 'bg-slate-100', tableHead: 'bg-slate-900' },
  basic_compact: { name: 'Compact Ledger', tier: 'Basic', accent: 'bg-sky-600', accentText: 'text-sky-700', accentSoft: 'bg-sky-50', tableHead: 'bg-sky-600' },
  basic_academic: { name: 'Classic Academic', tier: 'Basic', accent: 'bg-blue-600', accentText: 'text-blue-700', accentSoft: 'bg-blue-50', tableHead: 'bg-blue-600' },
  basic_attendance: { name: 'Attendance Register', tier: 'Basic', accent: 'bg-cyan-600', accentText: 'text-cyan-700', accentSoft: 'bg-cyan-50', tableHead: 'bg-cyan-600' },
  basic_receipt: { name: 'Simple Fee Statement', tier: 'Basic', accent: 'bg-teal-600', accentText: 'text-teal-700', accentSoft: 'bg-teal-50', tableHead: 'bg-teal-600' },
  pro_insights: { name: 'Modern Insights', tier: 'Pro', accent: 'bg-indigo-600', accentText: 'text-indigo-600', accentSoft: 'bg-indigo-50', tableHead: 'bg-indigo-600' },
  pro_finance: { name: 'Finance Focus', tier: 'Pro', accent: 'bg-emerald-600', accentText: 'text-emerald-600', accentSoft: 'bg-emerald-50', tableHead: 'bg-emerald-600' },
  pro_admissions: { name: 'Admission Story', tier: 'Pro', accent: 'bg-fuchsia-600', accentText: 'text-fuchsia-600', accentSoft: 'bg-fuchsia-50', tableHead: 'bg-fuchsia-600' },
  pro_faculty: { name: 'Faculty Pulse', tier: 'Pro', accent: 'bg-orange-600', accentText: 'text-orange-600', accentSoft: 'bg-orange-50', tableHead: 'bg-orange-600' },
  pro_course: { name: 'Course Performance', tier: 'Pro', accent: 'bg-rose-600', accentText: 'text-rose-600', accentSoft: 'bg-rose-50', tableHead: 'bg-rose-600' },
  advanced_analytics: { name: 'Analytics Suite', tier: 'Advanced', accent: 'bg-violet-600', accentText: 'text-violet-600', accentSoft: 'bg-violet-50', tableHead: 'bg-violet-600' },
  advanced_executive: { name: 'Executive Brief', tier: 'Advanced', accent: 'bg-amber-500', accentText: 'text-amber-600', accentSoft: 'bg-amber-50', tableHead: 'bg-amber-500' },
  advanced_growth: { name: 'Growth Intelligence', tier: 'Advanced', accent: 'bg-pink-600', accentText: 'text-pink-600', accentSoft: 'bg-pink-50', tableHead: 'bg-pink-600' },
  advanced_branches: { name: 'Multi-Branch Command', tier: 'Advanced', accent: 'bg-blue-700', accentText: 'text-blue-700', accentSoft: 'bg-blue-50', tableHead: 'bg-blue-700' },
  advanced_annual: { name: 'Annual Impact', tier: 'Advanced', accent: 'bg-red-600', accentText: 'text-red-600', accentSoft: 'bg-red-50', tableHead: 'bg-red-600' },
};

export function ReportCenter({ 
  templateId, 
  exportFormat = 'pdf', 
  onBack,
  onChangeTemplate
}: { 
  templateId: string; 
  exportFormat?: string; 
  onBack: () => void; 
  onChangeTemplate?: (id: string) => void;
}) {
  const [selectedTenant] = useState('t1');
  const [isExporting, setIsExporting] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [paperSize, setPaperSize] = useState<'A4' | 'Letter'>('A4');
  const template = TEMPLATE_STYLES[templateId] ?? TEMPLATE_STYLES.essential_clean;

  const handleGenerate = () => {
    setIsExporting(true);
  };

  return (
    <div className="flex h-full overflow-hidden bg-white">
        
        {/* Document Preview Area */}
        <div className="flex-1 overflow-y-auto thin-scrollbar relative bg-slate-200/50 flex flex-col print:overflow-visible print:bg-white">
          
          {/* Action Toolbar */}
          <div className="bg-white px-3 py-3 sm:px-6 sm:py-4 border-b border-slate-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between shrink-0 shadow-sm sticky top-0 z-10 print:hidden">
            <div className="flex min-w-0 items-center gap-2 sm:gap-4">
              <button 
                onClick={onBack}
                className="flex items-center gap-1.5 px-3 py-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg font-medium text-sm transition-colors border border-slate-200"
              >
                <ChevronDown className="w-4 h-4 rotate-90" /> Back
              </button>
              <div className="hidden h-5 w-px bg-slate-200 sm:block" />
                <div>
                <div className="flex items-center gap-2">
                {exportFormat === 'pdf' ? (
                  <FileText className="w-4 h-4 text-rose-500 shrink-0" />
                ) : (
                  <TableProperties className="w-4 h-4 text-emerald-500 shrink-0" />
                )}
                {onChangeTemplate ? (
                  <Select value={templateId} onValueChange={onChangeTemplate}>
                    <SelectTrigger className="h-8 border-none bg-transparent hover:bg-slate-100 shadow-none font-bold text-slate-900 text-base focus:ring-0 px-2 min-w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(TEMPLATE_STYLES).map(([id, t]) => (
                        <SelectItem key={id} value={id}>
                          <span className="font-semibold">{t.name}</span>
                          <span className="text-[10px] text-slate-400 ml-2">({t.tier})</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <h3 className="font-bold text-slate-900">{template.name}</h3>
                )}
                </div>
                <p className="mt-0.5 text-xs font-medium text-slate-400">{template.tier} template · Live preview</p>
                </div>
              
              {exportFormat === 'pdf' && (
              <div className="hidden lg:flex items-center gap-3 ml-4 pl-4 border-l border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Layout:</span>
                    <Select value={orientation} onValueChange={(val) => setOrientation(val as 'portrait' | 'landscape')}>
                      <SelectTrigger className="h-8 w-28 bg-slate-50 border-slate-200 text-xs font-semibold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portrait">Portrait</SelectItem>
                        <SelectItem value="landscape">Landscape</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Size:</span>
                    <Select value={paperSize} onValueChange={(val) => setPaperSize(val as 'A4' | 'Letter')}>
                      <SelectTrigger className="h-8 w-20 bg-slate-50 border-slate-200 text-xs font-semibold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A4">A4</SelectItem>
                        <SelectItem value="Letter">Letter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-end gap-2">
              {exportFormat === 'pdf' && (
                <button 
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm shadow-sm transition-all"
                >
                  <Printer className="w-4 h-4" /> Print
                </button>
              )}
              
              <button 
                onClick={handleGenerate}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold text-sm shadow-sm shadow-indigo-500/20 transition-all active:scale-95"
              >
                <DownloadCloud className="w-4 h-4" /> Export {exportFormat.toUpperCase()}
              </button>
            </div>
          </div>

          <div className="flex-1 p-3 sm:p-6 md:p-8 bg-slate-200/50 print:p-0 print:bg-white">
            <div className={`mx-auto space-y-6 transition-all duration-300 print:w-full print:max-w-none print:m-0 ${orientation === 'landscape' && exportFormat === 'pdf' ? 'max-w-[1100px]' : 'max-w-[850px]'}`}>
            
            {/* Preview Banner */}
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex items-start gap-4 shadow-sm print:hidden">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{template.name} preview ({exportFormat.toUpperCase()})</h3>
                <p className="text-sm font-medium text-slate-500 mt-0.5">
                  This is a live preview of the final report format. Showing sample data. 
                  Click &quot;Export {exportFormat.toUpperCase()}&quot; to generate the full report.
                </p>
              </div>
            </div>

            {exportFormat === 'excel' || exportFormat === 'csv' ? (
              <div className="bg-white shadow-lg border border-slate-300 w-full min-h-[600px] flex flex-col font-sans rounded-sm overflow-hidden">
                {/* Excel Toolbar */}
                <div className={`${template.accent} text-white px-4 py-2 flex items-center gap-3 shrink-0 transition-colors`}>
                  <TableProperties className="w-5 h-5" />
                  <div>
                    <h2 className="text-sm font-bold">{template.name.replace(/\s+/g, '_')}_Data.{exportFormat}</h2>
                    <p className="text-[10px] opacity-80">Read-Only Preview</p>
                  </div>
                </div>
                {/* Formula Bar */}
                <div className="bg-slate-50 border-b border-slate-300 px-2 py-1.5 flex items-center gap-2 shrink-0">
                  <div className="px-2 border border-slate-200 bg-white text-xs font-bold text-slate-500 rounded">A1</div>
                  <div className="w-px h-4 bg-slate-300 mx-1" />
                  <div className="italic text-slate-400 font-serif font-bold text-xs">fx</div>
                  <input type="text" disabled value="Tenant ID" className="flex-1 bg-white border border-slate-200 px-2 py-0.5 text-xs text-slate-700 outline-none" />
                </div>
                {/* Spreadsheet Grid */}
                <div className="flex-1 overflow-auto bg-slate-100 p-0 relative">
                  <table className="w-full text-xs text-left border-collapse bg-white whitespace-nowrap min-w-max">
                    <thead>
                      <tr className="bg-slate-100 text-slate-500 font-bold border-b border-slate-300 select-none">
                        <th className="w-8 border-r border-slate-300 bg-slate-100"></th>
                        <th className="px-3 py-1.5 border-r border-slate-300 font-semibold text-center hover:bg-slate-200 cursor-pointer min-w-[120px]">A</th>
                        <th className="px-3 py-1.5 border-r border-slate-300 font-semibold text-center hover:bg-slate-200 cursor-pointer min-w-[200px]">B</th>
                        <th className="px-3 py-1.5 border-r border-slate-300 font-semibold text-center hover:bg-slate-200 cursor-pointer min-w-[120px]">C</th>
                        <th className="px-3 py-1.5 border-r border-slate-300 font-semibold text-center hover:bg-slate-200 cursor-pointer min-w-[150px]">D</th>
                        <th className="px-3 py-1.5 border-slate-300 font-semibold text-center hover:bg-slate-200 cursor-pointer min-w-[120px]">E</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Header Row */}
                      <tr className="border-b border-slate-200">
                        <td className="w-8 border-r border-slate-300 bg-slate-100 text-center text-[10px] text-slate-500 font-semibold select-none">1</td>
                        <td className={`px-3 py-1.5 border-r border-slate-200 font-bold text-white/90 ${template.tableHead} transition-colors`}>Tenant ID</td>
                        <td className={`px-3 py-1.5 border-r border-slate-200 font-bold text-white/90 ${template.tableHead} transition-colors`}>Institute Name</td>
                        <td className={`px-3 py-1.5 border-r border-slate-200 font-bold text-white/90 text-right ${template.tableHead} transition-colors`}>Students</td>
                        <td className={`px-3 py-1.5 border-r border-slate-200 font-bold text-white/90 text-right ${template.tableHead} transition-colors`}>Revenue (YTD)</td>
                        <td className={`px-3 py-1.5 border-slate-200 font-bold text-white/90 ${template.tableHead} transition-colors`}>Status</td>
                      </tr>
                      {/* Data Rows */}
                      <tr className="border-b border-slate-200 hover:bg-blue-50/50">
                        <td className="w-8 border-r border-slate-300 bg-slate-100 text-center text-[10px] text-slate-500 font-semibold select-none">2</td>
                        <td className="px-3 py-1.5 border-r border-slate-200 text-slate-600">TEN-001</td>
                        <td className="px-3 py-1.5 border-r border-slate-200 text-slate-600">Global Institute of Tech</td>
                        <td className="px-3 py-1.5 border-r border-slate-200 text-slate-600 text-right">1,245</td>
                        <td className="px-3 py-1.5 border-r border-slate-200 text-slate-600 text-right">$45,200</td>
                        <td className="px-3 py-1.5 border-slate-200 text-slate-600">Active</td>
                      </tr>
                      <tr className="border-b border-slate-200 hover:bg-blue-50/50">
                        <td className="w-8 border-r border-slate-300 bg-slate-100 text-center text-[10px] text-slate-500 font-semibold select-none">3</td>
                        <td className="px-3 py-1.5 border-r border-slate-200 text-slate-600">TEN-002</td>
                        <td className="px-3 py-1.5 border-r border-slate-200 text-slate-600">Apex Medical Academy</td>
                        <td className="px-3 py-1.5 border-r border-slate-200 text-slate-600 text-right">850</td>
                        <td className="px-3 py-1.5 border-r border-slate-200 text-slate-600 text-right">$82,100</td>
                        <td className="px-3 py-1.5 border-slate-200 text-slate-600">Active</td>
                      </tr>
                      <tr className="border-b border-slate-200 hover:bg-blue-50/50">
                        <td className="w-8 border-r border-slate-300 bg-slate-100 text-center text-[10px] text-slate-500 font-semibold select-none">4</td>
                        <td className="px-3 py-1.5 border-r border-slate-200 text-slate-600">TEN-003</td>
                        <td className="px-3 py-1.5 border-r border-slate-200 text-slate-600">Pioneer Business School</td>
                        <td className="px-3 py-1.5 border-r border-slate-200 text-slate-600 text-right">420</td>
                        <td className="px-3 py-1.5 border-r border-slate-200 text-slate-600 text-right">$15,400</td>
                        <td className="px-3 py-1.5 border-slate-200 text-slate-600">Active</td>
                      </tr>
                      {Array.from({ length: 15 }).map((_, i) => (
                        <tr key={i} className="border-b border-slate-200">
                          <td className="w-8 border-r border-slate-300 bg-slate-100 text-center text-[10px] text-slate-500 font-semibold select-none">{i + 5}</td>
                          <td className="px-3 py-1.5 border-r border-slate-200"></td>
                          <td className="px-3 py-1.5 border-r border-slate-200"></td>
                          <td className="px-3 py-1.5 border-r border-slate-200"></td>
                          <td className="px-3 py-1.5 border-r border-slate-200"></td>
                          <td className="px-3 py-1.5 border-slate-200"></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Excel Footer Tabs */}
                <div className="bg-slate-100 border-t border-slate-300 px-2 py-1 flex items-center gap-2 shrink-0">
                  <div className={`bg-white border-t-2 ${template.tableHead.replace('bg-', 'border-t-')} border-x border-x-slate-300 px-4 py-1 text-xs font-bold ${template.accentText} select-none shadow-sm cursor-default transition-colors`}>
                    Data_Sheet
                  </div>
                  <div className="px-4 py-1 text-xs font-medium text-slate-500 hover:bg-slate-200 rounded cursor-pointer select-none">
                    +
                  </div>
                </div>
              </div>
            ) : (
              <div id="printable-document" className={`bg-white shadow-2xl ring-1 ring-slate-900/5 w-full p-4 sm:p-8 md:p-12 relative flex flex-col mx-auto transition-all duration-300 print:shadow-none print:ring-0 print:p-0 print:aspect-auto ${
                orientation === 'portrait' ? 'aspect-[1/1.414]' : 'aspect-[1.414/1]'
              }`}>
                
                {/* Document Header */}
                <div className="flex items-start justify-between border-b-2 border-slate-900 pb-8 mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl ${template.accent} flex items-center justify-center text-white shadow-md`}>
                      <Building2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Institute SaaS Platform</h2>
                      <p className="text-sm font-semibold text-slate-500 mt-1">Super Admin Central Reporting</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h1 className={`text-xl font-bold ${template.accentText} uppercase tracking-widest mb-2`}>
                      {template.name}
                    </h1>
                    <p className="text-sm font-medium text-slate-500">Generated on: <span className="text-slate-900 font-bold">1 July 2026</span></p>
                    <p className="text-sm font-medium text-slate-500">Report Ref: <span className="text-slate-900 font-bold">#REP-90234</span></p>
                  </div>
                </div>

                {/* Filter Parameters Summary */}
                <div className={`${template.accentSoft} border border-slate-200/80 rounded-lg p-5 mb-8 flex flex-wrap gap-x-12 gap-y-4`}>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target Tenant</p>
                    <p className="text-sm font-bold text-slate-900">
                      {selectedTenant === 'all' ? 'All Tenants (Aggregated)' : TENANTS.find(t => t.id === selectedTenant)?.name || 'Unknown Tenant'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date Range</p>
                    <p className="text-sm font-bold text-slate-900">This Month (July 2026)</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status Filter</p>
                    <p className="text-sm font-bold text-slate-900">Active / Paid</p>
                  </div>
                </div>

                {template.tier !== 'Basic' && (
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      { label: 'Total Students', value: '2,515', change: '+8.2%', icon: BarChart3 },
                      { label: 'Collection', value: '$142.7K', change: '+12.4%', icon: WalletCards },
                      { label: 'Growth', value: '18.6%', change: '+3.1%', icon: TrendingUp },
                    ].map((metric, index) => (
                      <div key={metric.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${index === 0 ? template.accentSoft : 'bg-slate-50'}`}>
                            <metric.icon className={`h-4 w-4 ${index === 0 ? template.accentText : 'text-slate-500'}`} />
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600">{metric.change}</span>
                        </div>
                        <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">{metric.label}</p>
                        <p className="mt-1 text-xl font-black text-slate-900">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Data Table */}
                <div className="flex-1">
                  <table className="w-full overflow-hidden rounded-lg text-sm text-left border-separate border-spacing-0">
                    <thead>
                      <tr className={template.tableHead}>
                        <th className="py-3 px-3 text-[10px] font-bold text-white/80 uppercase tracking-wider w-24 rounded-l-lg">Tenant ID</th>
                        <th className="py-3 px-3 text-[10px] font-bold text-white/80 uppercase tracking-wider">Institute Name</th>
                        <th className="py-3 px-3 text-[10px] font-bold text-white/80 uppercase tracking-wider text-right">Students</th>
                        <th className="py-3 px-3 text-[10px] font-bold text-white/80 uppercase tracking-wider text-right">Revenue (YTD)</th>
                        <th className="py-3 px-3 text-[10px] font-bold text-white/80 uppercase tracking-wider text-right rounded-r-lg">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="group">
                        <td className="py-4 px-2 font-semibold text-slate-900">TEN-001</td>
                        <td className="py-4 px-2 font-semibold text-slate-700">Global Institute of Tech</td>
                        <td className="py-4 px-2 font-medium text-slate-600 text-right">1,245</td>
                        <td className="py-4 px-2 font-medium text-slate-600 text-right">$45,200</td>
                        <td className="py-4 px-2 text-right">
                          <span className="text-emerald-600 font-bold text-[11px] uppercase tracking-wider">Active</span>
                        </td>
                      </tr>
                      <tr className="group">
                        <td className="py-4 px-2 font-semibold text-slate-900">TEN-002</td>
                        <td className="py-4 px-2 font-semibold text-slate-700">Apex Medical Academy</td>
                        <td className="py-4 px-2 font-medium text-slate-600 text-right">850</td>
                        <td className="py-4 px-2 font-medium text-slate-600 text-right">$82,100</td>
                        <td className="py-4 px-2 text-right">
                          <span className="text-emerald-600 font-bold text-[11px] uppercase tracking-wider">Active</span>
                        </td>
                      </tr>
                      <tr className="group">
                        <td className="py-4 px-2 font-semibold text-slate-900">TEN-003</td>
                        <td className="py-4 px-2 font-semibold text-slate-700">Pioneer Business School</td>
                        <td className="py-4 px-2 font-medium text-slate-600 text-right">420</td>
                        <td className="py-4 px-2 font-medium text-slate-600 text-right">$15,400</td>
                        <td className="py-4 px-2 text-right">
                          <span className="text-emerald-600 font-bold text-[11px] uppercase tracking-wider">Active</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="py-6 text-center text-sm font-medium text-slate-400 italic">
                    End of Preview Data
                  </div>
                </div>

                {/* Document Footer */}
                <div className="mt-auto pt-8 border-t border-slate-200 flex flex-col items-center gap-2">
                  <p className="text-xs font-semibold text-slate-400">Page 1 of 1</p>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest text-center">
                    Confidential & Proprietary • Institute SaaS Platform
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ExportProgressModal
        isOpen={isExporting}
        onClose={() => setIsExporting(false)}
        title={templateId ? `${templateId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Report` : "Custom Report"}
        type={exportFormat === 'pdf' ? 'report' : 'export'}
        format={exportFormat}
      />
    </div>
  );
}
