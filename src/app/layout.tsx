import type { Metadata } from "next";
import "./globals.css";
import {
  SITE_ORIGIN,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_KEYWORDS,
  AUTHOR_NAME,
  AUTHOR_URL,
} from "@/lib/seo";

const DESCRIPTION =
  "Independent security research by Gurvinder Singh, CISSP, CISA, GWAPT. AI agent security, MCP vulnerability analysis, OAuth supply-chain research, OWASP ASVS Panjabi translation, and enterprise cyber risk guidance.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
  creator: AUTHOR_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: DESCRIPTION,
    url: SITE_ORIGIN,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: DESCRIPTION,
  },
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
