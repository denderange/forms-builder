import {
  Button,
  Title,
  Container,
  Stack,
  Card,
  Text,
  CardSection,
  Box,
  Flex,
} from '@mantine/core';
import Link from 'next/link';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { ClipboardPlus } from 'lucide-react';

export default async function CreateTemplatePage() {
  const { userId } = await auth();
  if (!userId)
    return (
      <Container>
        <Text>Для создания форм необходимо войти в систему.</Text>
        <Link href="/sign-in">Войти</Link>
      </Container>
    );

  // const forms = await db.form.findMany({
  //   where: { userId },
  //   select: { id: true, template: { select: { title: true } } },
  //   orderBy: { createdAt: 'desc' },
  // });

  return (
    <>
      <Title order={2}>Создать форму</Title>
      <Stack gap="md">
        <Box maw={200} mt="md">
          <Card withBorder shadow="sm">
            <CardSection>
              <Flex justify="center">
                <ClipboardPlus
                  strokeWidth={0.5}
                  size={160}
                  color="#007694"
                  opacity={0.5}
                />
              </Flex>
            </CardSection>
            <Link href="/create/new">
              <Button
                fullWidth
                size="compact-md"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
              >
                Пустая форма
              </Button>
            </Link>
          </Card>
        </Box>

        {/* {forms.length > 0 && (
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
        )} */}
      </Stack>
    </>
  );
}
