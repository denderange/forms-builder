import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser, getAuth } from '@clerk/nextjs/server';

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

export async function POST() {
  const user = await currentUser();
  if (!user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const newForm = await db.form.create({
    data: {
      userId: user.id,
      templateId: '', // Если форма создаётся с нуля, поле можно оставить пустым
      createdAt: new Date(),
    },
  });

  return NextResponse.json(newForm);
}
