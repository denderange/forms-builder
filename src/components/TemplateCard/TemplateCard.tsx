import { Box, Title, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import React from 'react';

type Props = {
  title: string;
  description: string;
  author: string;
};

const TemplateCard = ({ title, description, author }: Props) => {
  const t = useTranslations('TemplateCard');

  return (
    <Box p={'sm'} bd={'1px solid red.6'} style={{ borderRadius: '8px' }}>
      <Title order={3}>{title}</Title>
      <Text size="md">{description}</Text>
      <Text size="md">
        {t('Author')}: {author}
      </Text>
    </Box>
  );
};

export default TemplateCard;
