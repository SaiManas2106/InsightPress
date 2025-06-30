import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Post, IPost } from '@/models/Post';
import mongoose from 'mongoose';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    await dbConnect();

    const post = await (Post as mongoose.Model<IPost>).findOne({ slug: params.slug }).exec();

    if (!post) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
