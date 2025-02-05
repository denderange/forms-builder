// import { auth } from '@clerk/nextjs/server';
// import { db } from '@/lib/db';
// import { redirect } from 'next/navigation';

// export default async function AdminPage() {
//   const { userId } = await auth();

//   if (!userId) redirect('/sign-in');

//   const user = await db.user.findUnique({ where: { clerkId: userId } });

//   if (!user || user.role !== 'admin') redirect('/');

//   return <h1>👑 Панель администратора</h1>;
// }
