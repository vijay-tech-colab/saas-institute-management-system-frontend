import { Menu, Sparkles, RefreshCcw, Minimize2, Maximize2, X } from "lucide-react";

type ChatHeaderProps = {
  toggleSidebar: () => void;
  handleClearChat: () => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  setIsOpen: (open: boolean) => void;
  isTyping: boolean;
};

export function ChatHeader({
  toggleSidebar,
  handleClearChat,
  isExpanded,
  setIsExpanded,
  setIsOpen,
  isTyping,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/20 bg-white/70 backdrop-blur-2xl shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.02)] relative z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-white rounded-xl transition-all text-slate-500 hover:text-indigo-600 hover:shadow-sm cursor-pointer"
          title="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>
        <div className="w-[1px] h-5 bg-slate-200 mx-1 hidden sm:block"></div>
        <div className="flex items-center gap-3">
          <div className="relative group cursor-default">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-xl animate-pulse blur-[6px] opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-2 rounded-xl shadow-md flex items-center justify-center border border-slate-700/50">
              <Sparkles size={16} className="text-indigo-200" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 tracking-tight text-[15px] leading-tight mb-0.5">
              CampusOS AI
            </h3>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <p className="text-[11px] font-medium text-slate-500 leading-tight">Online and ready</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={handleClearChat}
          disabled={isTyping}
          className="p-2 cursor-pointer hover:bg-white rounded-xl transition-all text-slate-400 hover:text-indigo-600 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          title="Clear Chat"
        >
          <RefreshCcw size={16} />
        </button>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hidden sm:flex cursor-pointer p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-indigo-600 hover:shadow-sm"
          title={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 cursor-pointer hover:bg-red-50 hover:text-red-600 rounded-xl transition-all text-slate-400"
          title="Close"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
