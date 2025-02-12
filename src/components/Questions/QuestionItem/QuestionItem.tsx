import {
  TextInput,
  Group,
  Card,
  Stack,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import { Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
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
  options: { id: string; text: string }[];
  onTextChange: (id: string, text: string) => void;
  onTypeChange: (id: string, type: string) => void;
  onRemove: (id: string) => void;
  onOptionsChange: (
    id: string,
    options: { id: string; text: string }[]
  ) => void;
};

export default function QuestionItem({
  id,
  text,
  type,
  options,
  onTextChange,
  onTypeChange,
  onRemove,
  onOptionsChange,
}: Props) {
  const colorScheme = useColorScheme();

  // Добавить вариант ответа
  const addOption = () => {
    const newOptions = [...options, { id: uuidv4(), text: '' }];
    onOptionsChange(id, newOptions);
  };

  // Удалить вариант
  const removeOption = (id: string) => {
    const newOptions = options.filter((opt) => opt.id !== id);
    onOptionsChange(id, newOptions);
  };

  // Обновить текст варианта ответа
  const updateOption = (id: string, newText: string) => {
    const newOptions = options.map((opt) =>
      opt.id === id ? { ...opt, text: newText } : opt
    );
    onOptionsChange(id, newOptions);
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
