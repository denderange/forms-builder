import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    select: { id: true, clerkId: true, role: true, createdAt: true },
  });

  if (!user) {
    return new NextResponse('User not found', { status: 404 });
  }

  return NextResponse.json(user);
}

export async function POST(req: Request) {
  try {
    const { userId, name, email } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const existingUser = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!existingUser) {
      await db.user.create({ 
        data: { 
          clerkId: userId, 
          name: name || null,
          email: email || null, 
        } 
      });
      console.log(`User with ID ${userId} has been saved in the database`);
    }else {
      await db.user.update({
        where: { clerkId: userId },
        data: {
          name: name || existingUser.name,
          email: email || existingUser.email,
        },
      });
      console.log(`User with ID ${userId} has been updated`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
