import {
  TextInput,
  Select,
  Group,
  Button,
  Card,
  useMantineColorScheme,
  Stack,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  Box,
  CloseButton,
  ActionIcon,
  Tooltip,
  Title,
} from '@mantine/core';
import { Plus, TicketPlus, Trash, X } from 'lucide-react';
import { useState } from 'react';

type QuestionItemProps = {
  id: number;
  text: string;
  type: string;
  onTextChange: (id: number, text: string) => void;
  onTypeChange: (id: number, type: string) => void;
  onRemove: (id: number) => void;
};

export default function QuestionItem({
  id,
  text,
  type,
  onTextChange,
  onTypeChange,
  onRemove,
}: QuestionItemProps) {
  const { colorScheme } = useMantineColorScheme();
  const [options, setOptions] = useState<string[]>(['']);

  // Добавить вариант ответа
  const addOption = () => {
    setOptions([...options, '']);
  };

  // Удалить вариант
  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  // Обновить текст варианта ответа
  const updateOption = (index: number, newText: string) => {
    setOptions(options.map((opt, i) => (i === index ? newText : opt)));
  };

  return (
    <Card withBorder p="sm" bg={colorScheme === 'dark' ? 'dark.5' : 'gray.0'}>
      <Group justify="space-between">
        <TextInput
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
          >
            <Trash size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>

      <Group mt="lg" justify="space-between">
        <Select
          placeholder="Pick option"
          data={[
            { value: 'text', label: 'Текст' },
            { value: 'radio', label: 'Один вариант' },
            { value: 'checkbox', label: 'Несколько вариантов' },
          ]}
          value={type}
          onChange={(value) => onTypeChange(id, value!)}
          w={'50%'}
        />
      </Group>

      {/* Динамическое отображение полей */}
      <Stack mt="md">
        {type === 'text' && (
          <TextInput placeholder="Ответ пользователя" disabled />
        )}

        {type === 'radio' && (
          <>
            <RadioGroup>
              {options.map((option, index) => (
                <Group key={index} justify="space-between">
                  <Radio value={option} label={option || 'Вариант ответа'} />
                  <TextInput
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder="Введите вариант"
                  />
                  <Button
                    size="xs"
                    color="red"
                    onClick={() => removeOption(index)}
                  >
                    <Trash size={12} />
                  </Button>
                </Group>
              ))}
            </RadioGroup>
            <Button
              size="xs"
              leftSection={<Plus size={12} />}
              onClick={addOption}
            >
              Добавить вариант
            </Button>
          </>
        )}

        {type === 'checkbox' && (
          <>
            <CheckboxGroup>
              {options.map((option, index) => (
                <Group key={index} justify="space-between" my={'md'}>
                  <Group style={{ flex: '1' }}>
                    <Checkbox value={option} />
                    <TextInput
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder="Введите вариант"
                      variant="unstyled"
                      style={{
                        backgroundColor: 'white',
                        borderBottom: '1px solid #a5a5a5',
                        flex: '1',
                        marginTop: '-5px',
                      }}
                    />
                  </Group>
                  <CloseButton
                    icon={<X size={18} color="#be004f" />}
                    onClick={() => removeOption(index)}
                    size="xs"
                  />
                </Group>
              ))}
            </CheckboxGroup>
            <Button
              size="xs"
              variant="light"
              leftSection={<TicketPlus size={14} />}
              onClick={addOption}
            >
              Добавить вариант
            </Button>
          </>
        )}
      </Stack>
    </Card>
  );
}
