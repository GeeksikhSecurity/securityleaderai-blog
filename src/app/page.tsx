import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  CalendarIcon,
  ClockIcon,
  ShieldIcon,
  LayersIcon,
  PackageIcon,
  WorkflowIcon,
} from '@/components/icons';
import { ResearchCard } from '@/components/research-card';
import { getAllPosts } from '@/lib/posts';
import { getResearchItems, getResearchTopics } from '@/lib/research';

const topicIcons = {
  shield: ShieldIcon,
  layers: LayersIcon,
  package: PackageIcon,
  workflow: WorkflowIcon,
};

export default function Home() {
  const researchHighlights = getResearchItems().slice(0, 3);
  const posts = getAllPosts().slice(0, 3);
  const topics = getResearchTopics();

  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="flex flex-col items-center text-center">
            <span className="security-tag mb-4">Security Leader AI</span>
            <h1 className="hero-title">
              Advanced Security Research &amp; Insights
            </h1>
            <p className="hero-subtitle">
              Independent security research on AI agent frameworks, OAuth supply-chain vulnerabilities,
              and defensive strategies for enterprise AI programs and critical infrastructure.
            </p>
            <div className="hero-cta">
              <Link href="/research" className={buttonVariants({ size: 'lg' })}>
                Latest research
              </Link>
              <Link
                href="/research?tab=tool"
                className={buttonVariants({ variant: 'outline', size: 'lg' })}
              >
                Explore tools
              </Link>
            </div>
            <div className="small text-muted mt-8">
              Information Security Officer • CISSP • CISA • AI Security & Cyber Risk • Board Advisor
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-50">
        <div className="container flex flex-col gap-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2>Latest research</h2>
              <p className="text-muted mb-0">
                Curated research briefs, tooling, and frameworks for AI and application security teams.
              </p>
            </div>
            <Link
              href="/research"
              className={buttonVariants({ variant: 'secondary', size: 'sm' })}
            >
              View all research →
            </Link>
          </div>

          <div className="grid grid-3">
            {researchHighlights.map((item) => (
              <ResearchCard key={item.slug} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2>Research by topic</h2>
            <p className="text-muted">
              Explore curated research tracks spanning secure AI development, red team methodology,
              and governance-ready tooling.
            </p>
          </div>

          <div className="grid grid-4 mt-10">
            {topics.map((topic) => {
              const Icon = topicIcons[topic.icon as keyof typeof topicIcons] ?? ShieldIcon;
              return (
                <Card
                  key={topic.slug}
                  className="card-clickable flex flex-col gap-4 transition-transform hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg text-primary-800">{topic.name}</h3>
                    <p className="text-muted mb-0">
                      {topic.count} curated resources
                    </p>
                  </div>
                  <Link
                    href={`/research?topic=${topic.slug}`}
                    className="mt-auto text-primary-600 link-underline"
                  >
                    Explore topic →
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="container flex flex-col gap-10">
          <div>
            <h2>Latest insights</h2>
            <p className="text-muted mb-0">
              Strategic viewpoints for CISOs, AI security leads, and product teams.
            </p>
          </div>

          <div className="grid grid-3">
            {posts.map((post) => (
              <Card
                key={post.slug}
                className="group card-clickable h-full flex flex-col gap-4"
              >
                <span className="badge badge-primary w-fit !normal-case">
                  Insight
                </span>
                <div className="space-y-3">
                  <h3 className="text-xl text-primary-800 group-hover:text-primary-600">
                    {post.title}
                  </h3>
                  <p className="text-muted text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4 small text-muted">
                  <span className="inline-flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-primary-600" />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-primary-600" />
                    {post.readingTime} min read
                  </span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-auto text-primary-600 link-underline"
                >
                  Read article →
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
