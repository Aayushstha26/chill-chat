"use client";

import { Conversation } from "../../types/chat";
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
      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-150 group
        ${
          isActive
            ? "bg-zinc-800 border border-zinc-700"
            : "hover:bg-zinc-800/50 border border-transparent"
        }
      `}
    >
      <UserAvatar user={participant} size="md" showStatus />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span
            className={`text-sm font-semibold truncate ${
              isActive ? "text-white" : "text-zinc-200"
            }`}
          >
            {participant.name}
          </span>
          <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
            {isPinned && (
              <Pin
                size={11}
                className="text-zinc-500 rotate-45"
                strokeWidth={2}
              />
            )}
            <span className="text-[11px] text-zinc-500">{lastMessageTime}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p
            className={`text-xs truncate leading-relaxed ${
              unreadCount > 0 ? "text-zinc-300 font-medium" : "text-zinc-500"
            }`}
          >
            {lastMessage}
          </p>
          {unreadCount > 0 && (
            <span className="ml-2 flex-shrink-0 w-4 h-4 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}