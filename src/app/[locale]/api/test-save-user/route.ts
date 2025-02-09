import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const userId = 'test-clerk-id-12345';

    const existingUser = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!existingUser) {
      const newUser = await db.user.create({
        data: { clerkId: userId },
      });

      return NextResponse.json({ message: 'User created', user: newUser });
    } else {
      return NextResponse.json({
        message: 'User already exists',
        user: existingUser,
      });
    }
  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json({ error: 'Failed to save user' }, { status: 500 });
  }
  return { message: 'hello' };
}
