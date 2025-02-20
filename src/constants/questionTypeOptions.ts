import { useTranslations } from 'next-intl';

const t = useTranslations('questionTypeOptions');

export const questionTypeOptions = [
  { value: 'text', label: t('Text') },
  { value: 'radio', label: t('One option') },
  { value: 'checkbox', label: t('Several options') },
];
