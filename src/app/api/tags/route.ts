import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const tags = await db.tag.findMany();
    return NextResponse.json(tags);
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при получении тегов' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json(
        { error: 'Название тега обязательно' },
        { status: 400 }
      );
    }

    let tag = await db.tag.findUnique({ where: { name } });
    if (!tag) {
      tag = await db.tag.create({ data: { name } });
    }

    return NextResponse.json(tag);
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при создании тега' },
      { status: 500 }
    );
  }
}
