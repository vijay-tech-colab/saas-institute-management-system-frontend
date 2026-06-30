"use client"
import React, { useState } from 'react';
import { MessageList } from './MessageList';
import { MessageDetail } from './MessageDetail';
import { Conversation } from '../types';

// Dummy data for Computer Institute SaaS
const DUMMY_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    subject: 'Request for additional AWS Credits',
    participantName: 'Alex Mercer',
    participantRole: 'Student - Cloud Computing Batch',
    lastMessage: 'I have exhausted my tier limits on EC2. Can I get more credits for the final project?',
    lastMessageTime: '10:42 AM',
    status: 'unread',
    priority: 'high',
    category: 'IT Support',
    messages: [
      {
        id: 'm1',
        senderId: 'alex1',
        senderName: 'Alex Mercer',
        senderRole: 'Student',
        content: 'Hi Admin, I am currently working on my capstone project for the Cloud Architecture bootcamp. I seem to have exhausted my AWS Educate credits because I accidentally left a large EC2 instance running overnight. Is it possible to request an additional $50 credit allocation so I can finish the deployment?',
        timestamp: '10:42 AM',
        isMe: false
      }
    ]
  },
  {
    id: 'c2',
    subject: 'GitHub Repository Access Denied',
    participantName: 'Sarah Jenkins',
    participantRole: 'Instructor - Full Stack Web Dev',
    lastMessage: 'Please grant me access to the cohort-7-final-projects repo.',
    lastMessageTime: 'Yesterday',
    status: 'read',
    priority: 'urgent',
    category: 'Academics',
    messages: [
      {
        id: 'm2',
        senderId: 'sarah1',
        senderName: 'Sarah Jenkins',
        senderRole: 'Instructor',
        content: 'Hello, I am trying to review the assignments for Cohort 7, but I am getting a 403 Forbidden error on the GitHub organization page. Please grant me write access to the cohort-7-final-projects repository ASAP.',
        timestamp: 'Yesterday, 4:15 PM',
        isMe: false
      },
      {
        id: 'm3',
        senderId: 'admin1',
        senderName: 'System Admin',
        senderRole: 'Admin',
        content: 'Hi Sarah, sorry about that. It looks like your team permissions were reset during the automated sync. I have re-added you to the Instructors team. You should have access now.',
        timestamp: 'Yesterday, 4:30 PM',
        isMe: true
      },
      {
        id: 'm4',
        senderId: 'sarah1',
        senderName: 'Sarah Jenkins',
        senderRole: 'Instructor',
        content: 'Thanks! I can see the repos now.',
        timestamp: 'Yesterday, 4:45 PM',
        isMe: false
      }
    ]
  },
  {
    id: 'c3',
    subject: 'Invoice #INV-2026-089 Overdue',
    participantName: 'Michael Chang',
    participantRole: 'Parent',
    lastMessage: 'I tried paying via Stripe but the transaction failed. Can you send a new link?',
    lastMessageTime: 'Oct 18',
    status: 'replied',
    priority: 'normal',
    category: 'Finance',
    messages: [
      {
        id: 'm5',
        senderId: 'mike1',
        senderName: 'Michael Chang',
        senderRole: 'Parent',
        content: 'Hi, I received the automated reminder for David\'s Python Masterclass fee. I tried to pay it yesterday using the Stripe link but it said the session had expired. Can you please generate a new payment link?',
        timestamp: 'Oct 18, 9:00 AM',
        isMe: false
      }
    ]
  }
];

export function InboxLayout() {
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const activeConversation = DUMMY_CONVERSATIONS.find(c => c.id === activeId) || null;

  return (
    <div className="flex w-full h-[calc(100vh-100px)] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-4">
      <MessageList 
        conversations={DUMMY_CONVERSATIONS} 
        activeId={activeId} 
        onSelect={setActiveId} 
      />
      <div className="hidden md:flex flex-1">
        <MessageDetail conversation={activeConversation} />
      </div>
      
      {/* Mobile view handling could be added here (e.g., conditionally hiding the list when a message is active) */}
    </div>
  );
}
