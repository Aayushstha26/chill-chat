"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Paperclip, Smile, Send } from "lucide-react";

interface MessageInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [value, setValue] = useState("");
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
    <div className="px-4 py-4">
      <div className="flex items-end gap-2 bg-zinc-800/70 border border-zinc-700/60 rounded-2xl px-3 py-2 focus-within:border-zinc-500 transition-colors">
        {/* Attach */}
        <button
          className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors flex-shrink-0 mb-0.5"
          title="Attach file"
        >
          <Paperclip size={18} strokeWidth={1.8} />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Message..."
          disabled={disabled}
          className="flex-1 bg-transparent text-zinc-200 placeholder-zinc-600 text-sm resize-none outline-none leading-relaxed py-1.5 max-h-[120px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700 disabled:opacity-40"
        />

        {/* Emoji */}
        <button
          className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors flex-shrink-0 mb-0.5"
          title="Emoji"
        >
          <Smile size={18} strokeWidth={1.8} />
        </button>

        {/* Send */}
        <button
          onClick={handleSend}
          disabled={!canSend}
          className={`p-2 rounded-xl flex-shrink-0 mb-0.5 transition-all duration-150
            ${
              canSend
                ? "bg-white text-black hover:bg-zinc-100 scale-100"
                : "bg-zinc-700 text-zinc-500 cursor-not-allowed scale-95 opacity-50"
            }
          `}
          title="Send (Enter)"
        >
          <Send size={15} strokeWidth={2} />
        </button>
      </div>

      <p className="text-center text-[10px] text-zinc-700 mt-2">
        Press <kbd className="text-zinc-600">Enter</kbd> to send ·{" "}
        <kbd className="text-zinc-600">Shift+Enter</kbd> for new line
      </p>
    </div>
  );
}