import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <header className="bg-slate-900 border-b border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white">Security Leader AI</h1>
          <p className="text-slate-300 mt-2">AI Security • MCP Research • Cybersecurity Leadership</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="bg-slate-800 rounded-lg p-6 hover:bg-slate-750 transition-colors border border-slate-700"
            >
              <h2 className="text-xl font-semibold text-white mb-2">
                {post.title}
              </h2>
              <p className="text-slate-300 mb-4">{post.excerpt}</p>
              <div className="flex items-center text-sm text-slate-400">
                <time dateTime={post.date}>{post.date}</time>
                <span className="mx-2">•</span>
                <span>{post.readingTime} min read</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="bg-slate-900 border-t border-slate-700 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-slate-400">
          <p>&copy; 2025 SecurityLeader.ai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
