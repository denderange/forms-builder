import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get('q');

    if (!query) return NextResponse.json([]);

    const results = await db.formTemplate.findMany({
      where: {
        OR: [
          { formTitle: { contains: query, mode: 'insensitive' } },
          { formDescription: { contains: query, mode: 'insensitive' } },
          { templateTags: { has: query } },
        ],
      },
      select: { id: true, formTitle: true },
      // take: 10
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
