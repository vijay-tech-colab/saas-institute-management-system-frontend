"use client"

import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CustomSelect } from "@/features/subscriptions/components/shared/UIComponents"
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Clock,
  FileImage,
  History,
  LockKeyhole,
  Mail,
  MoreHorizontal,
  Paperclip,
  Phone,
  Reply,
  Send,
  ShieldCheck,
  Sparkles,
  Tag,
  Ticket,
  UserRound,
  UserRoundCheck,
  XCircle,
} from "lucide-react"

const mockTicket = {
  id: "TCK-1042",
  subject: "Cannot access the student attendance module",
  category: "Technical",
  module: "Attendance",
  slaStatus: "Within SLA",
  created: "Jun 29, 2026 · 10:30 AM",
  updated: "Jun 30, 2026 · 09:15 AM",
  customer: {
    name: "Sarah Jenkins",
    email: "sarah.j@institute-a.com",
    phone: "+1 (555) 123-4567",
    institute: "Institute A - Main Branch",
    role: "Administrator",
  },
}

const mockThread = [
  {
    id: "msg1",
    type: "customer",
    author: "Sarah Jenkins",
    time: "Jun 29, 10:30 AM",
    content:
      "Hi Support,\n\nSince this morning, whenever I try to click on the 'Attendance' tab, the page just loads endlessly and then shows a 504 Gateway Timeout error. I've tried clearing my cache but it didn't help. Can you look into this urgently? Teachers need to mark attendance by noon.",
    attachments: ["screenshot-error.png"],
  },
  {
    id: "msg2",
    type: "system",
    content: "Ticket assigned to Alex Smith",
    time: "Jun 29, 10:35 AM",
  },
  {
    id: "msg3",
    type: "agent",
    author: "Alex Smith",
    time: "Jun 29, 10:45 AM",
    content:
      "Hello Sarah,\n\nI apologize for the inconvenience. We are currently investigating an issue with the database cluster that handles the attendance module for the US-East region. I will provide an update within the next 30 minutes.",
  },
  {
    id: "msg4",
    type: "internal",
    author: "Alex Smith",
    time: "Jun 29, 10:50 AM",
    content:
      "Escalated to DevOps. Ticket #DO-8842. The read replica seems to be out of sync.",
  },
]

const assigneeOptions = [
  { label: "Alex Smith (Me)", value: "alex" },
  { label: "John Doe", value: "john" },
  { label: "Support Team A", value: "team-a" },
]

const statusOptions = [
  { label: "In Progress", value: "in_progress" },
  { label: "Waiting on Customer", value: "waiting" },
  { label: "Resolved", value: "resolved" },
  { label: "Closed", value: "closed" },
]

