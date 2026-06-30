"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Bot } from "lucide-react";
import { useChat } from "../hooks/useChat";
import { ChatSidebar } from "./ChatSidebar";
import { ChatHeader } from "./ChatHeader";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { ChatInputArea } from "./ChatInputArea";
import { SUGGESTIONS } from "../constants";

export function ChatbotWidget() {
  const {
    isOpen,
    setIsOpen,
    isExpanded,
    setIsExpanded,
    showSidebar,
    setShowSidebar,
    isTyping,
    messages,
    inputValue,
    messagesEndRef,
    textareaRef,
    handleTextareaInput,
    handleSendMessage,
    onSubmit,
    handleClearChat,
    toggleSidebar,
  } = useChat();

  const showSuggestions = messages.length === 1 && messages[0].sender === "bot" && !isTyping;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop for centered modal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/60 z-[95] backdrop-blur-[2px]"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                width: isExpanded ? "1000px" : showSidebar ? "800px" : undefined,
              }}
              exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className={`
                fixed inset-0 z-[100] flex bg-white shadow-2xl border-slate-200/80 overflow-hidden
                /* Mobile View: Full screen */
                w-full h-[100dvh] rounded-none border-0
                /* Tablet/Desktop View: Centered Modal */
                sm:m-auto sm:w-[550px] lg:w-[650px] sm:h-[650px] sm:max-h-[calc(100vh-100px)] sm:rounded-3xl sm:border
                ring-1 ring-black/5
              `}
              style={{
                height: isExpanded ? "85vh" : undefined,
              }}
            >
              <ChatSidebar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                handleClearChat={handleClearChat}
              />

              {/* Main Chat Area */}
              <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50 relative z-0">
                {/* AI Glow Background */}
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/5 blur-3xl -z-10 pointer-events-none" />

                <ChatHeader
                  toggleSidebar={toggleSidebar}
                  handleClearChat={handleClearChat}
                  isExpanded={isExpanded}
                  setIsExpanded={setIsExpanded}
                  setIsOpen={setIsOpen}
                  isTyping={isTyping}
                />

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-slate-200/80 scrollbar-track-transparent">
                  {messages.map((msg) => (
                    <ChatMessageBubble key={msg.id} message={msg} />
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 max-w-[85%] mr-auto"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center shadow-sm border bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100/50">
                        <Bot size={18} className="text-indigo-600" />
                      </div>
                      <div className="px-5 py-4 rounded-2xl bg-white border border-slate-200/50 rounded-tl-[4px] shadow-sm flex items-center gap-1.5 h-[46px]">
                        <motion.div
                          className="w-2 h-2 bg-indigo-400 rounded-full"
                          animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-indigo-400 rounded-full"
                          animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-indigo-400 rounded-full"
                          animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Suggestion Chips */}
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-2 mt-2 ml-11"
                    >
                      {SUGGESTIONS.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(suggestion)}
                          disabled={isTyping}
                          className="text-[13px] text-left font-medium bg-white/80 backdrop-blur-sm border border-slate-200/80 hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-sm text-slate-600 hover:text-indigo-700 px-4 py-2.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} className="h-2 shrink-0" />
                </div>

                <ChatInputArea
                  onSubmit={onSubmit}
                  isTyping={isTyping}
                  inputValue={inputValue}
                  handleTextareaInput={handleTextareaInput}
                  textareaRef={textareaRef}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
