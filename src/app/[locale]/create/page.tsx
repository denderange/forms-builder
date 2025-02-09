import { Button, Title, Container, Stack, Card, Text } from '@mantine/core';
import Link from 'next/link';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export default async function CreateTemplatePage() {
  const { userId } = await auth();
  if (!userId) return <p>Вы должны войти в систему</p>;

  const forms = await db.form.findMany({
    where: { userId },
    select: { id: true, template: { select: { title: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <Container size="sm">
      <Title order={2}>Создать форму</Title>
      <Stack gap="md">
        <Card withBorder shadow="sm">
          <Link href="/create/new">
            <Button fullWidth>Создать новую форму</Button>
          </Link>
        </Card>

        {forms.length > 0 && (
          <>
            <Title order={3}>Ваши формы</Title>
            {forms.map((form) => (
              <Card key={form.id} withBorder shadow="sm">
                <Link href={`/create/${form.id}`}>
                  <Text>{form.template?.title || 'Без названия'}</Text>
                </Link>
              </Card>
            ))}
          </>
        )}
      </Stack>
    </Container>
  );
}
