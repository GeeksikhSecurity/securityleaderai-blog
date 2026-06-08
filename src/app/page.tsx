import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  ShieldIcon,
  LayersIcon,
  PackageIcon,
  WorkflowIcon,
} from '@/components/icons';
import { PostCard } from '@/components/post-card';
import { getPublicPosts, getAvailableTranslations } from '@/lib/posts';
import { getResearchItems, getResearchTopics } from '@/lib/research';
import { LOCALES, LOCALE_META } from '@/lib/locales';

const topicIcons = {
  shield: ShieldIcon,
  layers: LayersIcon,
  package: PackageIcon,
  workflow: WorkflowIcon,
};

export default function Home() {
  const researchHighlights = getResearchItems().slice(0, 3);
  const allPosts = getPublicPosts();
  const posts = allPosts.slice(0, 3);
  // Topic counts span research articles + ALL public posts (CLAUDE.md: Topic Counts).
  const topics = getResearchTopics(
    allPosts.map((p) => ({ title: p.title, summary: p.excerpt, tags: p.tags })),
  );

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
              20+ Years Experience • CISSP • CISA • GWAPT • Security Researcher & Advisor
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
            {researchHighlights.map((item) => {
              // ResearchItem.readTime is a string (e.g. "4"); PostCard expects
              // a number. Coerce safely, falling back to undefined on parse-fail.
              const minutes = item.readTime ? Number.parseInt(item.readTime, 10) : undefined;
              return (
                <PostCard
                  key={item.slug}
                  href={`/research/${item.slug}`}
                  title={item.title}
                  excerpt={item.summary}
                  date={item.date}
                  readingTime={Number.isFinite(minutes) ? minutes : undefined}
                  type={item.type}
                  tags={item.tags}
                  ctaLabel="Read research →"
                />
              );
            })}
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
                    href="/research"
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
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2>Latest insights</h2>
              <p className="text-muted mb-0">
                Strategic viewpoints for CISOs, AI security leads, and product teams.
              </p>
            </div>
            {/* Site-wide language CTAs — discoverability of pa-in posts from the homepage. */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="text-muted" aria-hidden="true">🌐</span>
              <span className="text-muted">Read in:</span>
              <Link href="/blog" className="font-semibold text-primary-700 link-underline">
                English
              </Link>
              {LOCALES.map((locale) => (
                <span key={locale} className="inline-flex items-center gap-3">
                  <span className="text-muted" aria-hidden="true">·</span>
                  <Link
                    href={`/blog/${locale}`}
                    hrefLang={LOCALE_META[locale].hreflang}
                    className="text-primary-600 link-underline"
                  >
                    {LOCALE_META[locale].nativeName}
                  </Link>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-3">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                href={`/blog/${post.slug}`}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                readingTime={post.readingTime}
                type="insight"
                tags={post.tags}
                availableLocales={getAvailableTranslations(post.slug)}
              />
            ))}
          </div>

          <div className="flex justify-end">
            <Link
              href="/blog"
              className={buttonVariants({ variant: 'secondary', size: 'sm' })}
            >
              View all insights →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
