'use client';

import React, { useState } from 'react';
import { SearchInput, FilterChips, PageHeader } from '@/features/subscriptions/components/shared/UIComponents';
import { format } from 'date-fns';
import { Download, Filter, Terminal, Clock, Copy, Pause, Play, Trash2 } from 'lucide-react';
import { mockSystemLogs } from '../data/mock-data';

export function SystemLogsView() {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [isPlaying, setIsPlaying] = useState(true);

  const filteredLogs = mockSystemLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(search.toLowerCase()) || 
                          log.processId.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <div className="shrink-0">
        <PageHeader 
          title="System Logs" 
          description="Real-time terminal view of background jobs, worker processes, and core system events."
          breadcrumbs={[{ label: 'Audit Logs' }, { label: 'System Logs' }]}
        >
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-2 px-4 py-2 border text-sm font-bold rounded-xl transition-colors shadow-sm ${isPlaying ? 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'}`}
            >
              {isPlaying ? <><Pause className="w-4 h-4" /> Pause Streaming</> : <><Play className="w-4 h-4" /> Resume Streaming</>}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
              <Download className="w-4 h-4" /> Download Raw
            </button>
          </div>
        </PageHeader>
      </div>

      <div className="bg-[#0D1117] border border-slate-800 rounded-2xl shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden text-slate-300">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#161B22]">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-80">
              <SearchInput 
                value={search} 
                onChange={setSearch} 
                placeholder="Search raw logs or PID..." 
                className="w-full !bg-[#0D1117] !border-slate-700 !text-slate-200"
              />
            </div>
            <button className="p-2 border border-slate-700 rounded-xl bg-[#0D1117] text-slate-400 hover:bg-slate-800 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
            {['all', 'info', 'warn', 'error', 'debug'].map(level => (
              <button
                key={level}
                onClick={() => setLevelFilter(level)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                  levelFilter === level ? 'bg-blue-600 text-white' : 'bg-[#0D1117] border border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {level}
              </button>
            ))}
            <button className="p-1.5 ml-2 border border-slate-700 rounded-lg bg-[#0D1117] text-slate-400 hover:text-rose-400 hover:border-rose-900 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content (Terminal View) */}
        <div className="flex-1 overflow-auto p-4 font-mono text-[11px] leading-relaxed">
          {filteredLogs.map((log) => (
            <div key={log.id} className="flex hover:bg-[#161B22] px-2 py-0.5 rounded transition-colors group">
              <div className="w-44 shrink-0 text-slate-500 select-none border-r border-slate-800 mr-4 flex justify-between pr-4">
                <span>{format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-slate-400 hover:text-white">
                  <Copy className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="w-16 shrink-0 font-bold select-none">
                <span className={`${
                  log.level === 'error' ? 'text-rose-400' :
                  log.level === 'warn' ? 'text-amber-400' :
                  log.level === 'debug' ? 'text-purple-400' :
                  'text-blue-400'
                }`}>
                  [{log.level.toUpperCase()}]
                </span>
              </div>
              <div className="w-24 shrink-0 text-emerald-400 select-none">
                {log.processId}
              </div>
              <div className="w-32 shrink-0 text-indigo-400 select-none">
                [{log.source}]
              </div>
              <div className="flex-1 break-words text-slate-300">
                {log.message}
                {log.executionTimeMs && <span className="ml-2 text-slate-500">({log.executionTimeMs}ms)</span>}
              </div>
            </div>
          ))}
          {filteredLogs.length === 0 && (
            <div className="py-12 text-center text-slate-600">
              <Terminal className="w-12 h-12 mx-auto mb-3 opacity-20" />
              No system logs found matching your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
