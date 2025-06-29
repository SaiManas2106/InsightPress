'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

interface Post {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchPosts = async () => {
        const res = await fetch('/api/posts');
        const data = await res.json();
        setPosts(data.posts || []);
        setLoading(false);
      };
      fetchPosts();
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p>Loading session...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-6 text-blue-400">📝 Blog Admin</h1>
          <p className="mb-4 text-gray-300">🔒 You must be logged in to view this page.</p>
          <button
            onClick={() => signIn()}
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded text-white font-medium"
          >
            Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-blue-400">📋 Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link
              href="/admin/create"
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-medium transition shadow"
            >
              + New Post
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-medium transition shadow"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-400">No posts found. Create your first post!</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li
                key={post._id}
                className="bg-gray-900 border border-gray-700 p-6 rounded-lg shadow hover:shadow-xl transition"
              >
                <h2 className="text-xl font-semibold mb-2 text-white">{post.title}</h2>
                <p className="text-sm text-gray-400 mb-4">
                  Slug: <code className="text-blue-400">{post.slug}</code>
                </p>
                <div className="flex justify-between text-sm mt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="text-blue-400 hover:text-blue-300 transition"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/edit/${post.slug}`}
                    className="text-yellow-400 hover:text-yellow-300 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={async () => {
                      const confirmDelete = confirm('Are you sure you want to delete this post?');
                      if (!confirmDelete) return;
                      const res = await fetch(`/api/posts/${post.slug}`, { method: 'DELETE' });
                      if (res.ok) {
                        setPosts(posts.filter((p) => p._id !== post._id));
                      } else {
                        alert('Error deleting post');
                      }
                    }}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
