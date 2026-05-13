import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChillChat — Dashboard",
  description: "Manage your conversations and settings.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] overflow-hidden">
      {children}
    </div>
  );
}