import React from 'react';
import { Search, Filter, AlertCircle } from 'lucide-react';
import { Conversation } from '../types';

interface MessageListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export function MessageList({ conversations, activeId, onSelect }: MessageListProps) {
  return (
    <div className="w-full md:w-80 lg:w-96 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col h-full">
      {/* Header & Search */}
      <div className="p-4 border-b border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Inbox</h2>
          <button className="text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer">
            <Filter className="w-5 h-5" />
          </button>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {conversations.map((conv) => (
          <div 
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`p-4 border-b border-slate-50 cursor-pointer transition-colors duration-200 relative ${
              activeId === conv.id ? 'bg-indigo-50/50' : 'hover:bg-slate-50'
            }`}
          >
            {activeId === conv.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-r-full"></div>
            )}
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold flex-shrink-0 text-sm">
                {conv.participantAvatar ? (
                  <img src={conv.participantAvatar} alt={conv.participantName} className="w-full h-full rounded-full object-cover" />
                ) : (
                  conv.participantName.charAt(0)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`text-sm truncate pr-2 ${conv.status === 'unread' ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                    {conv.participantName}
                  </h3>
                  <span className={`text-xs flex-shrink-0 ${conv.status === 'unread' ? 'font-bold text-indigo-600' : 'text-slate-400'}`}>
                    {conv.lastMessageTime}
                  </span>
                </div>
                <p className={`text-xs font-semibold mb-1 truncate ${conv.status === 'unread' ? 'text-slate-800' : 'text-slate-600'}`}>
                  {conv.subject}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {conv.lastMessage}
                </p>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md">
                    {conv.category}
                  </span>
                  {conv.priority === 'urgent' && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                      <AlertCircle className="w-3 h-3" /> Urgent
                    </span>
                  )}
                </div>
              </div>
            </div>
            {conv.status === 'unread' && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
