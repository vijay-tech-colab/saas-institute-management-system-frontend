import { motion } from "framer-motion";
import { Paperclip, Mic, Send } from "lucide-react";

type ChatInputAreaProps = {
  onSubmit: (e?: React.FormEvent) => void;
  isTyping: boolean;
  inputValue: string;
  handleTextareaInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
};

export function ChatInputArea({
  onSubmit,
  isTyping,
  inputValue,
  handleTextareaInput,
  textareaRef,
}: ChatInputAreaProps) {
  return (
    <div className="p-4 bg-white/80 backdrop-blur-xl border-t border-slate-200/60 z-10 shrink-0 relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      
      <form
        onSubmit={onSubmit}
        className="relative flex items-end gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all shadow-sm group"
      >
        <div className="flex gap-1 pb-0.5">
          <button
            type="button"
            disabled={isTyping}
            className="p-2.5 cursor-pointer text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Paperclip size={18} />
          </button>
        </div>

        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleTextareaInput}
          disabled={isTyping}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit();
            }
          }}
          placeholder={isTyping ? "AI is thinking..." : "Message CampusOS AI..."}
          className="flex-1 cursor-text max-h-[140px] min-h-[24px] bg-transparent border-none focus:outline-none py-2.5 px-1 text-[15px] text-slate-800 placeholder-slate-400 resize-none scrollbar-thin scrollbar-thumb-slate-200 disabled:opacity-50 disabled:cursor-not-allowed leading-relaxed"
          rows={1}
        />

        <div className="flex gap-1 pb-0.5 pr-0.5">
          {inputValue.trim() ? (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              type="submit"
              disabled={isTyping}
              className="bg-indigo-600 cursor-pointer text-white p-2.5 rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <Send size={18} className="ml-0.5" />
            </motion.button>
          ) : (
            <button
              type="button"
              disabled={isTyping}
              className="p-2.5 cursor-pointer text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mic size={18} />
            </button>
          )}
        </div>
      </form>
      
      <div className="flex justify-between items-center mt-3 px-2 text-[11px] text-slate-400 font-medium">
        <p className="hidden sm:block">
          Press <kbd className="font-sans px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200 text-slate-500 shadow-sm">Enter</kbd> to send
        </p>
        <p className="sm:hidden">CampusOS AI Assistant</p>
        <p className="flex items-center gap-1">
          <SparklesIcon size={10} className="text-indigo-400" />
          AI generated content may be inaccurate
        </p>
      </div>
    </div>
  );
}

const SparklesIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
    <path d="M4 17v2" />
    <path d="M5 18H3" />
  </svg>
);
