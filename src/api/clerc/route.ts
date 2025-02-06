import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Webhook } from 'svix';

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
if (!CLERK_WEBHOOK_SECRET) {
  throw new Error('CLERK_WEBHOOK_SECRET is not set in environment variables.');
}

interface ClerkWebhookEvent {
  type: string;
  data: {
    id: string;
    email_addresses: { email_address: string }[];
  };
}

export async function POST(req: Request) {
  const svixId = req.headers.get('svix-id') ?? '';
  const svixTimestamp = req.headers.get('svix-timestamp') ?? '';
  const svixSignature = req.headers.get('svix-signature') ?? '';

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse('Missing Svix headers', { status: 400 });
  }

  const body = await req.text();
  // console.log('Received webhook body:', body);

  try {
    const webhook = new Webhook(CLERK_WEBHOOK_SECRET as string);
    const event = webhook.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as ClerkWebhookEvent;

    const { type, data } = event;

    if (type === 'user.created') {
      await db.user.create({
        data: {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          role: 'user',
        },
      });
    } else if (type === 'user.deleted') {
      await db.user.delete({ where: { clerkId: data.id } });
    } else if (type === 'user.updated') {
      await db.user.update({
        where: { clerkId: data.id },
        data: {
          email: data.email_addresses[0].email_address,
        },
      });
    }

    // console.log('Processed event:', type, data);
    return new NextResponse('OK', { status: 200 });
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return new NextResponse('Invalid webhook signature', { status: 400 });
  }
}
