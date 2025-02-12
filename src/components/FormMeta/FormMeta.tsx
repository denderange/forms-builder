import { Box, TextInput, Textarea } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

type Props = {
  title: string;
  description: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
};

export function FormMeta({
  title,
  description,
  setTitle,
  setDescription,
}: Props) {
  const colorScheme = useColorScheme();

  return (
    <Box
      p={'lg'}
      style={{ borderRadius: '10px' }}
      bg={colorScheme === 'dark' ? 'gray.7' : 'cyan.0'}
    >
      <TextInput
        label="Название"
        placeholder="Введите название формы"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Textarea
        label="Описание"
        placeholder="Введите описание (необязательно)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </Box>
  );
}
