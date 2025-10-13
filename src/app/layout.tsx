import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Security Leader AI - Security Leadership & AI Insights",
  description: "Thought leadership on AI security, MCP, and cybersecurity best practices",
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
