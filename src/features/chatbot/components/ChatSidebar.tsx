import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageSquare as MessageIcon, X } from "lucide-react";
import { MOCK_HISTORY } from "../constants";

type ChatSidebarProps = {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  handleClearChat: () => void;
};

export function ChatSidebar({ showSidebar, setShowSidebar, handleClearChat }: ChatSidebarProps) {
  return (
    <>
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="border-r border-slate-200/60 bg-slate-50/80 backdrop-blur-xl flex flex-col shrink-0 overflow-hidden absolute sm:relative h-full z-20 sm:z-0 shadow-2xl sm:shadow-none"
          >
            <div className="p-4 border-b border-slate-200/60 bg-white/50 backdrop-blur-md">
              <button
                onClick={handleClearChat}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-2.5 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Plus size={16} /> New Chat
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-6 scrollbar-thin scrollbar-thumb-slate-200">
              {["Today", "Yesterday", "Previous 7 Days"].map((dateGroup) => (
                <div key={dateGroup}>
                  <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
                    {dateGroup}
                  </h4>
                  <div className="space-y-0.5">
                    {MOCK_HISTORY.filter((h) => h.date === dateGroup).map((chat) => (
                      <button
                        key={chat.id}
                        onClick={() => {
                          if (window.innerWidth < 640) setShowSidebar(false);
                        }}
                        className="w-full text-left flex items-center gap-2 p-2.5 rounded-lg hover:bg-white hover:shadow-sm text-slate-700 transition-all group cursor-pointer border border-transparent hover:border-slate-200/60"
                      >
                        <MessageIcon
                          size={14}
                          className="text-slate-400 group-hover:text-indigo-500 shrink-0 transition-colors"
                        />
                        <span className="text-[13px] truncate font-medium group-hover:text-slate-900">{chat.title}</span>
                      </button>
                    ))}
                    {MOCK_HISTORY.filter((h) => h.date === dateGroup).length === 0 && (
                      <div className="text-xs text-slate-400 italic px-1">No chats</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowSidebar(false)}
              className="sm:hidden absolute top-4 right-3 p-1.5 bg-white/80 backdrop-blur rounded-full text-slate-500 shadow-sm border border-slate-200"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSidebar(false)}
            className="sm:hidden absolute inset-0 bg-slate-900/40 z-10 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </>
  );
}
