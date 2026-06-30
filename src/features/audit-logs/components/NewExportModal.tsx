import React from 'react';
import { Modal, CustomSelect, Toggle } from '@/features/subscriptions/components/shared/UIComponents';
import { Download, FileJson, FileSpreadsheet, FileText, Mail, CalendarClock, Settings } from 'lucide-react';

interface NewExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewExportModal({ isOpen, onClose }: NewExportModalProps) {
  const [exportFormat, setExportFormat] = React.useState('csv');
  const [logType, setLogType] = React.useState('all');
  const [dateRange, setDateRange] = React.useState('7');
  const [activeTab, setActiveTab] = React.useState<'manual' | 'schedule'>('manual');
  const [scheduleEnabled, setScheduleEnabled] = React.useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configure Export" size="lg">
      <div className="flex border-b border-slate-100 p-2 gap-2 bg-slate-50/50">
        <button
          onClick={() => setActiveTab('manual')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'manual' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
        >
          Manual Export
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'schedule' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
        >
          Scheduled Exports
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'manual' ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">Log Category</label>
              <CustomSelect 
                value={logType}
                onChange={setLogType}
                buttonClassName="h-12 w-full px-4 rounded-xl text-sm"
                options={[
                  { label: 'All Log Types (Comprehensive)', value: 'all' },
                  { label: 'Login & Authentication Logs', value: 'login' },
                  { label: 'API Access Logs', value: 'api' },
                  { label: 'User Activity Logs', value: 'activity' },
                  { label: 'Security & Threat Events', value: 'security' },
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">Date Range</label>
              <CustomSelect 
                value={dateRange}
                onChange={setDateRange}
                buttonClassName="h-12 w-full px-4 rounded-xl text-sm"
                options={[
                  { label: 'Last 24 Hours', value: '1' },
                  { label: 'Last 7 Days', value: '7' },
                  { label: 'Last 30 Days', value: '30' },
                  { label: 'This Month', value: 'month' },
                  { label: 'Custom Range...', value: 'custom' },
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">Export Format</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'csv', label: 'CSV', icon: <FileSpreadsheet className="w-5 h-5" /> },
                  { id: 'excel', label: 'Excel', icon: <FileSpreadsheet className="w-5 h-5" /> },
                  { id: 'json', label: 'JSON', icon: <FileJson className="w-5 h-5" /> },
                  { id: 'pdf', label: 'PDF', icon: <FileText className="w-5 h-5" /> },
                ].map(fmt => (
                  <button
                    key={fmt.id}
                    onClick={() => setExportFormat(fmt.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                      exportFormat === fmt.id ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm shadow-blue-100' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {fmt.icon}
                    <span className="text-xs font-bold mt-2">{fmt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 flex items-center gap-2">
                <Download className="w-4 h-4" /> Generate Export
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-blue-500/20 rounded-xl border border-blue-400/30">
                  <CalendarClock className="w-5 h-5 text-blue-300" />
                </div>
                <h2 className="text-base font-bold text-white">Scheduled Reports</h2>
              </div>
              
              <div className="relative z-10">
                <p className="text-sm text-slate-300 mb-6">Automate compliance reporting by scheduling recurring log exports directly to your inbox.</p>
                
                <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-slate-700/50 mb-6">
                  <div>
                    <span className="block text-sm font-bold text-white">Enable Auto-Export</span>
                    <span className="block text-xs text-slate-400 mt-0.5">Weekly summary on Monday</span>
                  </div>
                  <Toggle checked={scheduleEnabled} onChange={setScheduleEnabled} />
                </div>

                {scheduleEnabled && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Recipients</label>
                      <div className="flex items-center gap-2 bg-slate-950/50 border border-slate-700/50 rounded-xl px-3 py-2">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <input type="text" value="admin@campusos.com" readOnly className="bg-transparent border-none text-sm text-white focus:outline-none w-full" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2">
                <Settings className="w-4 h-4" /> Save Schedule
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
