"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CalendarCheck,
  Check,
  Crown,
  Eye,
  FileBarChart,
  FileText,
  GraduationCap,
  Heart,
  Landmark,
  LayoutGrid,
  ReceiptText,
  Search,
  Sparkles,
  Table2,
  Target,
  Users,
  Zap,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { SearchInput, FilterChips } from '@/features/subscriptions/components/shared/UIComponents';

type TemplateTier = "basic" | "pro" | "advanced";

type ReportTemplate = {
  id: string;
  name: string;
  description: string;
  tier: TemplateTier;
  icon: React.ElementType;
  accent: string;
  accentSoft: string;
  badge?: string;
  useCase: string;
  features: string[];
  preview: "clean" | "compact" | "insight" | "finance" | "analytics" | "executive";
};

const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    id: "essential_clean",
    name: "Essential Clean",
    description: "A clear, lightweight format for everyday institute reports.",
    tier: "basic",
    icon: FileText,
    accent: "bg-slate-900",
    accentSoft: "bg-slate-100 text-slate-700",
    badge: "Easy start",
    useCase: "General",
    features: ["Clean header", "Summary table", "Print ready"],
    preview: "clean",
  },
  {
    id: "basic_compact",
    name: "Compact Ledger",
    description: "A space-saving table layout for attendance and fee records.",
    tier: "basic",
    icon: Table2,
    accent: "bg-sky-600",
    accentSoft: "bg-sky-50 text-sky-700",
    useCase: "Records",
    features: ["Dense rows", "Quick totals", "A4 optimized"],
    preview: "compact",
  },
  {
    id: "basic_academic",
    name: "Classic Academic",
    description: "A familiar marksheet-inspired layout for academic results.",
    tier: "basic",
    icon: GraduationCap,
    accent: "bg-blue-600",
    accentSoft: "bg-blue-50 text-blue-700",
    useCase: "Academic",
    features: ["Subject rows", "Grade summary", "Signatures"],
    preview: "clean",
  },
  {
    id: "basic_attendance",
    name: "Attendance Register",
    description: "Simple daily and monthly attendance tracking in one page.",
    tier: "basic",
    icon: CalendarCheck,
    accent: "bg-cyan-600",
    accentSoft: "bg-cyan-50 text-cyan-700",
    useCase: "Attendance",
    features: ["Daily status", "Monthly total", "Compact view"],
    preview: "compact",
  },
  {
    id: "basic_receipt",
    name: "Simple Fee Statement",
    description: "A neat fee statement for paid, due and concession details.",
    tier: "basic",
    icon: ReceiptText,
    accent: "bg-teal-600",
    accentSoft: "bg-teal-50 text-teal-700",
    useCase: "Fees",
    features: ["Fee heads", "Due balance", "Receipt ready"],
    preview: "compact",
  },
  {
    id: "pro_insights",
    name: "Modern Insights",
    description: "Polished KPI cards and visual summaries for monthly reviews.",
    tier: "pro",
    icon: BarChart3,
    accent: "bg-indigo-600",
    accentSoft: "bg-indigo-50 text-indigo-700",
    badge: "Most popular",
    useCase: "Overview",
    features: ["KPI cards", "Trend chart", "Smart highlights"],
    preview: "insight",
  },
  {
    id: "pro_finance",
    name: "Finance Focus",
    description: "A professional statement format built for fee and revenue reports.",
    tier: "pro",
    icon: FileBarChart,
    accent: "bg-emerald-600",
    accentSoft: "bg-emerald-50 text-emerald-700",
    useCase: "Finance",
    features: ["Revenue summary", "Due breakdown", "Payment chart"],
    preview: "finance",
  },
  {
    id: "pro_admissions",
    name: "Admission Story",
    description: "Visualise enquiries, applications and successful admissions.",
    tier: "pro",
    icon: Users,
    accent: "bg-fuchsia-600",
    accentSoft: "bg-fuchsia-50 text-fuchsia-700",
    useCase: "Admissions",
    features: ["Funnel view", "Source mix", "Conversion"],
    preview: "insight",
  },
  {
    id: "pro_faculty",
    name: "Faculty Pulse",
    description: "A balanced view of attendance, workload and performance.",
    tier: "pro",
    icon: BriefcaseBusiness,
    accent: "bg-orange-600",
    accentSoft: "bg-orange-50 text-orange-700",
    useCase: "Faculty",
    features: ["Workload", "Attendance", "Feedback"],
    preview: "insight",
  },
  {
    id: "pro_course",
    name: "Course Performance",
    description: "Compare enrolment, completion and outcomes by course.",
    tier: "pro",
    icon: BookOpen,
    accent: "bg-rose-600",
    accentSoft: "bg-rose-50 text-rose-700",
    useCase: "Courses",
    features: ["Course compare", "Completion", "Outcomes"],
    preview: "finance",
  },
  {
    id: "advanced_analytics",
    name: "Analytics Suite",
    description: "A data-rich dashboard report for deeper performance analysis.",
    tier: "advanced",
    icon: Zap,
    accent: "bg-violet-600",
    accentSoft: "bg-violet-50 text-violet-700",
    badge: "New",
    useCase: "Analytics",
    features: ["Advanced charts", "Comparisons", "Data narrative"],
    preview: "analytics",
  },
  {
    id: "advanced_executive",
    name: "Executive Brief",
    description: "Premium board-ready storytelling for leadership and stakeholders.",
    tier: "advanced",
    icon: Crown,
    accent: "bg-amber-500",
    accentSoft: "bg-amber-50 text-amber-700",
    useCase: "Leadership",
    features: ["Executive summary", "Goal tracking", "Brand styling"],
    preview: "executive",
  },
  {
    id: "advanced_growth",
    name: "Growth Intelligence",
    description: "Reveal long-term growth, retention and opportunity signals.",
    tier: "advanced",
    icon: Target,
    accent: "bg-pink-600",
    accentSoft: "bg-pink-50 text-pink-700",
    useCase: "Growth",
    features: ["Forecasts", "Retention", "Opportunities"],
    preview: "analytics",
  },
  {
    id: "advanced_branches",
    name: "Multi-Branch Command",
    description: "See branch health, rankings and exceptions at a glance.",
    tier: "advanced",
    icon: Landmark,
    accent: "bg-blue-700",
    accentSoft: "bg-blue-50 text-blue-700",
    useCase: "Branches",
    features: ["Branch ranking", "Benchmarks", "Alerts"],
    preview: "executive",
  },
  {
    id: "advanced_annual",
    name: "Annual Impact",
    description: "A memorable year-in-review report for every stakeholder.",
    tier: "advanced",
    icon: Award,
    accent: "bg-red-600",
    accentSoft: "bg-red-50 text-red-700",
    badge: "Signature",
    useCase: "Annual",
    features: ["Milestones", "Impact story", "Highlights"],
    preview: "executive",
  },
];

