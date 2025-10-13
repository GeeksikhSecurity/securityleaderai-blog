import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';

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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <header className="bg-slate-900 border-b border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Home
          </Link>
        </div>
      </header>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
          <div className="flex items-center text-slate-400">
            <time dateTime={post.date}>{post.date}</time>
            <span className="mx-2">•</span>
            <span>{post.readingTime} min read</span>
            {post.author && (
              <>
                <span className="mx-2">•</span>
                <span>By {post.author}</span>
              </>
            )}
          </div>
        </header>

        <div 
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-700">
            <h3 className="text-white font-semibold mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      <footer className="bg-slate-900 border-t border-slate-700 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-slate-400">
          <p>&copy; 2025 SecurityLeader.ai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
