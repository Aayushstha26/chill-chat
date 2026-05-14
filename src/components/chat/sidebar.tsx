"use client";

import { useState } from "react";
import { Search, SquarePen, Settings, LogOut } from "lucide-react";
import { Conversation } from "@/types/chat";
import ConversationItem from "./ConversationItem";
import Cookies from "js-cookie";

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
  const name = Cookies.get("name")?.toString();
  console.log(name);
  const filtered = conversations.filter((c) =>
    c.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="relative w-[280px] flex-shrink-0 h-full flex flex-col bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] border-r border-white/[0.05]">
      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-5 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-[30px] h-[30px] rounded-lg bg-zinc-100 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            <div className="w-3.5 h-3.5 rounded-sm bg-zinc-900" />
          </div>
          <span className="text-[17px] font-bold text-zinc-100 tracking-tight">
            ChillChat
          </span>
        </div>
        <button
          className="p-1.5 rounded-lg border border-transparent text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.06] hover:border-white/[0.08] transition-all duration-150"
          title="New chat"
        >
          <SquarePen size={16} strokeWidth={1.8} />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 mb-4">
        <div className="relative">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none"
            strokeWidth={2}
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.06] text-zinc-300 placeholder-zinc-700 text-[13px] rounded-xl pl-8 pr-3 py-2 outline-none focus:bg-white/[0.06] focus:border-white/[0.12] transition-all duration-150"
          />
        </div>
      </div>

      {/* Section label */}
      <div className="px-4 mb-2">
        <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.12em]">
          Direct Messages
        </p>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-0.5">
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
          <p className="text-zinc-700 text-[13px] text-center mt-8">
            No conversations found
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-white/[0.05]" />

      {/* Footer */}
      <div className="flex items-center justify-between px-3.5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-zinc-700 flex items-center justify-center text-[11px] font-semibold text-zinc-400 select-none">
            ME
          </div>
          <div>
            <p className="text-[13px] font-semibold text-zinc-300 leading-none mb-1">
              {name}
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              <span className="text-[11px] text-zinc-600">Online</span>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <button className="p-1.5 rounded-lg border border-transparent text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.05] transition-all duration-150">
            <Settings size={14} strokeWidth={1.8} />
          </button>
          <button className="p-1.5 rounded-lg border border-transparent text-zinc-600 hover:text-red-400 hover:bg-white/[0.05] transition-all duration-150">
            <LogOut size={14} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </aside>
  );
}