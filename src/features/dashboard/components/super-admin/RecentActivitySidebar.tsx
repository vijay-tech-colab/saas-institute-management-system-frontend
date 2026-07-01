import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListSkeleton, LiveStatusBadge } from '@/components/ui/dashboard-states';
import { Building, CreditCard, Ticket, AlertTriangle, ChevronRight, UserPlus, FileText } from 'lucide-react';

const MOCK_EVENTS = [
  { type: 'registration', title: 'Apex Institute', desc: 'New institute registered', icon: Building, color: 'emerald' },
  { type: 'upgrade', title: 'Global Tech Academy', desc: 'Upgraded to Enterprise plan', icon: CreditCard, color: 'blue' },
  { type: 'support', title: 'Springfield High', desc: 'New high-priority ticket', icon: Ticket, color: 'rose' },
  { type: 'alert', title: 'Greenwood School', desc: 'Storage limit reached (95%)', icon: AlertTriangle, color: 'amber' },
  { type: 'user', title: 'Rahul Sharma', desc: 'Logged in from new IP', icon: UserPlus, color: 'indigo' },
  { type: 'invoice', title: 'Invoice #INV-2041', desc: 'Payment received successfully', icon: FileText, color: 'emerald' },
];

const INITIAL_ACTIVITIES = [
  { id: 1001, type: 'registration', title: 'Delhi Public School', desc: 'New institute registered', time: 'Just now', icon: Building, color: 'emerald' },
  { id: 1002, type: 'upgrade', title: 'St. Xavier\'s', desc: 'Upgraded to Pro plan', time: '1 min ago', icon: CreditCard, color: 'blue' },
  { id: 1003, type: 'support', title: 'Modern Academy', desc: 'High-priority ticket created', time: '3 mins ago', icon: Ticket, color: 'rose' },
  { id: 1004, type: 'alert', title: 'Sunrise School', desc: 'Subscription expired', time: '10 mins ago', icon: AlertTriangle, color: 'amber' },
  { id: 1005, type: 'registration', title: 'Global Tech', desc: 'Trial started', time: '15 mins ago', icon: Building, color: 'emerald' },
];

export function RecentActivitySidebar() {
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);

  useEffect(() => {
    // Initial load simulation
    const initTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    const interval = setInterval(() => {
      if (isLoading) return;
      setActivities(prev => {
        const randomEvent = MOCK_EVENTS[Math.floor(Math.random() * MOCK_EVENTS.length)];
        const newEvent = {
          ...randomEvent,
          id: Date.now(),
          time: 'Just now',
        };
        // Update older items' time to 'few mins ago' conceptually (we'll just let them push down)
        // Keep max 8 items to prevent infinite DOM growth
        const updated = [newEvent, ...prev].slice(0, 8);
        return updated;
      });
    }, 4000); // Add a new log every 4 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(initTimer);
    };
  }, [isLoading]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-[600px] xl:h-full relative overflow-hidden">
      {/* Small live indicator */}
      {!isLoading && (
        <div className="absolute top-0 right-0 p-6 flex items-center gap-2 pointer-events-none z-10">
          <LiveStatusBadge />
        </div>
      )}

      <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
        <h3 className="font-bold text-slate-900">Recent Activity</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-0 relative">
        {isLoading ? (
          <ListSkeleton count={6} />
        ) : (
          <AnimatePresence initial={false}>
            {activities.map((activity, idx) => {
              const Icon = activity.icon;
              const isLast = idx === activities.length - 1;
              
              return (
                <motion.div 
                  key={activity.id}
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-4 relative group cursor-pointer pb-6">
                    {!isLast && (
                      <div className="absolute top-8 bottom-0 left-4 w-px bg-slate-100 group-hover:bg-indigo-100 transition-colors"></div>
                    )}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-transform group-hover:scale-110 ${
                      activity.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                      activity.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      activity.color === 'rose' ? 'bg-rose-100 text-rose-600' :
                      activity.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{activity.title}</p>
                      <p className="text-xs text-slate-500 truncate">{activity.desc}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider flex items-center gap-1.5">
                        {activity.time === 'Just now' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        )}
                        {activity.time}
                      </p>
                    </div>
                    <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
