'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, AlertTriangle, Activity, ArrowUpRight, Brain, Target, HeartPulse } from 'lucide-react';
import { PageHeader } from './shared/UIComponents';
import { StatusBadge } from './shared/StatusBadge';
import { mockAIInsights } from '../data/mock-data';
import type { AIInsight } from '../types';

const TYPE_CONFIG: Record<AIInsight['type'], { icon: React.ReactNode; label: string; color: string; bg: string }> = {
  churn_risk:         { icon: <AlertTriangle size={18} />,  label: 'Churn Risk',       color: 'text-red-600',     bg: 'bg-red-50' },
  upgrade_opportunity:{ icon: <ArrowUpRight size={18} />,   label: 'Upgrade Opp.',     color: 'text-blue-600',    bg: 'bg-blue-50' },
  revenue_prediction: { icon: <TrendingUp size={18} />,     label: 'Revenue Forecast', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  health_score:       { icon: <HeartPulse size={18} />,     label: 'Health Score',     color: 'text-purple-600',  bg: 'bg-purple-50' },
  renewal_forecast:   { icon: <Activity size={18} />,       label: 'Renewal Forecast', color: 'text-indigo-600',  bg: 'bg-indigo-50' },
  payment_risk:       { icon: <AlertTriangle size={18} />,  label: 'Payment Risk',     color: 'text-orange-600',  bg: 'bg-orange-50' },
};

function ScoreRing({ score, size = 64, color }: { score: number; size?: number; color: string }) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;
  const strokeColor = score >= 70 ? '#16a34a' : score >= 40 ? '#ea580c' : '#dc2626';
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth="5" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={strokeColor} strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-slate-900">{score}</span>
      </div>
    </div>
  );
}

function InsightCard({ insight, index }: { insight: AIInsight; index: number }) {
  const config = TYPE_CONFIG[insight.type];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 ${insight.priority === 'high' ? 'border-red-100 hover:border-red-200' : insight.priority === 'medium' ? 'border-orange-100 hover:border-orange-200' : 'border-slate-100'}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${config.bg}`}>
            <div className={config.color}>{config.icon}</div>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">{config.label}</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{insight.instituteName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <StatusBadge status={insight.priority} />
          <ScoreRing score={insight.score} size={52} color={config.color} />
        </div>
      </div>

      <p className="text-[12px] text-slate-600 leading-relaxed mb-3">{insight.description}</p>

      <div className="bg-slate-50 rounded-xl px-3 py-2.5 mb-3">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">AI Recommendation</p>
        <p className="text-[12px] text-slate-700 leading-relaxed">{insight.recommendation}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Brain className="w-3.5 h-3.5 text-slate-400" />
          <p className="text-[11px] text-slate-400">{insight.confidence}% confidence</p>
        </div>
        {insight.predictedValue && (
          <p className="text-xs font-bold text-emerald-600">₹{insight.predictedValue.toLocaleString('en-IN')} at stake</p>
        )}
      </div>

      <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
        <button className="flex-1 py-2 text-xs font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all">Take Action</button>
        <button className="flex-1 py-2 text-xs font-semibold text-slate-500 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all">Dismiss</button>
      </div>
    </motion.div>
  );
}

export function AIInsights() {
  const highPriority = mockAIInsights.filter(i => i.priority === 'high');
  const medium = mockAIInsights.filter(i => i.priority === 'medium');
  const low = mockAIInsights.filter(i => i.priority === 'low');

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <PageHeader
        title="AI Insights"
        description="AI-powered predictions and recommendations to optimize revenue and reduce churn."
        breadcrumbs={[{ label: 'Subscriptions' }, { label: 'AI Insights' }]}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl text-xs font-semibold">
          <Zap className="w-3.5 h-3.5" /> AI Powered
        </div>
      </PageHeader>

      {/* Summary Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-5 mb-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Brain className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-semibold text-blue-400">AI Analysis Complete</span>
          <span className="text-xs text-slate-400">Updated 2 min ago</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Insights Found', value: mockAIInsights.length, icon: <Target className="w-4 h-4" />, color: 'text-blue-400' },
            { label: 'High Priority', value: highPriority.length, icon: <AlertTriangle className="w-4 h-4" />, color: 'text-red-400' },
            { label: 'Revenue at Risk', value: '₹38K', icon: <TrendingUp className="w-4 h-4" />, color: 'text-orange-400' },
            { label: 'Avg Confidence', value: `${Math.round(mockAIInsights.reduce((s, i) => s + i.confidence, 0) / mockAIInsights.length)}%`, icon: <Brain className="w-4 h-4" />, color: 'text-emerald-400' },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-3">
              <div className={`${s.color} mb-1`}>{s.icon}</div>
              <p className="text-xl font-black">{s.value}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* High Priority */}
      {highPriority.length > 0 && (
        <div className="mb-6">
          <h2 className="flex items-center gap-2 text-sm font-bold text-red-600 mb-3">
            <AlertTriangle className="w-4 h-4" /> High Priority ({highPriority.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {highPriority.map((ins, i) => <InsightCard key={ins.id} insight={ins} index={i} />)}
          </div>
        </div>
      )}

      {/* Medium + Low */}
      {[...medium, ...low].length > 0 && (
        <div>
          <h2 className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
            <Activity className="w-4 h-4" /> Other Insights ({medium.length + low.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[...medium, ...low].map((ins, i) => <InsightCard key={ins.id} insight={ins} index={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}
