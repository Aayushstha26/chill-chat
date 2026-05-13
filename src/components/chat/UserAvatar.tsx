import { User } from "@/types/chat";

interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
  showStatus?: boolean;
}

const statusBg: Record<User["status"], string> = {
  online: "bg-emerald-400",
  offline: "bg-zinc-600",
  away: "bg-amber-400",
  busy: "bg-red-400",
};

const sizeClasses = {
  sm: "w-8 h-8 text-[10px]",
  md: "w-10 h-10 text-xs",
  lg: "w-12 h-12 text-sm",
};

const statusSize = {
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5",
  lg: "w-3 h-3",
};

const gradients = [
  "bg-gradient-to-br from-zinc-700 to-zinc-900",
  "bg-gradient-to-br from-blue-900 to-blue-950",
  "bg-gradient-to-br from-purple-900 to-purple-950",
  "bg-gradient-to-br from-emerald-900 to-emerald-950",
];

const borders = [
  "border-zinc-700",
  "border-blue-800",
  "border-purple-800",
  "border-emerald-800",
];

function pickIndex(initials: string) {
  return (
    ((initials.charCodeAt(0) || 0) + (initials.charCodeAt(1) || 0)) %
    gradients.length
  );
}

export default function UserAvatar({
  user,
  size = "md",
  showStatus = false,
}: UserAvatarProps) {
  const idx = pickIndex(user.initials);

  return (
    <div className="relative flex-shrink-0">
      <div
        className={`
          ${sizeClasses[size]} ${gradients[idx]} ${borders[idx]}
          rounded-full border flex items-center justify-center
          font-semibold text-zinc-300 tracking-wide select-none
        `}
      >
        {user.initials}
      </div>
      {showStatus && (
        <span
          className={`
            absolute bottom-0 right-0 ${statusSize[size]} ${statusBg[user.status]}
            rounded-full border-2 border-[#0a0a0a]
          `}
        />
      )}
    </div>
  );
}