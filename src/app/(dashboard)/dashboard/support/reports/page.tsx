"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, ComposedChart
} from "recharts"
import { Download, Calendar, Filter } from "lucide-react"

// Mock Data
const performanceData = [
  { name: 'Alex S.', tickets: 120, csat: 95, avgTime: 2.4 },
  { name: 'Sarah J.', tickets: 98, csat: 98, avgTime: 1.8 },
  { name: 'Mike T.', tickets: 145, csat: 88, avgTime: 3.2 },
  { name: 'Emma W.', tickets: 110, csat: 92, avgTime: 2.1 },
]

const slaData = [
  { name: 'Mon', met: 95, breached: 5 },
  { name: 'Tue', met: 92, breached: 8 },
  { name: 'Wed', met: 88, breached: 12 },
  { name: 'Thu', met: 96, breached: 4 },
  { name: 'Fri', met: 90, breached: 10 },
]

const instituteData = [
  { name: 'Inst A', volume: 400 },
  { name: 'Inst B', volume: 300 },
  { name: 'Inst C', volume: 200 },
  { name: 'Inst D', volume: 278 },
  { name: 'Inst E', volume: 189 },
]

export default function SupportReportsPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days")

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Analytics & Reports</h1>
          <p className="text-sm text-slate-500 mt-1">Deep dive into support performance, SLAs, and customer satisfaction.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600">
            <option>All Departments</option>
            <option>Technical Support</option>
            <option>Billing Support</option>
          </select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            {dateRange}
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Agent Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Agent Performance</CardTitle>
            <CardDescription>Tickets resolved vs Customer Satisfaction (CSAT) score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={performanceData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar yAxisId="left" dataKey="tickets" fill="#4F46E5" name="Tickets Resolved" radius={[4, 4, 0, 0]} barSize={40} />
                  <Line yAxisId="right" type="monotone" dataKey="csat" stroke="#10B981" strokeWidth={3} name="CSAT %" dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* SLA Compliance */}
        <Card>
          <CardHeader>
            <CardTitle>SLA Compliance Rate</CardTitle>
            <CardDescription>Daily breakdown of SLA met vs breached</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={slaData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMet" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBreach" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E11D48" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#E11D48" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="met" stroke="#10B981" fillOpacity={1} fill="url(#colorMet)" name="SLA Met" />
                  <Area type="monotone" dataKey="breached" stroke="#E11D48" fillOpacity={1} fill="url(#colorBreach)" name="SLA Breached" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Institute Wise Volume */}
        <Card>
          <CardHeader>
            <CardTitle>Ticket Volume by Institute</CardTitle>
            <CardDescription>Top 5 institutes generating support requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={instituteData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                  <CartesianGrid stroke="#E2E8F0" strokeDasharray="5 5" horizontal={false} />
                  <XAxis type="number" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{fill: '#F1F5F9'}}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0' }}
                  />
                  <Bar dataKey="volume" fill="#0EA5E9" radius={[0, 4, 4, 0]} barSize={24} name="Tickets" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
