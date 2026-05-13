import { User } from "../../types/chat";

interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
  showStatus?: boolean;
}

const statusColors: Record<User["status"], string> = {
  online: "bg-emerald-400",
  offline: "bg-zinc-500",
  away: "bg-amber-400",
  busy: "bg-red-500",
};

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

const statusSizeClasses = {
  sm: "w-2 h-2 border",
  md: "w-2.5 h-2.5 border",
  lg: "w-3 h-3 border-2",
};

export default function UserAvatar({
  user,
  size = "md",
  showStatus = false,
}: UserAvatarProps) {
  return (
    <div className="relative flex-shrink-0">
      <div
        className={`${sizeClasses[size]} rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-semibold text-zinc-300 tracking-wide select-none`}
      >
        {user.initials}
      </div>
      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 ${statusSizeClasses[size]} ${statusColors[user.status]} rounded-full border-zinc-900`}
        />
      )}
    </div>
  );
}