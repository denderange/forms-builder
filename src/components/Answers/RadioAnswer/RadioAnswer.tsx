import { ButtonAddOption } from '@/components/ButtonAddOption/ButtonAddOption';
import { Group, RadioGroup, Radio, TextInput } from '@mantine/core';
import { Trash } from 'lucide-react';

type Props = {
  options: string[];
  addOption: () => void;
  updateOption: (index: number, text: string) => void;
  removeOption: (index: number) => void;
};

export function RadioAnswer({
  options,
  addOption,
  updateOption,
  removeOption,
}: Props) {
  return (
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
            <Trash
              size={16}
              onClick={() => removeOption(index)}
              style={{ cursor: 'pointer', color: 'red' }}
            />
          </Group>
        ))}
      </RadioGroup>
      <ButtonAddOption onClick={addOption} />
    </>
  );
}
