import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  readingTime: number;
  author?: string;
  tags?: string[];
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const wordsPerMinute = 200;
      const wordCount = content.split(/\s+/g).length;
      const readingTime = Math.ceil(wordCount / wordsPerMinute);

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        content,
        readingTime,
        author: data.author,
        tags: data.tags,
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/g).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    content,
    readingTime,
    author: data.author,
    tags: data.tags,
  };
}
