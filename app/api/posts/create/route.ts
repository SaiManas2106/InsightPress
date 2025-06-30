// app/api/posts/create/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Post, IPost } from '@/models/Post';
import { nanoid } from 'nanoid';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';
import mongoose from 'mongoose';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // ✅ Sanitize HTML content
    const cleanContent = DOMPurify.sanitize(content);

    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') + '-' + nanoid(5);

    // ✅ Fix the Mongoose TS overload issue using a type cast
    const post = await (Post as mongoose.Model<IPost>).create({
      title,
      content: cleanContent,
      slug,
    });

    return NextResponse.json({ message: 'Post created', post });
  } catch (error) {
    console.error('POST /api/posts/create error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
