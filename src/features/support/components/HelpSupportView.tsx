"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSetAtom } from "jotai";
import { isChatbotOpenAtom } from "@/store/layout-store";
import { 
  Search, 
  HelpCircle, 
  Book, 
  MessageSquare, 
  Mail, 
  Phone, 
  ChevronDown, 
  ArrowRight,
  LifeBuoy,
  PlayCircle,
  FileText
} from "lucide-react";

// --- Mock Data ---
const FAQs = [
  {
    id: "faq-1",
    category: "Getting Started",
    question: "How do I add a new branch to my institute?",
    answer: "You can add a new branch by navigating to 'Branch Management' -> 'Create Branch'. Fill in the required branch details, including the name, contact info, and address. Once saved, you can easily switch between branches using the branch switcher in the top left corner of the sidebar."
  },
  {
    id: "faq-2",
    category: "Account & Settings",
    question: "Can I customize the roles and permissions for my staff?",
    answer: "Yes! Navigate to 'Identity & Access Management' -> 'Roles'. You can create custom roles (e.g., 'Senior Teacher', 'Accountant') and assign specific permissions from the Permissions Builder. Assign these roles to your users via the User Management tab."
  },
  {
    id: "faq-3",
    category: "Billing & Subscriptions",
    question: "How do I upgrade my subscription plan?",
    answer: "Go to the 'Subscriptions' module and select 'Plans & Pricing'. Choose the plan that best fits your institute's size and needs, and click 'Upgrade'. You can manage your payment methods in the Settings section."
  },
  {
    id: "faq-4",
    category: "API & Integrations",
    question: "Where can I find the API documentation?",
    answer: "The API documentation is available for enterprise clients in the 'Developer Hub' section (under Platform Settings). You can generate API keys and view comprehensive endpoint guides there."
  },
  {
    id: "faq-5",
    category: "Billing & Subscriptions",
    question: "How do I generate student fee receipts?",
    answer: "When a fee is collected under 'Operations & Finance' -> 'Fees' -> 'Collect Fees', a receipt is automatically generated. You can download or print the receipt immediately, or view past receipts from the 'Pending Fees' tab."
  }
];

const categories = [
  { id: "cat-1", icon: Book, label: "Getting Started", count: 12 },
  { id: "cat-2", icon: LifeBuoy, label: "Account & Settings", count: 8 },
  { id: "cat-3", icon: MessageSquare, label: "Billing & Subscriptions", count: 15 },
  { id: "cat-4", icon: PlayCircle, label: "Video Tutorials", count: 24 },
  { id: "cat-5", icon: FileText, label: "API & Integrations", count: 6 },
];

// --- Components ---

function FaqItem({ faq, isOpen, onToggle }: { faq: typeof FAQs[0], isOpen: boolean, onToggle: () => void }) {
  return (
    <div className={`border rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md ${isOpen ? 'border-primary-200' : 'border-slate-100 hover:border-primary-100'}`}>
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left bg-white outline-none focus-visible:bg-slate-50 cursor-pointer"
      >
        <span className="font-semibold text-slate-800 text-[15px] pr-8">{faq.question}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-primary-600 text-white shadow-md shadow-primary-200' : 'bg-slate-50 text-slate-400'}`}>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="p-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-50">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function HelpSupportView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const setIsChatbotOpen = useSetAtom(isChatbotOpenAtom);

  const filteredFaqs = FAQs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? faq.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 w-full min-h-0 overflow-y-auto bg-slate-50/50 relative">
      
      {/* ─── Hero Section ─── */}
      <div className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-violet-900 px-6 py-16 md:py-24 overflow-hidden shrink-0">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/20 border border-primary-400/30 text-primary-100 text-xs font-semibold mb-6">
              <HelpCircle className="w-4 h-4" />
              <span>Help Center</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              How can we help you today?
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search for articles, guides, or FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder:text-white/50 outline-none focus:bg-white/20 focus:border-white/40 focus:ring-4 focus:ring-white/10 transition-all text-[15px] shadow-xl shadow-primary-900/20"
            />
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10 -mt-8 relative z-20 space-y-10 pb-20">
        
        {/* ─── Categories Grid ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {categories.map((cat, i) => {
            const isSelected = selectedCategory === cat.label;
            return (
              <div 
                key={i} 
                onClick={() => setSelectedCategory(isSelected ? null : cat.label)}
                className={`p-5 rounded-2xl border shadow-sm transition-all duration-300 cursor-pointer group flex flex-col items-center text-center ${
                  isSelected 
                    ? "bg-primary-600 border-primary-600 shadow-primary-200" 
                    : "bg-white border-slate-100 hover:shadow-md hover:border-primary-100"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-primary-50 text-primary-600 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white"
                }`}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <h3 className={`text-[13px] font-bold mb-1 leading-tight transition-colors ${
                  isSelected ? "text-white" : "text-slate-800 group-hover:text-primary-600"
                }`}>
                  {cat.label}
                </h3>
                <p className={`text-[11px] font-medium ${isSelected ? "text-primary-100" : "text-slate-400"}`}>
                  {cat.count} articles
                </p>
              </div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ─── Left Column: FAQs ─── */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-sm">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedCategory ? `${selectedCategory} FAQs` : "Frequently Asked Questions"}
                </h2>
                <p className="text-sm text-slate-500">Quick answers to common questions</p>
              </div>
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaqItem 
                        faq={faq} 
                        isOpen={openFaq === faq.id} 
                        onToggle={() => setOpenFaq(openFaq === faq.id ? null : faq.id)} 
                      />
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 text-center bg-white border border-slate-100 rounded-2xl"
                  >
                    <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600 font-medium">No results found.</p>
                    <p className="text-sm text-slate-400 mt-1">Try adjusting your search terms or category filter.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ─── Right Column: Contact & Support ─── */}
          <div className="space-y-6">
            
            {/* Contact Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Still need help?</h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Our support team is always ready to assist you. Choose a preferred method of contact below.
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => setIsChatbotOpen(true)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-primary-50/50 hover:bg-primary-50 border border-transparent hover:border-primary-100 transition-all group text-left cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">Live Chat</p>
                    <p className="text-[11px] text-slate-500">AI Assistant & Live Agents</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                </button>

                <a 
                  href="mailto:support@institute-os.com?subject=Support Request"
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 transition-all group text-left cursor-pointer outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">Email Support</p>
                    <p className="text-[11px] text-slate-500">support@institute-os.com</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                </a>

                <a 
                  href="tel:+18001234567"
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all group text-left cursor-pointer outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">Call Us</p>
                    <p className="text-[11px] text-slate-500">+1 (800) 123-4567</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>
              
              <h3 className="text-base font-bold mb-4 relative z-10">Quick Links</h3>
              <ul className="space-y-3 relative z-10">
                <li>
                  <a href="/dashboard/settings" className="text-sm text-slate-300 hover:text-white flex items-center gap-2 group transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500 group-hover:scale-150 transition-transform"></div>
                    Account Settings
                  </a>
                </li>
                <li>
                  <a href="/dashboard/logs" className="text-sm text-slate-300 hover:text-white flex items-center gap-2 group transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500 group-hover:scale-150 transition-transform"></div>
                    System Logs & Status
                  </a>
                </li>
                <li>
                  <a href="/dashboard/subscriptions" className="text-sm text-slate-300 hover:text-white flex items-center gap-2 group transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500 group-hover:scale-150 transition-transform"></div>
                    Billing History
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
