import {
  TextInput,
  Group,
  Card,
  Stack,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { TextAnswer } from '../../Answers/TextAnswer/TextAnswer';
import { RadioAnswer } from '../../Answers/RadioAnswer/RadioAnswer';
import { CheckboxAnswer } from '../../Answers/CheckboxAnswer/CheckboxAnswer';
import { QuestionTypeSelect } from '../QuestionTypeSelect/QuestionTypeSelect';
import { useColorScheme } from '@mantine/hooks';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  id: string;
  text: string;
  type: string;
  onTextChange: (id: string, text: string) => void;
  onTypeChange: (id: string, type: string) => void;
  onRemove: (id: string) => void;
};

export default function QuestionItem({
  id,
  text,
  type,
  onTextChange,
  onTypeChange,
  onRemove,
}: Props) {
  const colorScheme = useColorScheme();
  const [options, setOptions] = useState<{ id: string; text: string }[]>([
    { id: uuidv4(), text: '' },
  ]);

  // Добавить вариант ответа
  const addOption = () => {
    setOptions([...options, { id: uuidv4(), text: '' }]);
  };

  // Удалить вариант
  const removeOption = (id: string) => {
    setOptions(options.filter((opt) => opt.id !== id));
  };

  // Обновить текст варианта ответа
  const updateOption = (id: string, newText: string) => {
    setOptions(
      options.map((opt) => (opt.id === id ? { ...opt, text: newText } : opt))
    );
  };

  return (
    <Card withBorder p="sm" bg={colorScheme === 'dark' ? 'dark.5' : 'gray.0'}>
      <Group justify="space-between">
        <TextInput
          description="Question"
          placeholder="Вопрос"
          value={text}
          onChange={(e) => onTextChange(id, e.target.value)}
          flex={1}
        />
        <Tooltip label="Delete this section" color="pink">
          <ActionIcon
            variant="outline"
            color="pink.7"
            aria-label="Remove item"
            onClick={() => onRemove(id)}
            mt={'-45px'}
            mr={'-8px'}
          >
            <Trash size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>

      <QuestionTypeSelect
        value={type}
        onChange={(newType) => onTypeChange(id, newType)}
      />

      {/* Динамическое отображение полей */}
      <Stack mt="md">
        {type === 'text' && <TextAnswer />}
        {type === 'radio' && (
          <RadioAnswer
            options={options}
            addOption={addOption}
            updateOption={updateOption}
            removeOption={removeOption}
          />
        )}
        {type === 'checkbox' && (
          <CheckboxAnswer
            options={options}
            addOption={addOption}
            updateOption={updateOption}
            removeOption={removeOption}
          />
        )}
      </Stack>
    </Card>
  );
}
