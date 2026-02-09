import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, ClockIcon } from '@/components/icons';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  const processedContent = await remark()
    .use(html)
    .process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <article className="bg-neutral-50">
      <header className="border-b border-color bg-primary-50 pb-16 pt-12">
        <div className="container max-w-4xl">
          <Link href="/" className="text-primary-600 link-underline">
            ← Back to home
          </Link>
          <h1 className="mt-8 text-4xl font-bold md:text-5xl text-primary-800">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 small text-muted">
            <span className="inline-flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-primary-600" />
              <time dateTime={post.date}>{post.date}</time>
            </span>
            <span className="inline-flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-primary-600" />
              {post.readingTime} min read
            </span>
            {post.author && <span>By {post.author}</span>}
          </div>
        </div>
      </header>

      <div className="container max-w-3xl py-16">
        <div
          className="prose prose-lg max-w-none text-secondary"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 border-t border-color pt-8">
            <h3 className="small font-semibold uppercase tracking-[0.3em] text-muted">
              Tags
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="!normal-case">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-color bg-neutral-50 py-10">
        <div className="container text-center small text-secondary">
          <p className="mb-2">
            &copy; 2026 SecurityLeader.ai. All rights reserved.
          </p>
          <a
            href="https://www.linkedin.com/in/gurvindersinghb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 link-underline"
          >
            Gurvinder Singh, CISSP, CISA
          </a>
          {' '}— Security Researcher &amp; Advisor
        </div>
      </footer>
    </article>
  );
}
