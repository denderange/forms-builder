'use server';

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
import { auth } from '@clerk/nextjs/server';
import { ClipboardPlus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function CreateTemplatePage() {
  const t = await getTranslations('CreateTemplatePage');

  const { userId } = await auth();
  if (!userId)
    return (
      <Container>
        <Text>{t('To create forms you need to log in')}</Text>
        <Link href="/sign-in">{t('Login')}</Link>
      </Container>
    );

  return (
    <>
      <Title order={2}>{t('Create a form')}</Title>
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
                {t('Empty form')}
              </Button>
            </Link>
          </Card>
        </Box>
      </Stack>
    </>
  );
}
