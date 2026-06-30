import React from 'react';
import { BarChart3 } from 'lucide-react';

export function CoursePopularityChart() {
  const data = [
    { name: 'Full Stack Web', students: 850, percentage: 85, color: 'bg-indigo-500' },
    { name: 'Python Data Science', students: 620, percentage: 62, color: 'bg-emerald-500' },
    { name: 'Cloud Architecture', students: 480, percentage: 48, color: 'bg-amber-500' },
    { name: 'Cyber Security', students: 310, percentage: 31, color: 'bg-rose-500' },
    { name: 'UI/UX Design', students: 240, percentage: 24, color: 'bg-purple-500' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Course Popularity</h2>
          <p className="text-sm text-slate-500 mt-1">Enrollments across top bootcamps</p>
        </div>
        <div className="w-10 h-10 bg-slate-50 text-slate-500 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-5 h-5" />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end space-y-5">
        {data.map((item, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-slate-700">{item.name}</span>
              <span className="text-slate-900">{item.students}</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
