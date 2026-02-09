import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { CalendarIcon, ClockIcon } from '@/components/icons';
import { getAllPosts } from '@/lib/posts';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="bg-neutral-50">
      <div className="container pb-20 pt-16">
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-primary-600">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-secondary">Blog</span>
        </nav>

        <div className="mb-12">
          <h1>Blog</h1>
          <p className="lead mb-0">
            Strategic insights for CISOs, AI security leads, and product teams.
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
    </main>
  );
}
