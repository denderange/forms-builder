// import { getPopularTemplates, Template } from '@/lib/templateService';
import { Box, Group, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

const PopularTemplates = () => {
  const t = useTranslations('PopularTemplates');

  return (
    <Box mt={'md'}>
      <Title order={2}>{t('Top popular templates')}</Title>
      <Group my="md">
        <Title order={2}>{t('Popular templates')}</Title>
      </Group>
    </Box>
  );
};

export default PopularTemplates;
