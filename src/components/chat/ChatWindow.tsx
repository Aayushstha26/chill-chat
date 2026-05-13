"use client";

import { useEffect, useRef } from "react";
import { Phone, Video, MoreHorizontal, Hash } from "lucide-react";
import { Conversation, Message } from "@/types/chat";
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
  busy: "bg-red-400",
};

function groupMessages(messages: Message[]) {
  return messages.map((msg, i) => {
    const prev = messages[i - 1];
    return { ...msg, showAvatar: !prev || prev.senderId !== msg.senderId };
  });
}

function HeaderBtn({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      title={label}
      className="p-2 rounded-[9px] border border-transparent text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.05] hover:border-white/[0.07] transition-all duration-150"
    >
      {icon}
    </button>
  );
}

export default function ChatWindow({
  conversation,
  onSendMessage,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  /* ── Empty / welcome state ── */
  if (!conversation) {
    return (
      <div className="chat-bg flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        <DecorativeBg />
        <div className="relative z-10 text-center max-w-sm px-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/[0.08] flex items-center justify-center mx-auto mb-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <Hash size={24} className="text-zinc-600" strokeWidth={1.5} />
          </div>
          <p className="text-[26px] font-bold text-zinc-100 tracking-tight leading-tight mb-1">
            Talk to your team,
          </p>
          <p className="text-[26px] font-bold text-zinc-600 italic tracking-tight leading-tight mb-4">
            without the noise.
          </p>
          <p className="text-[13px] text-zinc-600 leading-relaxed">
            Real-time chat built for focus. No distractions — just the
            conversations that matter.
          </p>
        </div>
      </div>
    );
  }

  const grouped = groupMessages(conversation.messages);

  return (
    <div className="chat-bg flex-1 flex flex-col h-full overflow-hidden relative">
      {/* Header */}
      <header className="relative flex items-center justify-between px-5 py-3 border-b border-white/[0.05] bg-[#0a0a0a]/80 backdrop-blur-sm flex-shrink-0">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div className="flex items-center gap-3">
          <UserAvatar user={conversation.participant} size="md" showStatus />
          <div>
            <p className="text-sm font-semibold text-zinc-100 leading-none mb-1 tracking-tight">
              {conversation.participant.name}
            </p>
            <div className="flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusDot[conversation.participant.status]}`}
              />
              <span className="text-[11px] text-zinc-600">
                {conversation.participant.status === "offline" &&
                conversation.participant.lastSeen
                  ? `Last seen ${conversation.participant.lastSeen}`
                  : statusLabel[conversation.participant.status]}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-0.5">
          <HeaderBtn icon={<Phone size={16} strokeWidth={1.8} />} label="Voice call" />
          <HeaderBtn icon={<Video size={16} strokeWidth={1.8} />} label="Video call" />
          <HeaderBtn icon={<MoreHorizontal size={16} strokeWidth={1.8} />} label="More options" />
        </div>
      </header>

      {/* Date chip */}
      <div className="flex justify-center pt-4 pb-2">
        <span className="text-[11px] text-zinc-600 bg-white/[0.04] border border-white/[0.05] rounded-full px-3 py-1">
          Today
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-2 flex flex-col gap-1.5 bg-transparent">
        {grouped.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.senderId === CURRENT_USER_ID}
            senderInitials={conversation.participant.initials}
            showAvatar={msg.showAvatar}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-white/[0.05] bg-[#0a0a0a]/60 backdrop-blur-md">
        <MessageInput
          onSend={(content) => onSendMessage(conversation.id, content)}
        />
      </div>
    </div>
  );
}

function DecorativeBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(88%, 12%)">
        <circle cx="0" cy="0" r="70" fill="none" stroke="white" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="45" fill="none" stroke="white" strokeWidth="0.4" />
        <circle cx="0" cy="0" r="22" fill="none" stroke="white" strokeWidth="0.4" />
        <circle cx="0" cy="0" r="5"  fill="none" stroke="white" strokeWidth="0.6" />
        <line x1="-90" y1="0" x2="90" y2="0" stroke="white" strokeWidth="0.4" />
        <line x1="0" y1="-90" x2="0" y2="90" stroke="white" strokeWidth="0.4" />
      </g>
      <g transform="translate(12%, 82%)">
        <circle cx="0" cy="0" r="55" fill="none" stroke="white" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="33" fill="none" stroke="white" strokeWidth="0.4" />
        <circle cx="0" cy="0" r="14" fill="none" stroke="white" strokeWidth="0.4" />
        <line x1="-70" y1="0" x2="70" y2="0" stroke="white" strokeWidth="0.4" />
        <line x1="0" y1="-70" x2="0" y2="70" stroke="white" strokeWidth="0.4" />
      </g>
      <g stroke="white" strokeWidth="1.2" fill="none">
        <path d="M 24 48 L 24 24 L 48 24" />
      </g>
      <line x1="60%" y1="0" x2="80%" y2="40%" stroke="white" strokeWidth="0.3" opacity="0.5" />
      <line x1="40%" y1="100%" x2="20%" y2="60%" stroke="white" strokeWidth="0.3" opacity="0.5" />
    </svg>
  );
}