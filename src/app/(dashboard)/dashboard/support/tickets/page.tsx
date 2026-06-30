"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  PageHeader, SearchInput, FilterChips 
} from "@/features/subscriptions/components/shared/UIComponents"
import { StatCard } from "@/features/subscriptions/components/shared/StatCard"
import { StatusBadge } from "@/features/subscriptions/components/shared/StatusBadge"
import { ActionTooltip } from "@/components/ui/tooltip"
import { DataTablePagination } from "@/components/ui/pagination"
import { TableSkeleton } from "@/components/ui/skeleton"
import { 
  Ticket, AlertCircle, Clock, CheckCircle2, 
  Plus, Eye, Edit2, Trash2, Filter
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

// Mock Data
const mockTickets = Array.from({ length: 15 }).map((_, i) => ({
  id: `TCK-${1000 + i}`,
  subject: i % 3 === 0 ? "Cannot access dashboard" : i % 2 === 0 ? "Payment failed" : "How to add a new course?",
  institute: `Institute ${String.fromCharCode(65 + (i % 5))}`,
  customer: `User ${i + 1}`,
  category: i % 3 === 0 ? "Technical" : i % 2 === 0 ? "Billing" : "General",
  priority: i % 4 === 0 ? "Critical" : i % 3 === 0 ? "High" : i % 2 === 0 ? "Medium" : "Low",
  status: i % 5 === 0 ? "inactive" : i % 4 === 0 ? "active" : i % 3 === 0 ? "pending" : "active", // Matching standard statuses for StatusBadge
  statusLabel: i % 5 === 0 ? "Closed" : i % 4 === 0 ? "Resolved" : i % 3 === 0 ? "Waiting" : "Open",
  assignedTo: i % 2 === 0 ? "Agent Smith" : "Unassigned",
  updatedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
}))

export default function TicketsListPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table')
  const [selectedTickets, setSelectedTickets] = useState<string[]>([])
  
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [isTableLoading, setIsTableLoading] = useState(true)

  React.useEffect(() => {
    setIsTableLoading(true)
    const timer = setTimeout(() => setIsTableLoading(false), 600)
    return () => clearTimeout(timer)
  }, [pageIndex, pageSize, search, filter, viewMode])

  const filtered = mockTickets.filter(t => {
    const matchSearch = t.subject.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || 
                       (filter === 'open' && t.statusLabel === 'Open') ||
                       (filter === 'resolved' && t.statusLabel === 'Resolved') ||
                       (filter === 'closed' && t.statusLabel === 'Closed')
    return matchSearch && matchFilter
  })

  const paginatedData = filtered.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)

  const toggleSelectAll = () => {
    if (selectedTickets.length === paginatedData.length) {
      setSelectedTickets([])
    } else {
      setSelectedTickets(paginatedData.map(t => t.id))
    }
  }

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedTickets.includes(id)) {
      setSelectedTickets(selectedTickets.filter(t => t !== id))
    } else {
      setSelectedTickets([...selectedTickets, id])
    }
  }

  const totalTickets = mockTickets.length
  const openTickets = mockTickets.filter(t => t.statusLabel === 'Open').length
  const resolvedTickets = mockTickets.filter(t => t.statusLabel === 'Resolved').length

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'Critical': return 'text-rose-600 bg-rose-50 border-rose-100/50'
      case 'High': return 'text-amber-600 bg-amber-50 border-amber-100/50'
      case 'Medium': return 'text-sky-600 bg-sky-50 border-sky-100/50'
      default: return 'text-slate-600 bg-slate-50 border-slate-100/50'
    }
  }

  return (
    <div className="flex-1 w-full flex flex-col min-h-0 bg-slate-50/50 p-4 md:p-6 lg:p-8">
      <div className="flex-1 w-full flex flex-col min-h-0">
        <PageHeader
          title="Tickets Management"
          description="View, assign, and resolve customer support tickets."
          breadcrumbs={[{ label: 'Support' }, { label: 'Tickets' }]}
        >
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-sm shadow-blue-200"
          >
            <Plus className="w-4 h-4" /> Create Ticket
          </button>
        </PageHeader>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Tickets" value={totalTickets} icon={<Ticket size={20} />} iconColor="text-blue-600" iconBg="bg-blue-50" />
          <StatCard title="Open Tickets" value={openTickets} icon={<AlertCircle size={20} />} iconColor="text-amber-600" iconBg="bg-amber-50" trend={4.2} trendLabel="vs last week" />
          <StatCard title="Resolved Today" value={resolvedTickets} icon={<CheckCircle2 size={20} />} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
          <StatCard title="Avg Resolution" value="4.2h" icon={<Clock size={20} />} iconColor="text-indigo-600" iconBg="bg-indigo-50" trend={-1.5} trendLabel="vs last month" />
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-0">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <SearchInput value={search} onChange={setSearch} placeholder="Search tickets..." className="w-full sm:w-80" />
              <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
                <Filter className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <FilterChips 
                options={[
                  { label: 'All', value: 'all', count: mockTickets.length },
                  { label: 'Open', value: 'open', count: mockTickets.filter(p => p.statusLabel === 'Open').length },
                  { label: 'Resolved', value: 'resolved', count: mockTickets.filter(p => p.statusLabel === 'Resolved').length },
                  { label: 'Closed', value: 'closed', count: mockTickets.filter(p => p.statusLabel === 'Closed').length },
                ]}
                selected={filter}
                onChange={setFilter}
              />
              <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl">
                {(['table'] as const).map(v => (
                  <button key={v} onClick={() => setViewMode(v)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${viewMode === v ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}>
                    ☰ Table
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-slate-50/30">
            {/* Tickets Table */}
            {viewMode === 'table' && (
              <div className="overflow-x-auto">
                <table className="w-full bg-white">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="py-3 px-4 w-12 text-center align-middle">
                        <div className="flex items-center justify-center">
                          <Checkbox 
                            checked={selectedTickets.length === paginatedData.length && paginatedData.length > 0} 
                            onCheckedChange={toggleSelectAll} 
                          />
                        </div>
                      </th>
                      {['Ticket ID / Subject', 'Customer', 'Category', 'Priority', 'Assigned To', 'Updated', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {isTableLoading ? (
                      <TableSkeleton columns={9} rows={pageSize} />
                    ) : (
                      paginatedData.map((ticket, i) => (
                        <motion.tr
                          key={ticket.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.04 }}
                          className={`border-b hover:bg-blue-50/30 transition-colors cursor-pointer ${selectedTickets.includes(ticket.id) ? 'bg-indigo-50/50 border-indigo-100' : 'border-slate-50'}`}
                          onClick={() => router.push(`/dashboard/support/tickets/${ticket.id}`)}
                        >
                          <td className="py-3.5 px-4 text-center align-middle">
                            <div className="flex items-center justify-center">
                              <Checkbox 
                                checked={selectedTickets.includes(ticket.id)} 
                                onCheckedChange={() => toggleSelect(ticket.id, { stopPropagation: () => {} } as any)} 
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-sm text-slate-900">{ticket.id}</p>
                            <p className="text-[11px] text-slate-400 truncate max-w-[200px]">{ticket.subject}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="text-sm font-semibold text-slate-700">{ticket.customer}</p>
                            <p className="text-[11px] text-slate-400">{ticket.institute}</p>
                          </td>
                          <td className="py-3.5 px-4 text-sm font-semibold text-slate-700">{ticket.category}</td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-sm text-slate-600">{ticket.assignedTo}</td>
                          <td className="py-3.5 px-4 text-sm text-slate-600">{ticket.updatedAt}</td>
                          <td className="py-3.5 px-4">
                            <StatusBadge status={ticket.status as 'active' | 'inactive' | 'pending'} />
                          </td>
                          <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-1.5">
                              <ActionTooltip icon={Eye} tooltip="View Ticket" onClick={() => router.push(`/dashboard/support/tickets/${ticket.id}`)} />
                              <ActionTooltip icon={Edit2} tooltip="Edit Ticket" onClick={() => {}} />
                              <ActionTooltip icon={Trash2} tooltip="Delete Ticket" variant="danger" onClick={() => {}} />
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="border-t border-slate-100 bg-white shrink-0 mt-auto">
            <DataTablePagination
              pageIndex={pageIndex}
              pageSize={pageSize}
              totalRows={filtered.length}
              setPageIndex={setPageIndex}
              setPageSize={setPageSize}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
