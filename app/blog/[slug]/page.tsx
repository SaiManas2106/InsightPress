'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function BlogPostPage() {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading)
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-lg text-gray-300">Loading...</p>
      </main>
    );

  if (!post)
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-red-400 text-lg">Post not found</p>
      </main>
    );

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-blue-400 border-b border-gray-700 pb-2">
          {post.title}
        </h1>
        <p className="text-sm text-gray-400 mb-8">Slug: <code>{post.slug}</code></p>

        <article
          className="prose prose-invert max-w-none bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </main>
  );
}
