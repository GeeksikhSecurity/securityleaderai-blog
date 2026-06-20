# Security Leader AI Blog

Professional blog for SecurityLeader.ai featuring AI security, MCP research, and cybersecurity leadership content.

## Features

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS
- Markdown blog posts
- Bilingual content (English + Panjabi `pa-in`)
- SEO optimized
- Responsive design

## Content

Blog posts live in `/posts` (Markdown with YAML frontmatter); Panjabi translations in `/posts-i18n/pa-in`; research articles in `src/lib/research.ts`. Listings, "Latest insights," and topic counts are generated dynamically — do not hardcode counts here (they rot). Browse the current set at [`/blog`](https://securityleader.ai/blog) and [`/research`](https://securityleader.ai/research).

Coverage spans AI/LLM security, Model Context Protocol, software supply-chain, security ROI, and a bilingual **Digital Seva** community scam-awareness series (WhatsApp, tech-support, charity, and the 2026 global scam-alert briefs).

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

Deploys automatically to Vercel on push to main branch.

Domain: securityleader.ai

## Adding Posts

Create markdown files in `/posts` directory with frontmatter:

```md
---
title: "Your Title"
date: "2025-10-12"
excerpt: "Brief description"
author: "Author Name"
tags: ["tag1", "tag2"]
---

Your content here...
```

## License

MIT
