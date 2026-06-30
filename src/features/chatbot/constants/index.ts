import { Message, ChatHistoryItem } from "../types";

export const SUGGESTIONS = [
  "What features does CampusOS have?",
  "How to onboard a new student?",
  "Show me today's timetable",
  "Generate financial report",
];

export const INITIAL_MESSAGE: Message = {
  id: "init-1",
  text: "Hello! I'm **CampusOS AI**, your intelligent assistant. \n\nHow can I help you manage your institute today?",
  sender: "bot",
  timestamp: new Date(),
};

export const MOCK_HISTORY: ChatHistoryItem[] = [
  { id: "h1", title: "Student attendance report", date: "Today" },
  { id: "h2", title: "Faculty schedule conflict", date: "Today" },
  { id: "h3", title: "Financial overview Q3", date: "Yesterday" },
  { id: "h4", title: "Onboarding new staff", date: "Previous 7 Days" },
  { id: "h5", title: "Library management query", date: "Previous 7 Days" },
];
