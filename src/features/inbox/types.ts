export type MessageStatus = 'unread' | 'read' | 'replied';
export type Priority = 'low' | 'normal' | 'high' | 'urgent';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

export type MessageCategory = 'General' | 'Finance' | 'IT Support' | 'Domain & SSL' | 'Subscriptions' | 'IAM & Security';

export interface Conversation {
  id: string;
  subject: string;
  participantName: string;
  participantRole: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  status: MessageStatus;
  priority: Priority;
  category: MessageCategory;
  messages: Message[];
}
