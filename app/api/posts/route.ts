// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Post, IPost } from '@/models/Post';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await dbConnect();

    // ✅ Fix: Cast Post to proper Mongoose model type
    const posts = await (Post as mongoose.Model<IPost>).find().sort({ createdAt: -1 });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('GET /api/posts error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
