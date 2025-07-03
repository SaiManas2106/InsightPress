# 📰 InsightPress

**InsightPress** is a full-stack blog platform built with **Next.js 14**, **MongoDB**, and **NextAuth**. It allows admin users to create, edit, and manage rich-text blog posts securely.
🌐 **Live Site:** [https://insight-press-6heo.vercel.app/](https://insight-press-6heo.vercel.app/)
## 🚀 Features

- 🔐 Admin authentication using NextAuth
- 📝 Rich text editor with ReactQuill
- 🧼 XSS protection using DOMPurify and JSDOM
- 🔗 SEO-friendly slugs with `nanoid`
- 📦 REST API with CRUD operations for posts
- 🌐 Deployed on Vercel with MongoDB Atlas
- 💅 Styled with Tailwind CSS
- ⚙️ Fully typed with TypeScript

## 🗂️ Project Structure

```
├── app
│   ├── api
│   │   └── posts
│   │       ├── create (POST)
│   │       └── [slug] (GET, PUT, DELETE)
│   ├── admin
│   │   ├── create (post creation page)
│   │   └── edit/[slug] (edit post page)
│   ├── blog
│   │   └── [slug] (public post view)
│   └── login
├── lib
│   └── dbConnect.ts
├── models
│   └── Post.ts
└── components
    └── Editor.tsx, PostCard.tsx, etc.
```

## 📦 Tech Stack

- **Frontend:** Next.js 14 App Router, React, Tailwind CSS
- **Backend:** Next.js API Routes, MongoDB, Mongoose
- **Editor:** ReactQuill (dynamic rich text editor)
- **Security:** NextAuth.js, XSS filtering with DOMPurify
- **Deployment:** Vercel + MongoDB Atlas

## ⚙️ Environment Variables

Create a `.env.local` file in your root directory:

```env
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

Make sure to add the same keys to your **Vercel Project Settings → Environment Variables** for production.

## 🧪 API Endpoints

| Method | Endpoint              | Description               |
|--------|-----------------------|---------------------------|
| GET    | `/api/posts`          | Fetch all posts           |
| GET    | `/api/posts/[slug]`   | Fetch a single post       |
| POST   | `/api/posts/create`   | Create a new post         |
| PUT    | `/api/posts/[slug]`   | Update an existing post   |
| DELETE | `/api/posts/[slug]`   | Delete a post             |

## 🛠️ Setup Instructions

```bash
# Clone the repo
git clone https://github.com/your-username/InsightPress.git
cd InsightPress

# Install dependencies
npm install

# Add environment variables
touch .env.local

# Run development server
npm run dev
```

## 🖥 Admin Panel

| Route               | Description              |
|--------------------|--------------------------|
| `/login`           | Admin login page         |
| `/admin`           | Dashboard for all posts  |
| `/admin/create`    | Create new post          |
| `/admin/edit/[slug]` | Edit post by slug     |

> ⚠️ Protected routes — only accessible after login.

## 🔐 Authentication

Implemented using **NextAuth.js** with credentials provider for admin login. Auth state is persisted via cookies, and protected pages use `getServerSession`.

## 🧼 XSS Protection

Sanitization is done on the backend using DOMPurify + JSDOM to ensure rich content is safe and secure from script injection.

```ts
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const cleanContent = DOMPurify.sanitize(userContent);
```

## 🧠 Slug Generation

Posts use SEO-friendly slugs based on title and a random ID:

```ts
const slug =
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') + '-' + nanoid(5);
```

## 🚀 Deployment (Vercel)

1. Push code to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Set env vars: `MONGODB_URI`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
4. Click **Deploy**

## 📌 Common Issues

- **405 error**: Make sure your API route supports the HTTP method (PUT, DELETE).
- **Post not showing**: Check if you're using `cache: 'no-store'` in fetch requests.
- **NEXTAUTH_SECRET**: Must be defined in `.env.local` and on Vercel.
- **Model Overload Errors**: Use explicit `mongoose.Model<IPost>` cast on `.create()` or `.find()`.



