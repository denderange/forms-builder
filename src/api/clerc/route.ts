// import { NextRequest, NextResponse } from 'next/server';
// import { db } from '@/lib/db'; // Подключаем базу данных
// import { clerkClient, WebhookEvent } from '@clerk/nextjs/server';

// export async function POST(req: NextRequest) {
//   const payload: WebhookEvent = await req.json();

//   if (payload.type === 'user.created') {
//     const { id, email_addresses } = payload.data;

//     // Создаем запись в БД (по умолчанию "user")
//     await db.user.create({
//       data: {
//         clerkId: id,
//         email: email_addresses[0]?.email_address,
//         role: 'user',
//       },
//     });

//     // Обновляем publicMetadata в Clerk
//     await clerkClient.users.updateUser(id, {
//       publicMetadata: { role: 'user' },
//     });
//   }

//   return NextResponse.json({ success: true });
// }
