import React from 'react';
import { Conversation } from '../types';
import { MoreVertical, Reply, CornerUpLeft, Paperclip, Send, CheckCircle2 } from 'lucide-react';

interface MessageDetailProps {
  conversation: Conversation | null;
}

export function MessageDetail({ conversation }: MessageDetailProps) {
  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 text-center p-8">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-300 mb-4 shadow-sm">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">No Message Selected</h3>
        <p className="text-sm text-slate-500 max-w-sm">Choose a conversation from the list to view its details and reply.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-lg">
            {conversation.participantAvatar ? (
              <img src={conversation.participantAvatar} alt={conversation.participantName} className="w-full h-full rounded-full object-cover" />
            ) : (
              conversation.participantName.charAt(0)
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{conversation.participantName}</h2>
            <p className="text-xs font-medium text-slate-500">{conversation.participantRole}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {conversation.status === 'read' && (
             <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
               <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
             </span>
          )}
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-slate-900">{conversation.subject}</h3>
          <span className="inline-block mt-2 px-3 py-1 bg-slate-200 text-slate-600 text-xs font-semibold rounded-full">
            {conversation.category}
          </span>
        </div>

        {conversation.messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
            {!msg.isMe && (
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs flex-shrink-0">
                {msg.senderName.charAt(0)}
              </div>
            )}
            <div className={`max-w-[80%] ${msg.isMe ? 'items-end' : 'items-start'} flex flex-col`}>
              <div className="flex items-baseline gap-2 mb-1 px-1">
                <span className="text-xs font-semibold text-slate-700">{msg.senderName}</span>
                <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
              </div>
              <div className={`p-4 rounded-2xl text-sm shadow-sm ${
                msg.isMe 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Box */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="border border-slate-300 rounded-xl bg-slate-50 focus-within:ring-2 focus-within:ring-indigo-600/20 focus-within:border-indigo-600 focus-within:bg-white transition-all overflow-hidden">
          <textarea 
            placeholder="Write your reply..." 
            className="w-full min-h-[100px] p-4 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400 resize-y"
          ></textarea>
          <div className="flex items-center justify-between p-2 border-t border-slate-200 bg-white">
            <div className="flex gap-1">
              <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer">
                <Paperclip className="w-5 h-5" />
              </button>
            </div>
            <button className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer">
              Send Reply <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
