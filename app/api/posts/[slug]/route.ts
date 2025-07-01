import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Post, IPost } from '@/models/Post';
import mongoose from 'mongoose';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

// GET a single post by slug
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    await dbConnect();
    const post = await (Post as mongoose.Model<IPost>).findOne({ slug: params.slug }).exec();

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('GET /api/posts/[slug] error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// PUT update post
export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  try {
    await dbConnect();
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const cleanContent = DOMPurify.sanitize(content);

    const updatedPost = await (Post as mongoose.Model<IPost>).findOneAndUpdate(
      { slug: params.slug },
      { title, content: cleanContent },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Post updated', post: updatedPost });
  } catch (error) {
    console.error('PUT /api/posts/[slug] error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE a post by slug
export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
  try {
    await dbConnect();

    const deletedPost = await (Post as mongoose.Model<IPost>).findOneAndDelete({
      slug: params.slug,
    });

    if (!deletedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Post deleted' });
  } catch (error) {
    console.error('DELETE /api/posts/[slug] error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
