import { Message, ChatHistoryItem } from "../types";

export const SUGGESTIONS = [
  "What features does CampusOS Super Admin have?",
  "How do I onboard a new tenant or institute?",
  "Show me platform MRR and active subscriptions",
  "Generate tenant growth and security audit report",
];

export const INITIAL_MESSAGE: Message = {
  id: "init-1",
  text: "Hello! I'm **CampusOS Platform AI**, your SaaS operations assistant. \n\nHow can I help you manage your institutes, platform infrastructure, and subscriptions today?",
  sender: "bot",
  timestamp: new Date(),
};

export const MOCK_HISTORY: ChatHistoryItem[] = [
  { id: "h1", title: "Tenant onboarding assistance", date: "Today" },
  { id: "h2", title: "Monthly recurring revenue breakdown", date: "Today" },
  { id: "h3", title: "API logs and system health diagnostics", date: "Yesterday" },
  { id: "h4", title: "Subscription plan tiering update", date: "Previous 7 Days" },
  { id: "h5", title: "IAM permission policy review", date: "Previous 7 Days" },
];
