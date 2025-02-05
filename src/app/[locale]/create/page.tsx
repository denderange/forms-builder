'use client';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function CreateTemplatePage() {
  const { userId } = await auth();

  // if (!userId) {
  //   redirect('/sign-in');
  // }

  const user = await currentUser();

  return (
    <div className="container mx-auto p-6">
      {user && <div>Welcome, {user.firstName}!</div>}
      <h1 className="text-2xl font-bold">Создать новый шаблон</h1>
      <p>Тут будет форма для создания шаблона.</p>
    </div>
  );
}
