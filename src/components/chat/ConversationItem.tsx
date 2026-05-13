"use client";

import { Conversation } from "@/types/chat";
import UserAvatar from "./UserAvatar";
import { Pin } from "lucide-react";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export default function ConversationItem({
  conversation,
  isActive,
  onClick,
}: ConversationItemProps) {
  const { participant, lastMessage, lastMessageTime, unreadCount, isPinned } =
    conversation;

  return (
    <button
      onClick={onClick}
      className={`
        relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
        text-left transition-all duration-150 overflow-hidden group
        ${
          isActive
            ? "bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]"
            : "border border-transparent hover:bg-white/[0.04]"
        }
      `}
    >
      {/* Active left bar */}
      {isActive && (
        <span className="absolute left-0 top-[20%] h-[60%] w-0.5 rounded-r-full bg-gradient-to-b from-zinc-400 to-zinc-600 shadow-[0_0_8px_rgba(161,161,170,0.4)]" />
      )}

      <UserAvatar user={participant} size="md" showStatus />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span
            className={`text-[13px] font-semibold truncate ${
              isActive ? "text-zinc-100" : "text-zinc-300"
            }`}
          >
            {participant.name}
          </span>
          <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
            {isPinned && (
              <Pin
                size={10}
                className="text-zinc-600 rotate-45"
                strokeWidth={2}
              />
            )}
            <span className="text-[11px] text-zinc-600">{lastMessageTime}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p
            className={`text-xs truncate leading-relaxed ${
              unreadCount > 0
                ? "text-zinc-400 font-medium"
                : "text-zinc-600"
            }`}
          >
            {lastMessage}
          </p>
          {unreadCount > 0 && (
            <span className="ml-2 flex-shrink-0 w-[18px] h-[18px] rounded-full bg-zinc-200 text-zinc-900 text-[10px] font-bold flex items-center justify-center shadow-[0_0_8px_rgba(228,228,231,0.2)]">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}