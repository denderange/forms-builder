import { Button } from '@mantine/core';
import { TicketPlus } from 'lucide-react';

type Props = {
  onClick: () => void;
};

export const ButtonAddOption = ({ onClick }: Props) => {
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
      Добавить вариант
    </Button>
  );
};
