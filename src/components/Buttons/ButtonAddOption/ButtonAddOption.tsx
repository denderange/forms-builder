import { Button } from '@mantine/core';
import { TicketPlus } from 'lucide-react';

type Props = {
  onClick: () => void;
};

export function ButtonAddOption({ onClick }: Props) {
  return (
    <Button
      size="xs"
      variant="light"
      leftSection={<TicketPlus size={14} />}
      onClick={onClick}
    >
      Добавить вариант
    </Button>
  );
}
