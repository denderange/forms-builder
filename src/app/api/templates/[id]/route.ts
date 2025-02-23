import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const path = url.pathname.split('/');
  const id = path[path.length - 1];

  console.log('Received ID on server:', id);

  if (!id) {
    return NextResponse.json({ error: 'ID is missing' }, { status: 400 });
  }

  try {
    const template = await db.formTemplate.findUnique({
      where: { id },
      include: {
        questions: { include: { options: true } },
        author: { select: { name: true } },
      },
    });

    if (!template) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error('Error fetching form template:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
