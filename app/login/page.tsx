'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [role, setRole] = useState<'reader' | 'admin'>('reader');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (res?.ok) {
      router.push(role === 'admin' ? '/admin' : '/blog');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-850 border border-gray-700 shadow-2xl p-10 rounded-2xl w-full max-w-md text-white">
        <h1 className="text-4xl font-bold mb-2 text-center text-blue-400">InsightPress</h1>
        <p className="text-sm text-gray-400 text-center mb-6">Explore knowledge, share ideas.</p>

        {/* Toggle Button */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center bg-gray-800 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setRole('reader')}
              className={`px-4 py-2 rounded-l-lg text-sm font-medium transition ${
                role === 'reader' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Reader
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`px-4 py-2 rounded-r-lg text-sm font-medium transition ${
                role === 'admin' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 py-2 rounded-lg font-semibold"
          >
            Login as {role === 'admin' ? 'Admin' : 'Reader'}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          {role === 'admin'
            ? 'Admin users can manage and publish blog posts.'
            : 'Reader accounts can view published blog content.'}
        </p>
      </div>
    </main>
  );
}
