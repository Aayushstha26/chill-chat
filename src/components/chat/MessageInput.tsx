"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Paperclip, Smile, Send, Mic } from "lucide-react";

interface MessageInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="px-4 py-3">
      <div
        className={`
          flex items-end gap-1 rounded-2xl px-2 py-1.5 transition-all duration-200
          ${
            focused
              ? "bg-white/[0.06] border border-white/[0.12] shadow-[0_0_0_3px_rgba(255,255,255,0.03),0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-white/[0.03] border border-white/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
          }
        `}
      >
        {/* Attach */}
        <button
          title="Attach file"
          className="p-2 rounded-lg text-zinc-600 hover:text-zinc-400 transition-colors flex-shrink-0"
        >
          <Paperclip size={17} strokeWidth={1.8} />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Message..."
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none resize-none text-zinc-200 placeholder-zinc-700 text-[13.5px] leading-relaxed py-2 px-1 max-h-[120px] font-sans disabled:opacity-40"
        />

        {/* Emoji */}
        <button
          title="Emoji"
          className="p-2 rounded-lg text-zinc-600 hover:text-zinc-400 transition-colors flex-shrink-0"
        >
          <Smile size={17} strokeWidth={1.8} />
        </button>

        {/* Mic (shown when no input) */}
        {!canSend && (
          <button
            title="Voice message"
            className="p-2 rounded-lg text-zinc-600 hover:text-zinc-400 transition-colors flex-shrink-0"
          >
            <Mic size={17} strokeWidth={1.8} />
          </button>
        )}

        {/* Send */}
        {canSend && (
          <button
            onClick={handleSend}
            title="Send (Enter)"
            className="w-[34px] h-[34px] rounded-xl flex-shrink-0 bg-gradient-to-br from-zinc-200 to-zinc-400 text-zinc-900 flex items-center justify-center hover:scale-105 hover:shadow-[0_4px_12px_rgba(228,228,231,0.25)] active:scale-95 transition-all duration-150 shadow-[0_2px_8px_rgba(228,228,231,0.15)]"
          >
            <Send size={14} strokeWidth={2.5} />
          </button>
        )}
      </div>

      <p className="text-center text-[10px] text-zinc-800 mt-1.5">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}