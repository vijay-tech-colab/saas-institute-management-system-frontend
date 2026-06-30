import React from 'react';
import { Sparkles, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';

export function AIInsightsPanel() {
  const insights = [
    { 
      type: 'positive', 
      title: 'Revenue Forecast', 
      description: 'MRR is projected to grow by 12% next month based on current onboarding trends.',
      icon: TrendingUp 
    },
    { 
      type: 'warning', 
      title: 'Churn Risk Detected', 
      description: '3 Enterprise institutes show 40% drop in active users this week.',
      icon: AlertCircle 
    },
    { 
      type: 'suggestion', 
      title: 'Growth Opportunity', 
      description: '45 Trial users are highly active. Recommend sending early-bird upgrade offers.',
      icon: Lightbulb 
    }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg h-full flex flex-col">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full mix-blend-screen"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full mix-blend-screen"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
            <Sparkles className="w-4 h-4 text-indigo-300" />
          </div>
          <h3 className="font-bold text-lg tracking-tight">AI Insights</h3>
        </div>

        <div className="space-y-4 flex-1">
          {insights.map((insight, idx) => {
            const Icon = insight.icon;
            const colorClass = 
              insight.type === 'positive' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' :
              insight.type === 'warning' ? 'text-amber-400 bg-amber-400/10 border-amber-400/20' :
              'text-sky-400 bg-sky-400/10 border-sky-400/20';
              
            return (
              <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                <div className="flex gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${colorClass}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">{insight.title}</h4>
                    <p className="text-xs text-indigo-100/70 leading-relaxed">{insight.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
