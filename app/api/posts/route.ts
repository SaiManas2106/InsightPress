import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Post } from '@/models/Post';

export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('GET /api/posts error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
