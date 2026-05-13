"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/chat/sidebar';
import ChatWindow from '@/components/chat/ChatWindow';
import { mockConversations } from '@/lib/mockData';
import { Conversation } from '@/types/chat';

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    mockConversations[0]?.id || null
  );

  const activeConversation = conversations.find(c => c.id === activeConversationId) || null;

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  const handleSendMessage = (conversationId: string, content: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const newMessage = {
          id: `m${Date.now()}`,
          content,
          senderId: 'me', // CURRENT_USER_ID from mockData is 'me'
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text' as const,
          read: true,
        };
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: content,
          lastMessageTime: newMessage.timestamp,
        };
      }
      return conv;
    }));
  };

  return (
    <div className="flex h-full w-full">
      <Sidebar 
        conversations={conversations} 
        activeConversationId={activeConversationId} 
        onSelectConversation={handleSelectConversation} 
      />
      <ChatWindow 
        conversation={activeConversation} 
        onSendMessage={handleSendMessage} 
      />
    </div>
  );
}