'use client';
import { Link } from '@/i18n/routing';
import { Box, Button, Group, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const TagCloud = () => {
  const t = useTranslations('TagCloud');
  const [tags, setTags] = useState<string[]>([]);

  return (
    <Box mt={'md'}>
      <Title order={2}>{t('Tag cloud')}</Title>
      <Group my="md">
        <Title order={2}>{t('Tags')}</Title>
        <Group>
          {tags.map((tag, index) => (
            <Link href={`/search?tag=${tag}`} key={index}>
              <Button>{tag}</Button>
            </Link>
          ))}
        </Group>
      </Group>
    </Box>
  );
};

export default TagCloud;
