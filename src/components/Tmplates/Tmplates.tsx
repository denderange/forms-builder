'use client';
import { Box, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

const Templates = () => {
  const t = useTranslations('Templates');

  return (
    <Box component="main">
      <Title order={2}>{t('Latest templates')}</Title>
    </Box>
  );
};

export default Templates;
