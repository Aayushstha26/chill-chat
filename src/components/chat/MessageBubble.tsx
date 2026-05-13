import { Message } from "../../types/chat";
import { FileText } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  senderInitials?: string;
  showAvatar?: boolean;
}

export default function MessageBubble({
  message,
  isOwn,
  senderInitials = "?",
  showAvatar = true,
}: MessageBubbleProps) {
  if (isOwn) {
    return (
      <div className="flex items-end justify-end gap-2 group">
        <div className="flex flex-col items-end gap-1 max-w-[65%]">
          <div className="bg-zinc-700 text-white text-sm rounded-2xl rounded-br-md px-4 py-2.5 leading-relaxed shadow-sm">
            {message.type === "file" ? (
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-zinc-300 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">{message.fileName}</p>
                  {message.fileSize && (
                    <p className="text-xs text-zinc-400">{message.fileSize}</p>
                  )}
                </div>
              </div>
            ) : (
              message.content
            )}
          </div>
          <span className="text-[10px] text-zinc-600 pr-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {message.timestamp}
          </span>
        </div>

        {showAvatar && (
          <div className="w-7 h-7 rounded-full bg-zinc-700 border border-zinc-600 flex items-center justify-center text-[10px] font-semibold text-zinc-300 flex-shrink-0 mb-4">
            ME
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2 group">
      {showAvatar ? (
        <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-semibold text-zinc-400 flex-shrink-0 mb-4">
          {senderInitials}
        </div>
      ) : (
        <div className="w-7 flex-shrink-0" />
      )}

      <div className="flex flex-col items-start gap-1 max-w-[65%]">
        <div className="bg-zinc-800/90 border border-zinc-700/50 text-zinc-200 text-sm rounded-2xl rounded-bl-md px-4 py-2.5 leading-relaxed shadow-sm">
          {message.type === "file" ? (
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-zinc-400 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">{message.fileName}</p>
                {message.fileSize && (
                  <p className="text-xs text-zinc-500">{message.fileSize}</p>
                )}
              </div>
            </div>
          ) : (
            message.content
          )}
        </div>
        <span className="text-[10px] text-zinc-600 pl-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}