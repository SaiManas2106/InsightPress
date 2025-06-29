export default function Home() {
  return (
    <main className="p-10 text-center">
      <h1 className="text-4xl font-bold">Welcome to the Blog Platform</h1>
      <p className="mt-4 text-lg text-gray-600">Visit /admin to manage posts or /blog/[slug] to view a post.</p>
    </main>
  );
}