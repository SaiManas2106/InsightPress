'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

interface Post {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
}

export default function BlogListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data.posts || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-[#121212] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400">📰 Blogs</h1>
          {session && (
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-400">No posts found.</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li
                key={post._id}
                className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700"
              >
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-400 mb-4">
                  Slug: <code>{post.slug}</code>
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-400 hover:underline font-medium"
                >
                  Read More →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
