import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  ShareIcon,
  DownloadIcon,
  GithubIcon,
  CalendarIcon,
  ClockIcon,
} from '@/components/icons';
import { ScrollProgress } from '@/components/scroll-progress';
import { getResearchArticle, getResearchItems } from '@/lib/research';
import type { ResearchType } from '@/lib/research';

interface ResearchArticlePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getResearchItems().map((item) => ({ slug: item.slug }));
}

const typeLabels: Record<ResearchType, string> = {
  paper: 'Research Paper',
  video: 'Video & Demo',
  insight: 'Insight',
  tool: 'Tool / Framework',
};

export default function ResearchArticle({ params }: ResearchArticlePageProps) {
  const article = getResearchArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="bg-neutral-50">
      <ScrollProgress />

      <div className="article-accent-line" />

      <div className="container pb-20 pt-16">
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-primary-600">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/research" className="transition-colors hover:text-primary-600">Research</Link>
          <span aria-hidden="true">/</span>
          <span className="text-secondary line-clamp-1">{article.title}</span>
        </nav>

        <div className="flex flex-col gap-6 border-b border-color pb-10 md:flex-row md:items-end md:justify-between">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 small text-muted">
              <span className="security-tag">
                {typeLabels[article.type] ?? article.type}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-primary-600" />
                {article.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-primary-600" />
                {article.readTime} min read
              </span>
            </div>

            <h1>{article.title}</h1>
            <p className="lead max-w-2xl text-secondary">
              {article.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="sm">
              <ShareIcon className="h-4 w-4" />
              Share
            </Button>
            {article.downloadUrl && (
              <Link
                href={article.downloadUrl}
                className={buttonVariants({ variant: 'outline', size: 'sm' })}
              >
                <DownloadIcon className="h-4 w-4" />
                PDF
              </Link>
            )}
            {article.githubUrl && (
              <Link
                href={article.githubUrl}
                className={buttonVariants({ variant: 'outline', size: 'sm' })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="h-4 w-4" />
                Code
              </Link>
            )}
          </div>
        </div>

        {article.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="!normal-case">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {article.sections && (
          <nav className="mt-14 card">
            <h2 className="text-base font-semibold text-primary-800">Table of contents</h2>
            <ul className="mt-4 flex flex-col gap-2 small text-secondary">
              {article.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="transition-colors hover:text-primary-600"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {article.hookQuestion && (
          <p className="mt-14 text-lg italic text-secondary">
            {article.hookQuestion}
          </p>
        )}

        <div className="prose prose-lg mt-14 max-w-none text-secondary">
          {article.content.map((paragraph, index) => {
            const section = article.sections?.[index];
            return (
              <div key={index}>
                {section && (
                  <h2 id={section.id} className="scroll-mt-24 text-2xl font-bold text-primary-800 mt-14 first:mt-0 mb-4">
                    {section.title}
                  </h2>
                )}
                <p>{paragraph}</p>
              </div>
            );
          })}
        </div>

        {article.takeaway && (
          <div className="mt-14 rounded-lg border border-primary-200 bg-primary-50/50 px-6 py-5">
            <p className="text-sm font-semibold text-primary-800">Your next move</p>
            <p className="mt-2 text-secondary">{article.takeaway}</p>
          </div>
        )}

        {article.videos && article.videos.length > 0 && (
          <section className="mt-16 space-y-8">
            <h2 className="text-3xl font-bold text-primary-800">Video demonstrations</h2>
            {article.videos.map((video) => (
              <div
                key={video.url}
                className="overflow-hidden rounded-lg border border-color bg-black shadow-lg"
              >
                <div className="relative aspect-video">
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="border-t border-color px-6 py-4 text-sm text-muted">
                  {video.title}
                </div>
              </div>
            ))}
          </section>
        )}

        {article.repositories && article.repositories.length > 0 && (
          <section className="mt-16 space-y-6">
            <h2 className="text-3xl font-bold text-primary-800">Tools &amp; code</h2>
            <div className="grid grid-2">
              {article.repositories.map((repo) => (
                <Card
                  key={repo.url}
                  className="card-clickable flex flex-col gap-4"
                >
                  <div>
                    <h3 className="text-lg text-primary-800">{repo.name}</h3>
                    <p className="mt-2 text-sm text-secondary">{repo.description}</p>
                  </div>
                  <Link
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: 'outline', size: 'sm' })}
                  >
                    <GithubIcon className="h-4 w-4" />
                    View code
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-20 border-t border-color pt-8 text-sm text-secondary">
          <p>
            Research and analysis by{' '}
            <a
              href="https://www.linkedin.com/in/gurvindersinghb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 link-underline"
            >
              Gurvinder Singh
            </a>
            , CISSP, CISA — Security Researcher &amp; Advisor with 20+ years of experience. Specializing in AI security, cyber risk and resilience, and public-sector and critical infrastructure security. Creator of the MCP Sentinel Scanner and researcher on OAuth supply-chain vulnerabilities.
          </p>
        </footer>
      </div>
    </article>
  );
}
