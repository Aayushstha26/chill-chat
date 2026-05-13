"use client";

import { useState } from "react";
import { Search, SquarePen, Settings, LogOut } from "lucide-react";
import { Conversation } from "../../types/chat";
import ConversationItem from "./ConversationItem";

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

export default function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = conversations.filter((c) =>
    c.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="w-72 flex-shrink-0 h-full flex flex-col border-r border-zinc-800 bg-[#0d0d0d]">
      {/* Header */}
      <div className="px-4 pt-5 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Logo icon */}
          <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
            <div className="w-3.5 h-3.5 rounded-sm bg-black" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            ChillChat
          </span>
        </div>
        <button
          className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all"
          title="New chat"
        >
          <SquarePen size={17} strokeWidth={1.8} />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            strokeWidth={2}
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-800/70 border border-zinc-700/50 text-zinc-300 placeholder-zinc-600 text-sm rounded-lg pl-9 pr-3 py-2 outline-none focus:border-zinc-500 focus:bg-zinc-800 transition-all"
          />
        </div>
      </div>

      {/* Section label */}
      <div className="px-4 mb-2">
        <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest">
          Messages
        </p>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto px-2 space-y-0.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
        {filtered.length > 0 ? (
          filtered.map((conv) => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              isActive={activeConversationId === conv.id}
              onClick={() => onSelectConversation(conv.id)}
            />
          ))
        ) : (
          <p className="text-zinc-600 text-sm text-center mt-8">
            No conversations found
          </p>
        )}
      </div>

      {/* Footer — current user */}
      <div className="px-4 py-4 border-t border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-semibold text-zinc-300 select-none">
            ME
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-200 leading-none mb-0.5">
              You
            </p>
            <p className="text-[11px] text-zinc-500">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all">
            <Settings size={15} strokeWidth={1.8} />
          </button>
          <button className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-all">
            <LogOut size={15} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </aside>
  );
}