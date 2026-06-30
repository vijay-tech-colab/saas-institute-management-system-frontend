import { motion } from "framer-motion";
import { User, Bot } from "lucide-react";
import { Message } from "../types";

const formatInlineText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 bg-slate-100 text-indigo-600 rounded-md text-[13px] font-mono border border-slate-200"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

const renderMessageText = (text: string, isUser: boolean) => {
  const lines = text.split("\n");
  let inList = false;
  const elements: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) {
      if (inList) inList = false;
      elements.push(<div key={`br-${index}`} className="h-1.5" />);
      return;
    }

    const isListItem = trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ");

    if (isListItem) {
      if (!inList) inList = true;
      elements.push(
        <li key={index} className="ml-5 list-disc marker:text-slate-400 pl-1 mb-1">
          {formatInlineText(trimmedLine.slice(2))}
        </li>
      );
    } else {
      if (inList) inList = false;
      elements.push(
        <p key={index} className="mb-1 last:mb-0">
          {formatInlineText(line)}
        </p>
      );
    }
  });

  return (
    <div className={`text-[14px] leading-[1.6] ${isUser ? "text-slate-50" : "text-slate-700"}`}>
      {elements}
    </div>
  );
};

const Avatar = ({ fallback, isBot }: { fallback: React.ReactNode; isBot?: boolean }) => (
  <div
    className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center shadow-sm border ${
      isBot
        ? "bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100/50"
        : "bg-white border-slate-200"
    }`}
  >
    {fallback}
  </div>
);

export function ChatMessageBubble({ message }: { message: Message }) {
  const isUser = message.sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`flex gap-3 max-w-[88%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
    >
      <Avatar
        isBot={!isUser}
        fallback={
          isUser ? (
            <User size={18} className="text-slate-400" />
          ) : (
            <Bot size={18} className="text-indigo-600" />
          )
        }
      />

      <div className="flex flex-col gap-1.5 min-w-0">
        <div
          className={`px-4 py-3.5 rounded-2xl shadow-sm break-words relative group ${
            isUser
              ? "bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-tr-[4px]"
              : "bg-white text-slate-700 border border-slate-200/50 rounded-tl-[4px]"
          }`}
        >
          {renderMessageText(message.text, isUser)}
        </div>
        <span
          className={`text-[10px] font-medium text-slate-400 opacity-70 ${
            isUser ? "text-right mr-1" : "ml-1"
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </motion.div>
  );
}
