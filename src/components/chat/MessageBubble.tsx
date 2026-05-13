import { Message } from "@/types/chat";
import { FileText, CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  senderInitials?: string;
  showAvatar?: boolean;
}

function Avatar({
  initials,
  own,
}: {
  initials: string;
  own: boolean;
}) {
  return (
    <div
      className={`
        w-7 h-7 rounded-full border flex items-center justify-center
        text-[10px] font-semibold flex-shrink-0 mb-5 select-none
        ${
          own
            ? "bg-gradient-to-br from-zinc-700 to-zinc-900 border-zinc-700 text-zinc-400"
            : "bg-gradient-to-br from-blue-900 to-blue-950 border-blue-800 text-blue-300"
        }
      `}
    >
      {initials}
    </div>
  );
}

export default function MessageBubble({
  message,
  isOwn,
  senderInitials = "?",
  showAvatar = true,
}: MessageBubbleProps) {
  const fileContent = (
    <div className="flex items-center gap-2">
      <FileText size={15} className="flex-shrink-0 text-zinc-400" />
      <div>
        <p className="text-[13px] font-medium m-0">{message.fileName}</p>
        {message.fileSize && (
          <p className="text-[11px] text-zinc-500 m-0">{message.fileSize}</p>
        )}
      </div>
    </div>
  );

  if (isOwn) {
    return (
      <div className="flex items-end justify-end gap-2 group">
        <div className="flex flex-col items-end gap-1 max-w-[62%]">
          <div className="bg-gradient-to-br from-zinc-700 to-zinc-800 border border-white/[0.08] text-zinc-100 text-[13.5px] leading-relaxed rounded-[18px] rounded-br-[4px] px-4 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]">
            {message.type === "file" ? fileContent : message.content}
          </div>
          <div className="flex items-center gap-1 pr-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] text-zinc-600">{message.timestamp}</span>
            <CheckCheck size={11} className="text-zinc-600" />
          </div>
        </div>
        {showAvatar ? (
          <Avatar initials="ME" own />
        ) : (
          <div className="w-7 flex-shrink-0" />
        )}
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2 group">
      {showAvatar ? (
        <Avatar initials={senderInitials} own={false} />
      ) : (
        <div className="w-7 flex-shrink-0" />
      )}
      <div className="flex flex-col items-start gap-1 max-w-[62%]">
        <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.03] border border-white/[0.07] text-zinc-200 text-[13.5px] leading-relaxed rounded-[18px] rounded-bl-[4px] px-4 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm">
          {message.type === "file" ? fileContent : message.content}
        </div>
        <span className="text-[10px] text-zinc-700 pl-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}