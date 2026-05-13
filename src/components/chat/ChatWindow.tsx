"use client";

import { useEffect, useRef } from "react";
import { Phone, Video, MoreHorizontal } from "lucide-react";
import { Conversation, Message } from "../../types/chat";
import { CURRENT_USER_ID } from "@/lib/mockData";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import UserAvatar from "./UserAvatar";

interface ChatWindowProps {
  conversation: Conversation | null;
  onSendMessage: (conversationId: string, content: string) => void;
}

const statusLabel: Record<string, string> = {
  online: "Online",
  offline: "Offline",
  away: "Away",
  busy: "Do not disturb",
};

const statusDot: Record<string, string> = {
  online: "bg-emerald-400",
  offline: "bg-zinc-600",
  away: "bg-amber-400",
  busy: "bg-red-500",
};

// Group messages to suppress repeated avatars
function groupMessages(messages: Message[]) {
  return messages.map((msg, i) => {
    const prev = messages[i - 1];
    const showAvatar = !prev || prev.senderId !== msg.senderId;
    return { ...msg, showAvatar };
  });
}

export default function ChatWindow({
  conversation,
  onSendMessage,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
        {/* Decorative crosshair */}
        <DecorativeBackground />
        <div className="relative z-10 text-center">
          <p className="text-3xl font-bold text-white mb-2">
            Talk to your team,
          </p>
          <p className="text-3xl font-bold text-zinc-500 italic mb-6">
            without the noise.
          </p>
          <p className="text-sm text-zinc-600 max-w-xs mx-auto leading-relaxed">
            Real-time chat built for focus. No distractions — just the
            conversations that matter.
          </p>
        </div>
      </div>
    );
  }

  const { participant, messages } = conversation;
  const grouped = groupMessages(messages);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0a0a0a] overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-[#0a0a0a] flex-shrink-0">
        <div className="flex items-center gap-3">
          <UserAvatar user={participant} size="md" showStatus />
          <div>
            <p className="text-sm font-semibold text-white leading-none mb-0.5">
              {participant.name}
            </p>
            <div className="flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${statusDot[participant.status]}`}
              />
              <span className="text-[11px] text-zinc-500">
                {participant.status === "offline" && participant.lastSeen
                  ? `Last seen ${participant.lastSeen}`
                  : statusLabel[participant.status]}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all">
            <Phone size={17} strokeWidth={1.8} />
          </button>
          <button className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all">
            <Video size={17} strokeWidth={1.8} />
          </button>
          <button className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all">
            <MoreHorizontal size={17} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
        {grouped.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.senderId === CURRENT_USER_ID}
            senderInitials={participant.initials}
            showAvatar={msg.showAvatar}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-zinc-800">
        <MessageInput
          onSend={(content) => onSendMessage(conversation.id, content)}
        />
      </div>
    </div>
  );
}

function DecorativeBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top-right crosshair */}
      <g transform="translate(85%, 10%)">
        <circle cx="0" cy="0" r="60" fill="none" stroke="white" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="40" fill="none" stroke="white" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="20" fill="none" stroke="white" strokeWidth="0.5" />
        <line x1="-80" y1="0" x2="80" y2="0" stroke="white" strokeWidth="0.5" />
        <line x1="0" y1="-80" x2="0" y2="80" stroke="white" strokeWidth="0.5" />
      </g>
      {/* Bottom-left crosshair */}
      <g transform="translate(15%, 80%)">
        <circle cx="0" cy="0" r="50" fill="none" stroke="white" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="30" fill="none" stroke="white" strokeWidth="0.5" />
        <line x1="-70" y1="0" x2="70" y2="0" stroke="white" strokeWidth="0.5" />
        <line x1="0" y1="-70" x2="0" y2="70" stroke="white" strokeWidth="0.5" />
      </g>
      {/* Corner brackets */}
      <g transform="translate(5%, 5%)" stroke="white" strokeWidth="1" fill="none">
        <path d="M0 20 L0 0 L20 0" />
      </g>
      <g transform="translate(95%, 95%)" stroke="white" strokeWidth="1" fill="none">
        <path d="M0 -20 L0 0 L-20 0" />
      </g>
    </svg>
  );
}