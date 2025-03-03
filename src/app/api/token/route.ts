import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import crypto from 'crypto';
import { db } from '@/lib/db';

export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let user = await db.user.findUnique({ where: { clerkId: userId } });

  if (!user?.apiToken) {
    const newToken = crypto.randomBytes(32).toString('hex');
    user = await db.user.update({
      where: { clerkId: userId },
      data: { apiToken: newToken },
    });
  }

  return NextResponse.json({ apiToken: user.apiToken });
}
