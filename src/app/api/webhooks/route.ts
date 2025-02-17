import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    console.error('Missing SIGNING_SECRET in environment variables.');
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  const wh = new Webhook(SIGNING_SECRET);
  const headerPayload = await headers(); // Добавлен await
  const svix_id = headerPayload.get('svix-id') ?? '';
  const svix_timestamp = headerPayload.get('svix-timestamp') ?? '';
  const svix_signature = headerPayload.get('svix-signature') ?? '';

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error: Missing Svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return new NextResponse('Error: Verification failed', { status: 400 });
  }

  if (evt.type === 'user.created' || evt.type === 'user.updated') {
    try {
      const userData = evt.data as WebhookEvent['data'] & {
        email_addresses?: { email_address: string }[];
        first_name?: string;
        last_name?: string;
      };

      const id = userData.id ?? ''; // Убедимся, что id не undefined
      if (!id) {
        return new NextResponse('Error: Missing user ID', { status: 400 });
      }

      const email = userData.email_addresses?.[0]?.email_address || null;
      const name =
        `${userData.first_name || ''} ${userData.last_name || ''}`.trim() ||
        null;

      const existingUser = await db.user.findUnique({ where: { clerkId: id } });

      if (!existingUser) {
        const newUser = await db.user.create({
          data: { clerkId: id, name, email },
        });
        return NextResponse.json({ message: 'User created', user: newUser });
      }

      const updatedUser = await db.user.update({
        where: { clerkId: id },
        data: { name, email },
      });

      return NextResponse.json({ message: 'User updated', user: updatedUser });
    } catch (error) {
      console.error('Database operation failed:', error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }

  return new NextResponse('Webhook received', { status: 200 });
}