const priorityOptions = [
  { label: "Critical", value: "critical" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
]

export default function TicketDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [replyMode, setReplyMode] = useState<"public" | "internal">("public")
  const [assignee, setAssignee] = useState("alex")
  const [ticketStatus, setTicketStatus] = useState("in_progress")
  const [ticketPriority, setTicketPriority] = useState("high")

  const currentAssignee =
    assigneeOptions.find((option) => option.value === assignee)?.label ?? "Unassigned"

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Badge variant="error" className="border border-rose-200">Critical</Badge>
      case "high":
        return <Badge variant="warning" className="border border-amber-200">High priority</Badge>
      case "medium":
        return <Badge variant="info" className="border border-sky-200">Medium priority</Badge>
      default:
        return <Badge variant="secondary" className="border border-slate-200">Low priority</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
        return <Badge variant="primary_light" className="border border-indigo-200">In Progress</Badge>
      case "waiting":
        return <Badge variant="warning" className="border border-amber-200">Waiting</Badge>
      case "resolved":
        return <Badge variant="success" className="border border-emerald-200">Resolved</Badge>
      case "closed":
        return <Badge variant="secondary" className="border border-slate-200">Closed</Badge>
      default:
        return <Badge variant="secondary">Open</Badge>
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50/70 p-4 sm:p-6 xl:p-8">
      <div className="mx-auto flex max-w-[1540px] flex-col gap-5">
        <header className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="relative flex flex-col gap-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
              <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="mt-0.5 shrink-0 rounded-xl border-slate-200 shadow-sm"
                  onClick={() => router.push("/dashboard/support/tickets")}
                  aria-label="Back to tickets"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 sm:flex">
                  <Ticket className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] font-bold tracking-wide text-slate-600">
                      {id || mockTicket.id}
                    </span>
                    {getStatusBadge(ticketStatus)}
                    {getPriorityBadge(ticketPriority)}
                  </div>
                  <h1 className="max-w-4xl text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    {mockTicket.subject}
                  </h1>
                  <p className="mt-1.5 text-sm text-slate-500">
                    Raised by {mockTicket.customer.name} from {mockTicket.customer.institute}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end lg:self-auto">
                <Button variant="outline" className="border-slate-200 bg-white shadow-sm">
                  <MoreHorizontal className="mr-2 h-4 w-4" />
                  Merge
                </Button>
                <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700">
                  <XCircle className="mr-2 h-4 w-4" />
                  Close Ticket
                </Button>
              </div>
            </div>

            <div className="grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm ring-1 ring-slate-200">
                  <UserRoundCheck className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned to</p>
                  <p className="truncate text-sm font-semibold text-slate-800">{currentAssignee}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm ring-1 ring-slate-200">
                  <CalendarDays className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Created</p>
                  <p className="text-sm font-semibold text-slate-800">{mockTicket.created}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm ring-1 ring-slate-200">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Last updated</p>
                  <p className="text-sm font-semibold text-slate-800">{mockTicket.updated}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-emerald-50 px-3.5 py-3 ring-1 ring-emerald-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">SLA status</p>
                  <p className="text-sm font-semibold text-emerald-700">{mockTicket.slaStatus} · 3h 42m left</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
          <section className="flex min-h-[680px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:h-[calc(100vh-250px)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Conversation</h2>
                <p className="mt-0.5 text-xs text-slate-500">4 messages · Last reply 23 hours ago</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Customer online
              </div>
            </div>

            <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto bg-gradient-to-b from-slate-50/70 to-white p-4 sm:p-6">
              {mockThread.map((message) => {
                if (message.type === "system") {
                  return (
                    <div key={message.id} className="flex items-center justify-center gap-3">
                      <div className="h-px max-w-24 flex-1 bg-slate-200" />
                      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-500 shadow-sm">
                        <History className="h-3 w-3" />
                        {message.content} · {message.time}
                      </div>
                      <div className="h-px max-w-24 flex-1 bg-slate-200" />
                    </div>
                  )
                }

                const isAgent = message.type === "agent"
                const isInternal = message.type === "internal"

                return (
                  <div
                    key={message.id}
                    className={`flex ${isAgent ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex w-full max-w-[780px] gap-3 ${isAgent ? "flex-row-reverse" : ""}`}>
                      <Avatar className="mt-1 h-9 w-9 shrink-0 border-2 border-white shadow-sm">
                        <AvatarFallback
                          className={
                            isInternal
                              ? "bg-amber-100 text-amber-700"
                              : isAgent
                                ? "bg-blue-600 text-white"
                                : "bg-slate-200 text-slate-700"
                          }
                        >
                          {message.author?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className={`min-w-0 flex-1 ${isAgent ? "items-end" : "items-start"} flex flex-col gap-1.5`}>
                        <div className={`flex flex-wrap items-center gap-2 ${isAgent ? "flex-row-reverse" : ""}`}>
                          <span className="text-xs font-bold text-slate-900">{message.author}</span>
                          <span className="text-[11px] text-slate-400">{message.time}</span>
                          {isInternal && (
                            <Badge variant="warning" className="gap-1 border border-amber-200 text-[10px]">
                              <LockKeyhole className="h-3 w-3" /> Internal note
                            </Badge>
                          )}
                          {isAgent && (
                            <Badge variant="primary_light" className="border border-indigo-200 text-[10px]">Support</Badge>
                          )}
                        </div>

                        <div
                          className={`w-fit whitespace-pre-wrap rounded-2xl px-4 py-3.5 text-sm leading-6 shadow-sm ${
                            isInternal
                              ? "border border-amber-200 bg-amber-50 text-amber-950"
                              : isAgent
                                ? "rounded-tr-md bg-blue-600 text-white shadow-blue-100"
                                : "rounded-tl-md border border-slate-200 bg-white text-slate-700"
                          }`}
                        >
                          {message.content}
                        </div>

                        {message.attachments && (
                          <div className="mt-1 flex flex-wrap gap-2">
                            {message.attachments.map((attachment) => (
                              <button
                                type="button"
                                key={attachment}
                                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs font-semibold text-slate-600 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                              >
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                  <FileImage className="h-3.5 w-3.5" />
                                </span>
                                <span>
                                  {attachment}
                                  <span className="block text-[10px] font-normal text-slate-400">PNG · 248 KB</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="shrink-0 border-t border-slate-200 bg-white p-3 sm:p-4">
              <div className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-all focus-within:ring-2 ${replyMode === "internal" ? "border-amber-200 focus-within:ring-amber-500/20" : "border-slate-200 focus-within:border-blue-300 focus-within:ring-blue-500/20"}`}>
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 p-1.5">
                  <div className="flex rounded-xl bg-slate-100 p-1">
                    <button
                      type="button"
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${replyMode === "public" ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                      onClick={() => setReplyMode("public")}
                    >
                      <Reply className="h-3.5 w-3.5" />
                      Public reply
                    </button>
                    <button
                      type="button"
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${replyMode === "internal" ? "bg-white text-amber-700 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                      onClick={() => setReplyMode("internal")}
                    >
                      <LockKeyhole className="h-3.5 w-3.5" />
                      Internal note
                    </button>
                  </div>
                  <span className="hidden items-center gap-1.5 pr-2 text-[11px] text-slate-400 sm:flex">
                    <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                    AI writing assist
                  </span>
                </div>

                <textarea
                  className={`min-h-[112px] w-full resize-none p-4 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400 ${replyMode === "internal" ? "bg-amber-50/30" : "bg-white"}`}
                  placeholder={replyMode === "public" ? "Write a helpful reply to Sarah..." : "Add a note visible only to your support team..."}
                  aria-label={replyMode === "public" ? "Reply to customer" : "Internal note"}
                />

                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 p-2">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500" aria-label="Attach file">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs text-slate-500">
                      Use template
                    </Button>
                  </div>
                  <Button className={replyMode === "internal" ? "h-9 bg-amber-500 hover:bg-amber-600" : "h-9"}>
                    {replyMode === "internal" ? "Add Note" : "Send Reply"}
                    <Send className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <aside className="flex flex-col gap-5">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-blue-600" />
                  <h2 className="text-sm font-bold text-slate-900">Ticket properties</h2>
                </div>
                {getStatusBadge(ticketStatus)}
              </div>
              <div className="space-y-4 p-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Assigned to</label>
                  <CustomSelect
                    options={assigneeOptions}
                    value={assignee}
                    onChange={setAssignee}
                    className="w-full"
                    buttonClassName="h-10 rounded-xl px-3 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Status</label>
                  <CustomSelect
                    options={statusOptions}
                    value={ticketStatus}
                    onChange={setTicketStatus}
                    className="w-full"
                    buttonClassName="h-10 rounded-xl px-3 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Priority</label>
                  <CustomSelect
                    options={priorityOptions}
                    value={ticketPriority}
                    onChange={setTicketPriority}
                    className="w-full"
                    buttonClassName="h-10 rounded-xl px-3 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Category</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">{mockTicket.category}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Module</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">{mockTicket.module}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
                <UserRound className="h-4 w-4 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900">Customer details</h2>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <Avatar className="h-11 w-11 ring-4 ring-blue-50">
                    <AvatarFallback className="bg-blue-100 font-bold text-blue-700">SJ</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">{mockTicket.customer.name}</p>
                    <p className="text-xs text-slate-500">{mockTicket.customer.role}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3 text-sm text-slate-600">
                    <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    <span>{mockTicket.customer.institute}</span>
                  </div>
                  <a href={`mailto:${mockTicket.customer.email}`} className="flex items-start gap-3 text-sm text-slate-600 transition-colors hover:text-blue-600">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    <span className="break-all">{mockTicket.customer.email}</span>
                  </a>
                  <a href={`tel:${mockTicket.customer.phone}`} className="flex items-start gap-3 text-sm text-slate-600 transition-colors hover:text-blue-600">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    <span>{mockTicket.customer.phone}</span>
                  </a>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
                <History className="h-4 w-4 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900">Recent activity</h2>
              </div>
              <div className="p-5">
                <div className="relative ml-2 space-y-5 border-l border-slate-200 pl-5">
                  <div className="relative">
                    <span className="absolute -left-[27px] top-0.5 flex h-3 w-3 rounded-full border-2 border-white bg-amber-400 ring-2 ring-amber-100" />
                    <p className="text-xs font-semibold leading-5 text-slate-700">Alex Smith added an internal note</p>
                    <p className="mt-0.5 text-[10px] text-slate-400">Jun 30 · 09:15 AM</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[27px] top-0.5 flex h-3 w-3 rounded-full border-2 border-white bg-blue-500 ring-2 ring-blue-100" />
                    <p className="text-xs font-semibold leading-5 text-slate-700">Ticket assigned to Alex Smith</p>
                    <p className="mt-0.5 text-[10px] text-slate-400">Jun 29 · 10:35 AM</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[27px] top-0.5 flex h-3 w-3 rounded-full border-2 border-white bg-slate-400 ring-2 ring-slate-100" />
                    <p className="text-xs font-semibold leading-5 text-slate-700">Sarah Jenkins created the ticket</p>
                    <p className="mt-0.5 text-[10px] text-slate-400">Jun 29 · 10:30 AM</p>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}
