import { Box, Group, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

const PopularTemplates = async () => {
  const t = await getTranslations('PopularTemplates');

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
