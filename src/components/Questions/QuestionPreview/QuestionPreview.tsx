import { Card, Stack, Text } from '@mantine/core';

type Props = {
  id: string;
  text: string;
  type: string;
  options?: { id: string; text: string }[];
  onSetActive: (id: string) => void;
};

export default function QuestionPreview({
  id,
  text,
  type,
  options = [],
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

      {options.length > 0 && (
        <Stack mt="sm">
          {options.map((opt) => (
            <Text key={opt.id} size="sm">
              - {opt.text || 'Без текста'}
            </Text>
          ))}
        </Stack>
      )}
    </Card>
  );
}
