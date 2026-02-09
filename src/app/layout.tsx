import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SecurityLeader.ai — AI Security Research & Cyber Risk",
  description: "Independent security research by Gurvinder Singh, CISSP, CISA. AI agent security, MCP vulnerability analysis, OAuth supply-chain research, and enterprise cyber risk guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
