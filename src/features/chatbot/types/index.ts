export type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export type ChatHistoryItem = {
  id: string;
  title: string;
  date: string;
};
