import { useState, useRef, useEffect } from "react";
import { useAtom } from "jotai";
import { Message } from "../types";
import { INITIAL_MESSAGE } from "../constants";
import { isChatbotOpenAtom } from "@/store/layout-store";

export function useChat() {
  const [isOpen, setIsOpen] = useAtom(isChatbotOpenAtom);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 50);
    }
  }, [messages, isOpen, isTyping]);

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand you need assistance with that.\n\nAs a highly advanced AI tailored for CampusOS, I can help you manage:\n- Student Enrollments\n- Staff Directories\n- Academic Courses\n\nWhat specific detail would you like to explore first?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1800);
  };

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleClearChat = () => {
    setMessages([{ ...INITIAL_MESSAGE, id: Date.now().toString() }]);
    setInputValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    if (window.innerWidth < 640) setShowSidebar(false);
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return {
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
  };
}
