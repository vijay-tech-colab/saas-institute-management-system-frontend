"use client"
import React, { useState } from 'react';
import { MessageList } from './MessageList';
import { MessageDetail } from './MessageDetail';
import { Conversation } from '../types';

// Conversations for SaaS Super Admin Platform
const DUMMY_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    subject: 'Request for Custom Domain SSL Certificate',
    participantName: 'Dr. Rajiv Malhotra',
    participantRole: 'Institute Director - Apex Computing Institute',
    lastMessage: 'We have updated our DNS CNAME records to point to portal.apexinstitute.in. Could you verify and issue SSL?',
    lastMessageTime: '10:42 AM',
    status: 'unread',
    priority: 'high',
    category: 'Domain & SSL',
    messages: [
      {
        id: 'm1',
        senderId: 'rajiv1',
        senderName: 'Dr. Rajiv Malhotra',
        senderRole: 'Institute Director',
        content: 'Hi Platform Admin, we have completed our tenant onboarding and mapped our custom subdomain portal.apexinstitute.in. Could you verify our DNS propagation and trigger the automated SSL certificate generation?',
        timestamp: '10:42 AM',
        isMe: false
      }
    ]
  },
  {
    id: 'c2',
    subject: 'Enterprise Plan Upgrade & Dedicated Storage',
    participantName: 'Sarah Jenkins',
    participantRole: 'Tenant Admin - TechEdu Global Network',
    lastMessage: 'Thank you! The automated quota increase is now active on our tenant dashboard.',
    lastMessageTime: 'Yesterday',
    status: 'read',
    priority: 'urgent',
    category: 'Subscriptions',
    messages: [
      {
        id: 'm2',
        senderId: 'sarah1',
        senderName: 'Sarah Jenkins',
        senderRole: 'Tenant Admin',
        content: 'Hello Super Admin team, our student capacity has surpassed 5,000 across our 8 campuses. We would like to upgrade to the Enterprise Custom tier with dedicated AWS S3 bucket storage.',
        timestamp: 'Yesterday, 4:15 PM',
        isMe: false
      },
      {
        id: 'm3',
        senderId: 'superadmin1',
        senderName: 'Alex Rivera',
        senderRole: 'Super Admin',
        content: 'Hi Sarah, glad to hear of your growth! I have enabled the Enterprise Custom tier for TechEdu Global with 1TB dedicated cloud storage. The updated invoice has been posted to your Subscriptions tab.',
        timestamp: 'Yesterday, 4:30 PM',
        isMe: true
      },
      {
        id: 'm4',
        senderId: 'sarah1',
        senderName: 'Sarah Jenkins',
        senderRole: 'Tenant Admin',
        content: 'Thank you! The automated quota increase is now active on our tenant dashboard.',
        timestamp: 'Yesterday, 4:45 PM',
        isMe: false
      }
    ]
  },
  {
    id: 'c3',
    subject: 'SSO & SAML 2.0 Integration Support',
    participantName: 'Michael Chang',
    participantRole: 'IT Director - Horizon Institute',
    lastMessage: 'The metadata XML has been imported. Ready for test handshake.',
    lastMessageTime: 'Oct 18',
    status: 'replied',
    priority: 'normal',
    category: 'IAM & Security',
    messages: [
      {
        id: 'm5',
        senderId: 'mike1',
        senderName: 'Michael Chang',
        senderRole: 'IT Director',
        content: 'Hello, our institute uses Okta for staff authentication. Could you review our SAML 2.0 metadata certificate so we can enforce single sign-on across our organization?',
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
    <div className="flex w-full h-[calc(100vh-160px)] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-4">
      <MessageList 
        conversations={DUMMY_CONVERSATIONS} 
        activeId={activeId} 
        onSelect={setActiveId} 
      />
      <div className="hidden md:flex flex-1">
        <MessageDetail conversation={activeConversation} />
      </div>
    </div>
  );
}
