import { Card, Text } from '@mantine/core';

type Props = {
  id: string;
  text: string;
  type: string;
  onSetActive: (id: string) => void;
};

export default function QuestionPreview({
  id,
  text,
  type,
  onSetActive,
}: Props) {
  return (
    <Card
      withBorder
      p="sm"
      style={{ cursor: 'pointer' }}
      onClick={() => onSetActive(id)}
    >
      <Text>{text || 'Без названия'}</Text>
      <Text size="sm" c="gray">
        {type === 'text'
          ? 'Текстовый ответ'
          : type === 'radio'
          ? 'Один вариант'
          : 'Несколько вариантов'}
      </Text>
    </Card>
  );
}
