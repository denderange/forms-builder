import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser, auth } from '@clerk/nextjs/server';

export async function GET() {
  const user = await currentUser();
  if (!user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const forms = await db.form.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(forms);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json(
      { error: 'Неавторизованный доступ' },
      { status: 401 }
    );

  try {
    const { title, description, questions } = await req.json();

    const form = await db.form.create({
      data: {
        userId,
        title,
        description,
        questions: {
          create: questions.map((q: any) => ({
            text: q.text,
            type: q.type,
          })),
        },
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ id: form.id });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при создании формы' },
      { status: 500 }
    );
  }
}
