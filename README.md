# 📰 InsightPress

**InsightPress** is a fully functional, role-based blogging platform built with **Next.js 14**, **Tailwind CSS**, **MongoDB**, and **NextAuth**. It supports two roles:  
- **Admin**: Can create, edit, and delete blog posts.
- **Reader**: Can view published blog posts.

The platform features rich text blog creation, dark mode styling, secure authentication, and XSS protection.

---

## 🔥 Features

### ✅ General
- Fully responsive dark theme UI
- Smooth navigation and layout
- Custom 404 and loading states
- SEO-friendly dynamic routing

### ✅ Admin Role
- Login with credentials (`admin` / `admin123`)
- Create posts using a rich-text editor (React Quill)
- View, edit, delete blog posts
- Slug auto-generation with uniqueness
- Protected `/admin` routes with session-based access

### ✅ Reader Role
- Login with credentials (`reader` / `reader123`)
- Access `/blog` to read posts
- “Read More” functionality for individual post viewing
- Logout functionality

### ✅ Security
- JWT-based session strategy with **NextAuth**
- Role-based authorization (Admin / Reader)
- HTML sanitization to prevent XSS attacks
- Environment variables securely used

---

## 🚀 Tech Stack

| Category        | Stack                            |
|----------------|----------------------------------|
| Frontend       | Next.js 14 (App Router), Tailwind CSS |
| Backend        | Next.js API Routes, MongoDB with Mongoose |
| Authentication | NextAuth.js with JWT strategy    |
| Rich Text Editor | React-Quill                     |
| Deployment     | Vercel + MongoDB Atlas           |

---

