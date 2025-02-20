import { Button } from '@mantine/core';
import { TicketPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = {
  onClick: () => void;
};

export const ButtonAddOption = ({ onClick }: Props) => {
  const t = useTranslations('Buttons');

  return (
    <Button
      size="xs"
      variant="light"
      color="cyan.9"
      leftSection={<TicketPlus size={14} />}
      onClick={onClick}
      fullWidth
      mt="lg"
    >
      {t('Add option')}
    </Button>
  );
};
