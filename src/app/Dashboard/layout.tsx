import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "ChillChat — Talk without the noise",
  description:
    "Real-time chat built for focus. No distractions — just the conversations that matter.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="bg-[#0a0a0a] text-white antialiased">{children}</body>
    </html>
  );
}