const FILTERS: { id: "all" | TemplateTier; label: string }[] = [
  { id: "all", label: "All templates" },
  { id: "basic", label: "Basic" },
  { id: "pro", label: "Pro" },
  { id: "advanced", label: "Advanced" },
];

function TemplatePreview({ template }: { template: ReportTemplate }) {
  const bars = template.preview === "analytics" ? [52, 78, 45, 92, 66, 84] : [42, 68, 54, 82, 62, 74];

  return (
    <div className="relative h-36 overflow-hidden rounded-t-xl bg-slate-100 p-3">
      <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(#cbd5e1_0.7px,transparent_0.7px)] [background-size:12px_12px]" />
      <div className="relative mx-auto h-full max-w-[220px] overflow-hidden rounded-md border border-slate-200 bg-white p-2.5 shadow-[0_10px_22px_rgba(15,23,42,0.12)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[0.5deg]">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-5 w-5 rounded ${template.accent}`} />
            <div>
              <div className="h-1.5 w-14 rounded-full bg-slate-800" />
              <div className="mt-1 h-1 w-11 rounded-full bg-slate-200" />
            </div>
          </div>
          <div className="h-1.5 w-12 rounded-full bg-slate-200" />
        </div>

        {template.preview === "clean" && (
          <>
            <div className="mb-2 rounded border border-slate-200 p-1.5">
              <div className="h-1.5 w-20 rounded bg-slate-300" />
              <div className="mt-1 h-1 w-32 rounded bg-slate-100" />
            </div>
            <MiniTable accent="bg-slate-700" />
          </>
        )}

        {template.preview === "compact" && (
          <>
            <div className="mb-2 flex gap-1.5">
              {["bg-sky-100", "bg-slate-100", "bg-slate-100"].map((color, index) => (
                <div key={index} className={`h-8 flex-1 rounded ${color} p-1.5`}>
                  <div className="h-1 w-6 rounded bg-slate-300" />
                  <div className="mt-1 h-1.5 w-9 rounded bg-slate-600" />
                </div>
              ))}
            </div>
            <MiniTable accent="bg-sky-500" dense />
          </>
        )}

        {(template.preview === "insight" || template.preview === "finance") && (
          <>
            <div className="mb-2 grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map((item) => (
                <div key={item} className={`rounded-md p-2 ${item === 0 ? template.accentSoft.split(" ")[0] : "bg-slate-50"}`}>
                  <div className="h-1 w-7 rounded bg-slate-300" />
                  <div className="mt-1.5 h-2 w-10 rounded bg-slate-700" />
                </div>
              ))}
            </div>
            <div className="flex h-[48px] items-end gap-1.5 rounded-md border border-slate-100 px-2 pb-1.5 pt-2">
              {bars.map((height, index) => (
                <div key={index} className={`flex-1 rounded-t-sm ${template.accent}`} style={{ height: `${height}%`, opacity: index % 2 === 0 ? 0.4 : 0.8 }} />
              ))}
            </div>
          </>
        )}

        {(template.preview === "analytics" || template.preview === "executive") && (
          <>
            <div className="grid grid-cols-[1.4fr_1fr] gap-2">
              <div className="rounded-md border border-slate-100 p-2">
                <div className="mb-2 h-1.5 w-16 rounded bg-slate-300" />
                <div className="flex h-9 items-end gap-1">
                  {bars.map((height, index) => (
                    <div key={index} className={`flex-1 rounded-t-sm ${template.accent}`} style={{ height: `${height}%`, opacity: 0.35 + index * 0.09 }} />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className={`${template.accentSoft.split(" ")[0]} rounded-md p-2`}>
                  <div className="h-1 w-8 rounded bg-slate-300" />
                  <div className="mt-1.5 h-2 w-12 rounded bg-slate-700" />
                </div>
                <div className="rounded-md bg-slate-50 p-2">
                  <div className="h-1 w-8 rounded bg-slate-300" />
                  <div className="mt-1.5 h-2 w-10 rounded bg-slate-700" />
                </div>
              </div>
            </div>
            <div className="mt-2 h-1.5 w-full rounded bg-slate-100">
              <div className={`h-full w-3/4 rounded ${template.accent}`} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MiniTable({ accent, dense = false }: { accent: string; dense?: boolean }) {
  return (
    <div className="overflow-hidden rounded-md border border-slate-200">
      <div className={`grid grid-cols-3 gap-2 px-2 ${dense ? "py-1" : "py-1.5"} ${accent}`}>
        {[0, 1, 2].map((item) => <div key={item} className="h-1 rounded bg-white/70" />)}
      </div>
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className={`grid grid-cols-3 gap-2 border-t border-slate-100 px-2 ${dense ? "py-1" : "py-1.5"}`}>
          <div className="h-1 rounded bg-slate-200" />
          <div className="h-1 rounded bg-slate-100" />
          <div className="h-1 rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export function ReportTemplates({ onSelectTemplate }: { onSelectTemplate?: (id: string) => void }) {
  const router = useRouter();
  const [activeTier, setActiveTier] = useState<"all" | TemplateTier>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [defaultTemplateId, setDefaultTemplateId] = useState<string>("essential_clean");

  const filteredTemplates = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return REPORT_TEMPLATES.filter((template) => {
      const matchesTier = activeTier === "all" || template.tier === activeTier;
      const matchesSearch = !query || `${template.name} ${template.useCase} ${template.description} ${template.features.join(" ")}`.toLowerCase().includes(query);
      return matchesTier && matchesSearch;
    });
  }, [activeTier, searchQuery]);

  const handleTemplateClick = (templateId: string) => {
    if (onSelectTemplate) onSelectTemplate(templateId);
    else router.push(`/dashboard/reports/center?template=${templateId}`);
  };

  const toggleFavorite = (templateId: string) => {
    setFavoriteIds((current) => current.includes(templateId)
      ? current.filter((id) => id !== templateId)
      : [...current, templateId]);
  };

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search templates..." className="w-full sm:w-80" />
          <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
            <Filter className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <FilterChips 
            options={[
              { label: 'All', value: 'all', count: REPORT_TEMPLATES.length },
              { label: 'Basic', value: 'basic', count: REPORT_TEMPLATES.filter((item) => item.tier === 'basic').length },
              { label: 'Pro', value: 'pro', count: REPORT_TEMPLATES.filter((item) => item.tier === 'pro').length },
              { label: 'Advanced', value: 'advanced', count: REPORT_TEMPLATES.filter((item) => item.tier === 'advanced').length },
            ]} 
            selected={activeTier} 
            onChange={(val) => setActiveTier(val as any)} 
          />
          {favoriteIds.length > 0 && (
            <span className="flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-rose-600">
              <Heart className="h-3.5 w-3.5 fill-rose-500" /> {favoriteIds.length} saved
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 md:p-5">
        {filteredTemplates.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredTemplates.map((template, index) => {
              const Icon = template.icon;
              const isFavorite = favoriteIds.includes(template.id);
              const isDefault = defaultTemplateId === template.id;
              return (
                <motion.article
                  key={template.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className={`group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${isDefault ? 'border-emerald-300 shadow-emerald-100/50' : 'border-slate-200 hover:border-indigo-200 hover:shadow-slate-200/70'}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFavorite(template.id)}
                    className={`absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-lg border shadow-sm backdrop-blur transition-all active:scale-90 ${isFavorite ? "border-rose-100 bg-rose-50 text-rose-600" : "border-white/80 bg-white/90 text-slate-400 hover:text-rose-500"}`}
                    aria-label={isFavorite ? `Remove ${template.name} from favourites` : `Save ${template.name} to favourites`}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                  </button>
                  <button type="button" onClick={() => handleTemplateClick(template.id)} className="block w-full text-left" aria-label={`Preview ${template.name} template`}>
                    <TemplatePreview template={template} />
                  </button>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${template.accentSoft}`}>
                          <Icon className="h-[18px] w-[18px]" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="truncate text-sm font-bold text-slate-900">{template.name}</h3>
                            {template.badge && !isDefault && <span className="shrink-0 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600">{template.badge}</span>}
                            {isDefault && <span className="shrink-0 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Default</span>}
                          </div>
                          <div className="mt-0.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.11em] text-slate-400">
                            <span>{template.tier}</span><span className="h-1 w-1 rounded-full bg-slate-300" /><span>{template.useCase}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2.5 min-h-9 text-xs leading-[18px] text-slate-500 line-clamp-2">{template.description}</p>
                    <div className="mt-3 flex min-h-5 flex-wrap gap-x-2.5 gap-y-1.5">
                      {template.features.slice(0, 2).map((feature) => (
                        <span key={feature} className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                          <Check className="h-3 w-3 text-emerald-500" /> {feature}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3">
                      <button
                        type="button"
                        onClick={() => setDefaultTemplateId(template.id)}
                        className={`flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border text-xs font-semibold transition-all active:scale-[0.98] ${
                          isDefault
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {isDefault ? (
                          <>
                            <Check className="h-3.5 w-3.5" /> Default
                          </>
                        ) : (
                          "Set Default"
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTemplateClick(template.id)}
                        className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 text-xs font-semibold text-white transition-all hover:bg-indigo-700 active:scale-[0.98]"
                      >
                        <Eye className="h-3.5 w-3.5" /> Preview
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm"><Search className="h-6 w-6" /></div>
            <h3 className="mt-4 font-bold text-slate-900">No matching templates</h3>
            <p className="mt-1 text-sm text-slate-500">Try another name or select a different plan.</p>
          </div>
        )}
      </div>
    </section>
  );
}
