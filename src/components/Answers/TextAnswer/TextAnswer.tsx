import { Textarea } from '@mantine/core';
import { useTranslations } from 'next-intl';

export const TextAnswer = ({ id }: { id: string }) => {
  const t = useTranslations('TextAnswer');

  return <Textarea placeholder={t('Text Answer')} disabled />;
};
