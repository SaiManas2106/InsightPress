import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Post } from '@/models/Post';

export async function GET(_: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params.slug });
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { title, content } = await req.json();
    await dbConnect();

    const updated = await Post.findOneAndUpdate(
      { slug: params.slug },
      { title, content },
      { new: true }
    );

    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await dbConnect();
    await Post.findOneAndDelete({ slug: params.slug });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}